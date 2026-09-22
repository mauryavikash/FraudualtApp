import {
  CheckSquare,
  PieChart,
  CircleDollarSign,
  RotateCcw,
  Users,
  Sparkles
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";


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
    title: "Users Decision",
    icon: Users,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    value: "7892",
    supporting: "+16% vs Last Period",
    supportingColor: "text-[#10B981]",
    invoiceCount: "4",
    invoiceValue: "7892",
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
    title: "Overrides",
    icon: RotateCcw,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    value: "1203",
    supporting: "4.8% vs Last Period",
    supportingColor: "text-[#10B981]",
    invoiceCount: "1203",
    invoiceValue: "1203",
  },
  {
    title: "AI Recommendations",
    icon: Sparkles,
    iconColor: "#ffffff",
    iconBg: "#7C3AED",
    value: "5842",
    supporting: "18% vs Last Period",
    supportingColor: "text-[#10B981]",
    invoiceCount: "6842",
    invoiceValue: "5842",
  },
];

export const AuditKpiCards = () => (
  <KpiCardsGrid items={kpiData} columns="xl:grid-cols-5" variant="audit" />
);
