import {
  CheckSquare,
  PieChart,
  CircleDollarSign,
  RotateCcw,
  Users,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const DISTRIBUTION = [
  { label: "Confirmed", value: 2, color: "#10B981" },
  { label: "Rejected", value: 2, color: "#EF4444" },
  { label: "Escalated", value: 0, color: "#F59E0B" },
];

const kpiData = [
  {
    title: "Total Decisions",
    icon: CheckSquare,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    value: "4",
    supporting: "+12% vs Last Period",
    supportingColor: "text-[#10B981]",
    invoiceCount: "4",
    invoiceValue: "$93,720",
  },
  {
    title: "Decision Distribution",
    icon: PieChart,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    distribution: DISTRIBUTION,
    invoiceCount: "4",
    invoiceValue: "$93,720",
  },
  {
    title: "Recovery Value (USD)",
    icon: CircleDollarSign,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    value: "$93,720",
    supporting: "+8.4% Potentially Recoverable",
    supportingColor: "text-[#10B981]",
    invoiceCount: "2",
    invoiceValue: "$93,720",
  },
  {
    title: "Reversal Rate",
    icon: RotateCcw,
    iconColor: "#8B5CF6",
    iconBg: "#F3E8FF",
    value: "0%",
    supporting: "No reopened decisions",
    supportingColor: "text-[#64748B]",
    invoiceCount: "0",
    invoiceValue: "$0",
  },
  {
    title: "Reviewer Compliance",
    icon: Users,
    iconColor: "#06B6D4",
    iconBg: "#CFFAFE",
    value: "100%",
    supporting: "Following review workflow",
    supportingColor: "text-[#64748B]",
    invoiceCount: "4",
    invoiceValue: "$93,720",
  },
];

export const AuditKpiCards = () => (
  <KpiCardsGrid items={kpiData} columns="xl:grid-cols-5" variant="audit" />
);
