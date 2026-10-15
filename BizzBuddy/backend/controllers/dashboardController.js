import crypto from "crypto";

import User from "../models/User.js";
import { parseSheet } from "../services/sheetParser.js";
import { buildDashboard } from "../services/riskEngine.js";
import { getAIAdvice } from "../services/aiService.js";
import { sendRiskEmail } from "../services/emailService.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user?.sheets?.inventory) {
      return res.status(404).json({ msg: "No sheets connected" });
    }

    //DASHBOARD CACHE LOGIC
    const dashboardCooldownMinutes = 0.1;

    const cacheExpired =
      !user.lastDashboardSync ||
      (new Date() - user.lastDashboardSync) / 1000 / 60 >
        dashboardCooldownMinutes;

    let stats, alerts, inventory, payments, staff;

    //USE CACHE
    if (!cacheExpired && user.dashboardCache) {
      console.log("Using cached dashboard");

      ({ stats, alerts, inventory, payments, staff } = user.dashboardCache);
    } else {
      console.log("Fetching sheets + rebuilding dashboard...");

      //FETCH SHEETS
      inventory = await parseSheet(user.sheets.inventory);
      payments = await parseSheet(user.sheets.payments);
      staff = await parseSheet(user.sheets.staff);

      //BUILD DASHBOARD
      ({ stats, alerts } = buildDashboard(inventory, payments, staff));

      user.dashboardCache = {
        stats,
        alerts,
        inventory,
        payments,
        staff,
      };

      user.lastDashboardSync = new Date();
      await user.save();
    }

    //AI CACHE LOGIC
    const aiCooldownMinutes = 30;

    let recommendation = user.lastAIRecommendation;

    const aiExpired =
      !user.lastAIAt ||
      (new Date() - user.lastAIAt) / 1000 / 60 > aiCooldownMinutes;

    if (!recommendation || aiExpired) {
      console.log("🤖 Generating NEW AI recommendation...");

      recommendation = await getAIAdvice({
        riskScore: stats.riskScore,
        lowStockItems: alerts.map((a) => a.message),
        pendingPayments: stats.pendingPayments,
        activeStaff: stats.activeStaff,
      });

      user.lastAIRecommendation = recommendation;
      user.lastAIAt = new Date();

      await user.save();
    } else {
      console.log("⚡ Using cached AI recommendation");
    }

    // EMAIL LOGIC
    const now = new Date();
    const cooldownMinutes = 30;

    const currentRisk = (stats.riskScore || "").toLowerCase().trim();
    const previousRisk = (user.lastRiskScore || "").toLowerCase().trim();

    const firstTime = !user.lastRiskScore;
    const riskChanged = firstTime || currentRisk !== previousRisk;

    const cooldownPassed =
      !user.lastRiskEmailAt ||
      (now - user.lastRiskEmailAt) / 1000 / 60 > cooldownMinutes;

    if (riskChanged && cooldownPassed) {
      console.log("Sending risk email...");

      await sendRiskEmail(user.email, {
        ...stats,
        alerts,
      });

      user.lastRiskScore = currentRisk;
      user.lastRiskEmailAt = now;

      await user.save();
    }

    res.json({
      stats,
      alerts,
      recommendation,
      inventory,
      staff,
      payments,
      lastSync: user.lastDashboardSync,
    });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
