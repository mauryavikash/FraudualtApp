"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Check,
  CalendarDays,
  CircleDollarSign,
  FileText,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Upload,
  ChevronDown,
  Clock3,
  Building2,
  AlertCircle,
  MessageSquare,

} from "lucide-react";

import { AuditHeader } from "@/components/audit/AuditHeader";
import { AuditKpiCards } from "@/components/audit/AuditKpiCard";
import { AuditTable } from "@/components/audit/AuditTable";
import { AuditChart } from "@/components/audit/AuditCharts";
import { AuditCardDetails } from "@/components/audit/AuditCardDetails";
import { AuditInsight } from "@/components/audit/AuditInsight";

export default function Audit() {
  

  return (
     <div>
      {/* HEADER */}
       <AuditHeader/>
      {/* KPI */}
      <AuditKpiCards />
      {/* CONTENT */}
      <AuditChart/>
      <div className="grid grid-cols-12 gap-4 mt-4 items-stretch">

        {/* TABLE */}
        <AuditTable/>
        {/* RIGHT PANEL */}
        <div className="col-span-12 xl:col-span-4 flex">
          <AuditInsight />
        </div>

      </div>
      <AuditCardDetails/>
    </div>
  );
}