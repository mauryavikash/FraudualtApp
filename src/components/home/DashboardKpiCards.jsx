import {
  Layers3,
  AlertTriangle,
  BriefcaseBusiness,
  DollarSign,
  Settings,
} from "lucide-react";

import KpiGrid from "@/components/ui/KpiGrid";

export default function DashboardKpiCards() {
  const kpiData = [
    {
      title: "DUPLICATES IDENTIFIED",
      value: "12,458",
      change: "+14.3%",
      comparison: "vs May 7 - May 13",
      icon: Layers3,
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      positive: true,
    },
    {
      title: "ANOMALIES DETECTED",
      value: "8,392",
      change: "+11.6%",
      comparison: "vs May 7 - May 13",
      icon: AlertTriangle,
      iconColor: "#D97706",
      iconBg: "#FEF3C7",
      positive: true,
    },
    {
      title: "OPEN CASES",
      value: "4,723",
      change: "+9.1%",
      comparison: "vs May 7 - May 13",
      icon: BriefcaseBusiness,
      iconColor: "#7C3AED",
      iconBg: "#EDE9FE",
      positive: true,
    },
    {
      title: "RECOVERY VALUE (USD)",
      value: "$3.42M",
      change: "+18.7%",
      comparison: "vs May 7 - May 13",
      icon: DollarSign,
      iconColor: "#059669",
      iconBg: "#D1FAE5",
      positive: true,
    },
    {
      title: "AUTOMATION RATE",
      value: "68.2%",
      change: "+6.8%",
      comparison: "vs May 7 - May 13",
      icon: Settings,
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      positive: true,
    },
  ];

  return (
    <KpiGrid
      items={kpiData}
      className="xl:grid-cols-5"
    />
  );
}