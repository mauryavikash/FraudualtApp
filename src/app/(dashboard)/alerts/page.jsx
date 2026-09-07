

import React from 'react';
import { MetricsGrid } from '@/components/alerts/MetricsGrid';
import { ApprovalTable } from '@/components/alerts/ApprovalTable';
import { RecentSubmissionsTable } from '@/components/alerts/RecentSubmissionsTable';
import { SidebarAnalytics } from '@/components/alerts/SidebarAnalytics';
import { FollowUpTimeline } from '@/components/alerts/FollowUpTimeline';

export const metadata = {
  title: 'Approval Center - Agentic AI',
  description: 'Review and take action on reconciliation items.',
};

export default function ApprovalCenterPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50 space-y-6 text-slate-800">
      {/* Title Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Approval Center</h1>
          <p className="text-sm text-slate-500">Review and take action on reconciliation items requiring your approval.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
            🎛️ Filters
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* KPI Financial Metric Badges */}
      <MetricsGrid />

      {/* Main Core Split Workspace Grid */}
      <div className="grid grid-cols-1 gap-6 items-start">
<ApprovalTable />
          <RecentSubmissionsTable />
          <FollowUpTimeline />
        {/* Right Metric Analytics and Action Boxes */}
        <div className="">
          <SidebarAnalytics />
        </div>
      </div>
    </div>
  );
}