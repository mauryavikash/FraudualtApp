"use client";
import { useEffect, useState, useMemo } from "react";
import DashboardKpiCards from "@/components/home/DashboardKpiCards";
import ManagementDashboard from "@/components/home/ManagementDashboard";
import AiExecutiveBriefing from "@/components/home/AiExecutiveBriefing";
import { LoadingState } from "@/components/common/LoadingState";
import { getHomeDashboard } from "@/app/lib/api";

export default function DashboardPage() {
  const [homeData, setHomeData] = useState(null);

  const loggedInUser = useMemo(() => {
    if (typeof window === "undefined") return null;

    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.replace("/login");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        const data = await getHomeDashboard();
        const payload = data?.data ?? data;
        if (isMounted && payload && typeof payload === "object") {
          setHomeData(payload);
        }
      } catch {
        // Keep static presentation available when the dashboard API is unavailable.
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!homeData) {
    return <LoadingState label="Loading dashboard data..." />;
  }

  const headerData = homeData.header ?? {};
  const userName =
    headerData.userName ??
    homeData.userName ??
    loggedInUser?.first_name ??
    "User";


  const meta = homeData?.meta ?? {};

  const dataAsOf = meta?.dataAsOf
    ? new Date(meta.dataAsOf).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const lastRefreshedAt = meta?.lastRefreshedAt
    ? new Date(meta.lastRefreshedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  return (
    <div className="min-h-screen text-slate-800">
      <div className="mx-auto max-w-[1800px] space-y-3">
        {/* HEADER */}
        <div className="contentHeader rounded-2xl border border-slate-200 bg-white px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left Content */}
            <div>
              <h1 className="text-[20px] font-semibold text-[#0F172A]">
                Welcome back, {userName}! 👋
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor operations, track performance, and drive value across
                the duplicate & anomaly management lifecycle.
              </p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="text-lg">📅</span>

                <div>
                  <div className="text-[11px] text-slate-500">Data As Of</div>

                  <div className="text-[15px] font-semibold text-slate-800">
                    {dataAsOf}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="text-lg">🔄</span>

                <div>
                  <div className="text-[11px] text-slate-500">
                    Last Refreshed
                  </div>

                  <div className="text-[15px] font-semibold text-slate-800">
                    {lastRefreshedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <DashboardKpiCards data={homeData.kpiCards} />

        <AiExecutiveBriefing
          data={homeData.aiExecutiveBriefing}
          paymentStatus={homeData.paymentStatus}
        />

        {/* MANAGEMENT DASHBOARD */}
        {/* <ManagementDashboard data={homeData.managementDashboard} /> */}
        <ManagementDashboard
          data={{
            ...homeData.managementDashboard,
            categoryBreakdown: homeData.categoryBreakdown,
            timelineScatter: homeData.timelineScatter,
            vendorConcentration: homeData.vendorConcentration,
          }}
        />
      </div>
    </div>
  );
}
