"use client";

import { AuditHeader } from "@/components/audit/AuditHeader";
import { AuditKpiCards } from "@/components/audit/AuditKpiCard";
import { AuditTable } from "@/components/audit/AuditTable";
import { AuditChart } from "@/components/audit/AuditCharts";
import { AuditInsight } from "@/components/audit/AuditInsight";
import AuditActivityAnalytics from "@/components/audit/AuditActivityAnalytics";
import AuditEventDetails from "@/components/audit/AuditEventDetails";

export default function Audit() {
  

  return (
     <div>
      {/* HEADER */}
       <AuditHeader/>
      {/* KPI */}
      <AuditKpiCards />
      {/* CONTENT */}
      <AuditChart/>
      <div className="grid grid-cols-12 gap-3 mt-4 items-stretch">

        {/* TABLE */}
        <AuditTable/>
        {/* RIGHT PANEL */}
        <div className="col-span-12 xl:col-span-3 flex">
          <AuditInsight />
        </div>

      </div>

      <AuditActivityAnalytics />
      <AuditEventDetails />
    
    </div>
  );
}