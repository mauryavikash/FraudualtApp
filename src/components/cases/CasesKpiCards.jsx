import React from "react";
import {
  FolderOpen,
  Clock3,
  Flag,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const kpiData = [
  {
    title: "TOTAL OPEN CASES",
    value: "4,723",
    change: "+9.1%",
    comparison: "vs May 7 – May 13",
    icon: FolderOpen,
    iconColor: "#8B5CF6",
    iconBg: "#F3E8FF",
    positive: true,
    invoiceCount: "4,723",
    invoiceValue: "$2.86M",
  },
  {
    title: "OVERDUE CASES",
    value: "842",
    change: "+12.4%",
    comparison: "vs May 7 – May 13",
    icon: Clock3,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    positive: true,
    invoiceCount: "842",
    invoiceValue: "$512K",
  },
  {
    title: "HIGH PRIORITY CASES",
    value: "1,892",
    change: "+19.2%",
    comparison: "vs May 7 – May 13",
    icon: Flag,
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    positive: true,
    invoiceCount: "1,892",
    invoiceValue: "$1.14M",
  },
  {
    title: "AVG. INVESTIGATION CYCLE TIME",
    value: "6.2 Days",
    change: "-1.3 Days",
    comparison: "vs May 7 – May 13",
    icon: Sparkles,
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
    positive: false,
    invoiceCount: "4,723",
    invoiceValue: "$2.86M",
  },
  {
    title: "SLA COMPLIANCE",
    value: "92.4%",
    change: "+2.6%",
    comparison: "vs May 7 – May 13",
    icon: BadgeCheck,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    positive: true,
    invoiceCount: "4,364",
    invoiceValue: "$2.64M",
  },
];

export const CasesKpiCards = () => (
  <KpiCardsGrid items={kpiData} columns="xl:grid-cols-5" />
);

