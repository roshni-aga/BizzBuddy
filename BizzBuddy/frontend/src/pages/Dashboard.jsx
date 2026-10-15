import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import RecommendationBox from "../components/dashboard/RecommendationBox";
import InsightsCharts from "../components/dashboard/InsightsChart";
import AddDataModal from "../components/dashboard/AddDataModal";

import { getDashboardData } from "../app/services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openAddData, setOpenAddData] = useState(false);

  useEffect(() => {
    let interval;

    async function load() {
      try {
        setIsUpdating(true);

        const res = await getDashboardData();

        setData(res);
        setLastSync(new Date(res.lastSync));

        setTimeout(() => setIsUpdating(false), 500);
      } catch (err) {
        console.error(err);

        // NEW USER — NO SHEETS CONNECTED
        if (err.response?.status === 404) {
          setData({ noSheets: true });
        }

        setIsUpdating(false);
      }
    }

    load();

    // auto refresh every 15 sec
    interval = setInterval(load, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if (data?.noSheets) {
    return (
      <DashboardLayout hideAddButton={true}>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-2xl font-semibold">No Data Connected Yet</h2>

          <p className="text-slate-400">
            Connect your Google Sheets to start using BizBuddy.
          </p>

          <button
            onClick={() => setOpenAddData(true)}
            className="px-5 py-2 rounded-lg bg-accent/20 border border-accent/30 hover:bg-accent/30 transition"
          >
            + Add Data
          </button>
        </div>

        {/* MODAL */}
        <AddDataModal
          open={openAddData}
          onClose={() => setOpenAddData(false)}
        />
      </DashboardLayout>
    );
  }

  //DASHBOARD
  return (
    <DashboardLayout>
      {/* LIVE STATUS */}
      <div className="mb-4 flex items-center gap-4 text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          LIVE
        </span>

        {lastSync && <span>Last synced: {lastSync.toLocaleTimeString()}</span>}
      </div>

      {/* CONTENT */}
      <div
        className={`space-y-6 transition-opacity duration-500 ${
          isUpdating ? "opacity-70" : "opacity-100"
        }`}
      >
        <StatsCards stats={data.stats} />

        <div className="pt-4">
          <InsightsCharts stats={data.stats} inventory={data.inventory || []} />
        </div>

        <AlertsPanel alerts={data.alerts || []} />

        <RecommendationBox recommendation={data.recommendation} />
      </div>
    </DashboardLayout>
  );
}
