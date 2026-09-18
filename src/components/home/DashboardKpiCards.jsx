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
      title: "Duplicate Exposure",
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
      title: "Anomaly Exposure",
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
      title: "Prevented Value",
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
      title: "Recovery Opportunity",
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
   
  ];

  return <KpiCardsGrid items={kpiData} columns="xl:grid-cols-4" />;
}