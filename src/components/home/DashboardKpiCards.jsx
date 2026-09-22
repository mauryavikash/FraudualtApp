import {
  Layers3,
  AlertTriangle,
  BriefcaseBusiness,
  DollarSign,
  Settings,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

export default function DashboardKpiCards({ data }) {
  const staticKpiData = [
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

  const apiKpis = Array.isArray(data) ? data : data?.items;
  const kpiData = Array.isArray(apiKpis) && apiKpis.length
    ? staticKpiData.map((item, index) => {
        const apiKpi = apiKpis[index];
        if (!apiKpi) {
          return item;
        }

        const isCurrency = item.title === "Recovery Opportunity";
        return {
          ...item,
          title: apiKpi.metric ?? item.title,
          value: isCurrency
            ? formatCurrency(apiKpi.value)
            : Number(apiKpi.value ?? 0).toLocaleString(),
          change: `${Number(apiKpi.changePercentage ?? 0) >= 0 ? "+" : ""}${apiKpi.changePercentage ?? 0}%`,
          comparison: apiKpi.comparisonPeriod ?? item.comparison,
          positive: apiKpi.trend !== "negative",
          invoiceCount: Number(apiKpi.invoiceCount ?? 0).toLocaleString(),
          invoiceValue: formatCurrency(apiKpi.invoiceValue),
        };
      })
    : staticKpiData;

  return <KpiCardsGrid items={kpiData} columns="xl:grid-cols-4" />;
}