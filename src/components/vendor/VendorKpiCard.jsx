import {
  Bell,
  ShieldAlert,
  TriangleAlert,
  ShieldCheck,
  Info,
  BellOff,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const kpiData = [
  {
    title: "TOTAL ALERTS",
    value: "18",
    supporting: "+12% vs Last 7 Days",
    supportingColor: "text-[#10B981]",
    icon: Bell,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    invoiceCount: "18",
    invoiceValue: "$142K",
  },
  {
    title: "VENDOR HIGH SCORE",
    value: "72",
    supporting: "+1.8% vs Last 7 Days",
    supportingColor: "text-[#EF4444]",
    icon: ShieldAlert,
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    invoiceCount: "72",
    invoiceValue: "$58K",
  },
  {
    title: "HIGH",
    value: "7",
    supporting: "Action recommended",
    supportingColor: "text-[#F59E0B]",
    icon: TriangleAlert,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    invoiceCount: "7",
    invoiceValue: "$46K",
  },
  {
    title: "MEDIUM",
    value: "6",
    supporting: "Monitor closely",
    supportingColor: "text-[#64748B]",
    icon: ShieldCheck,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    invoiceCount: "6",
    invoiceValue: "$28K",
  },
  {
    title: "LOW",
    value: "2",
    supporting: "FYI only",
    supportingColor: "text-[#64748B]",
    icon: Info,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    invoiceCount: "2",
    invoiceValue: "$10K",
  },
  {
    title: "UNREAD",
    value: "11",
    supporting: "61% of total alerts",
    supportingColor: "text-[#64748B]",
    icon: BellOff,
    iconColor: "#64748B",
    iconBg: "#F1F5F9",
    invoiceCount: "11",
    invoiceValue: "$86K",
  },
];

export const VendorKpiCard = () => (
  <KpiCardsGrid items={kpiData} columns="xl:grid-cols-6" variant="vendor" />
);
