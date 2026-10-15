import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    sheets: {
      inventory: { type: String, default: null },
      payments: { type: String, default: null },
      staff: { type: String, default: null },
    },

    // SMART EMAIL LOGIC
    lastRiskScore: {
      type: String,
      default: null,
    },

    lastRiskEmailAt: {
      type: Date,
      default: null,
    },

    // AI CACHE
    lastAIRecommendation: {
      type: String,
      default: null,
    },

    lastAIAt: {
      type: Date,
      default: null,
    },

    // DASHBOARD CACHE
    dashboardCache: {
      type: Object,
      default: null,
    },

    lastDashboardSync: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
