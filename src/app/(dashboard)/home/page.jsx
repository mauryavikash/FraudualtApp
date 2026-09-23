"use client";
import { useEffect, useState } from "react";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import { ChevronDown } from "lucide-react";
import DashboardKpiCards from "@/components/home/DashboardKpiCards";
import ManagementDashboard from "@/components/home/ManagementDashboard";
import OperationalReporting from "@/components/home/OperationalReporting";
import AuditActivitiesPanel from "@/components/home/AuditActivitiesPanel";
import ExecutiveInsightsPanel from "@/components/home/ExecutiveInsightsPanel";
import AiExecutiveBriefing from "@/components/home/AiExecutiveBriefing";
import { LoadingState } from "@/components/common/LoadingState";
import PdfDownloadButton from "@/components/common/PdfDownloadButton";
import { getHomeDashboard } from "@/app/lib/api";

export default function DashboardPage() {
  const [homeData, setHomeData] = useState(null);

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
  const userName = headerData.userName ?? homeData.userName ?? "Vigneshwaran";
  const dateRange = headerData.dateRange ?? homeData.dateRange ?? "May 14 – May 20, 2025";

  return (
    <div className="min-h-screen text-slate-800">
      <div className="mx-auto max-w-[1800px] space-y-3">
      
        {/* HEADER */}
       <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Left Content */}
          <div>
            <h1 className="text-[20px] font-semibold text-[#0F172A]">
              Welcome back, {userName}! 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor operations, track performance, and drive value across the
              duplicate & anomaly management lifecycle.
            </p>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Date Range */}
            {/* <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              <CalendarDays size={16} />
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </button> */}
            <PdfDownloadButton fileName="home-dashboard" />
          </div>

        </div>
      </div>
      
        {/* KPI CARDS */}
        <DashboardKpiCards data={homeData.kpiCards} />

        <AiExecutiveBriefing data={homeData.aiExecutiveBriefing} />

        {/* MANAGEMENT DASHBOARD */}
        <ManagementDashboard data={homeData.managementDashboard} />
                    
        {/* OPERATIONAL REPORTING & AUDIT ACTIVITIES */}
        <div className="grid grid-cols-12 gap-4">
          <OperationalReporting data={homeData.operationalReports} />

          {/* RIGHT SIDE */}
          <div className="col-span-12 space-y-4 xl:col-span-6">
            {/* RECENT AUDIT ACTIVITIES */}
            <AuditActivitiesPanel data={homeData.auditActivities} />

            {/* EXECUTIVE INSIGHTS */}
            <ExecutiveInsightsPanel data={homeData.executiveInsights} />
          </div>
        </div>
      </div>
    </div>
  );
}
