import {
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const kpiData = [
  {
    title: "Confirmed Recoverable Value",
    value: "$3.42M",
    change: "+18.7%",
    comparison: "vs May 7 – May 13",
    icon: DollarSign,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    positive: true,
    invoiceCount: "2,915",
    invoiceValue: "$3.42M",
  },
  {
    title: "Prevented Value",
    value: "$2.45M",
    change: "+21.3%",
    comparison: "vs May 7 – May 13",
    icon: CheckCircle2,
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
    positive: true,
    invoiceCount: "2,086",
    invoiceValue: "$2.45M",
  },
  {
    title: "At-Risk Recovery",
    value: "$0.72M",
    change: "+5.6%",
    comparison: "vs May 7 – May 13",
    icon: TrendingUp,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    positive: true,
    invoiceCount: "612",
    invoiceValue: "$0.72M",
  },

  {
    title: "RECOVERY SUCCESS RATE",
    value: "89.3%",
    change: "+6.8%",
    comparison: "vs May 7 – May 13",
    icon: ShieldCheck,
    iconColor: "#06B6D4",
    iconBg: "#CFFAFE",
    positive: true,
    invoiceCount: "2,603",
    invoiceValue: "$3.05M",
  },
];

export const RecoveriesKpiCards = () => (
  <KpiCardsGrid items={kpiData} columns="xl:grid-cols-4" />
);

