import {
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import KpiGrid from "@/components/ui/KpiGrid";
const kpiData = [
  {
    title: "TOTAL RECOVERY VALUE (USD)",
    value: "$3.42M",
    change: "+18.7%",
    comparison: "vs May 7 – May 13",
    icon: DollarSign,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    positive: true,
  },
  {
    title: "RECOVERIES COMPLETED",
    value: "$2.45M",
    change: "+21.3%",
    comparison: "vs May 7 – May 13",
    icon: CheckCircle2,
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
    positive: true,
  },
  {
    title: "RECOVERIES IN PROGRESS",
    value: "$0.72M",
    change: "+5.6%",
    comparison: "vs May 7 – May 13",
    icon: TrendingUp,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    positive: true,
  },
  {
    title: "AVG. RECOVERY CYCLE TIME",
    value: "18.4 Days",
    change: "-2.6 Days",
    comparison: "vs May 7 – May 13",
    icon: Clock3,
    iconColor: "#8B5CF6",
    iconBg: "#F3E8FF",
    positive: false,
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
  },
];

export const AlertKpiCard = () => {
  return (
    <KpiGrid
          items={kpiData}
          className="xl:grid-cols-5"
        />
  );
};
