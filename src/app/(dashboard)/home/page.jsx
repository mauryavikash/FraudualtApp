"use client";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import { ChevronDown } from "lucide-react";
import DashboardKpiCards from "@/components/home/DashboardKpiCards";
import ManagementDashboard from "@/components/home/ManagementDashboard";
import OperationalReporting from "@/components/home/OperationalReporting";
import AuditActivitiesPanel from "@/components/home/AuditActivitiesPanel";
import ExecutiveInsightsPanel from "@/components/home/ExecutiveInsightsPanel";
import AuditComplianceOverview from "@/components/home/AuditComplianceOverview";

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-slate-800">
      <div className="mx-auto max-w-[1800px] space-y-3">
      
        {/* HEADER */}
       <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Left Content */}
          <div>
            <h1 className="text-[20px] font-semibold text-[#0F172A]">
              Welcome back, Vigneshwaran! 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor operations, track performance, and drive value across the
              duplicate & anomaly management lifecycle.
            </p>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Date Range */}
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              <CalendarDays size={16} />
              <span>May 14 – May 20, 2025</span>
              <ChevronDown size={14} />
            </button>

            {/* Filters */}
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
            
          </div>

        </div>
      </div>
      
        {/* KPI CARDS */}
        <DashboardKpiCards />

        {/* MANAGEMENT DASHBOARD */}
        <ManagementDashboard />
                    
        {/* OPERATIONAL REPORTING & AUDIT ACTIVITIES */}
        <div className="grid grid-cols-12 gap-4">
          <OperationalReporting />

          {/* RIGHT SIDE */}
          <div className="col-span-12 space-y-4 xl:col-span-6">
            {/* RECENT AUDIT ACTIVITIES */}
            <AuditActivitiesPanel />

            {/* EXECUTIVE INSIGHTS */}
            <ExecutiveInsightsPanel />
          </div>
        </div>
      
        {/* AUDIT & COMPLIANCE OVERVIEW */}
        <div className="grid grid-cols-12 gap-4">
          <AuditComplianceOverview />
        </div>

      </div>
    </div>
  );
}
