import {
  Layers3,
  AlertTriangle,
  BriefcaseBusiness,
  DollarSign,
  Settings,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

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
      invoiceCount: "12,458",
      invoiceValue: "$1.86M",
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
      invoiceCount: "8,392",
      invoiceValue: "$1.24M",
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
      invoiceCount: "4,723",
      invoiceValue: "$980K",
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
      invoiceCount: "2,915",
      invoiceValue: "$3.42M",
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
      invoiceCount: "17,825",
      invoiceValue: "$4.68M",
    },
  ];

  return <KpiCardsGrid items={kpiData} columns="xl:grid-cols-5" />;
}