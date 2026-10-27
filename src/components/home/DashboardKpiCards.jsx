import {
  Layers3,
  DollarSign,
  Activity,
  BadgeDollarSign,
  CheckCircle2,
  XCircle,
  ArrowUpCircle,
  Boxes,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export default function DashboardKpiCards({ data }) {
  const iconConfig = [
    {
      icon: Layers3,
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
    },
    {
      icon: DollarSign,
      iconColor: "#7C3AED",
      iconBg: "#EDE9FE",
    },
    {
      icon: Activity,
      iconColor: "#D97706",
      iconBg: "#FEF3C7",
    },
    {
      icon: BadgeDollarSign,
      iconColor: "#EF4444",
      iconBg: "#FEE2E2",
    },
    {
      icon: CheckCircle2,
      iconColor: "#10B981",
      iconBg: "#D1FAE5",
    },
    {
      icon: XCircle,
      iconColor: "#6B7280",
      iconBg: "#F3F4F6",
    },
    {
      icon: ArrowUpCircle,
      iconColor: "#F59E0B",
      iconBg: "#FEF3C7",
    },
    {
      icon: Boxes,
      iconColor: "#F59E0B",
      iconBg: "#FEF3C7",
    },
  ];

  const apiKpis = Array.isArray(data)
    ? data
    : data?.kpiCards || data?.items || [];

  const currencyMetrics = [
    "Total Invoice Value",
    "Potential Savings",
  ];

  const kpiData =
  Array.isArray(apiKpis) && apiKpis.length
    ? apiKpis.map((apiKpi, index) => {
        const config =
          iconConfig[index] || iconConfig[0];

        return {
          title: apiKpi.title || "",
          value: apiKpi.value || "-",
          change: apiKpi.change || "",
          comparison: apiKpi.comparison || "",
          positive: apiKpi.positive ?? true,

          invoiceCount:
            apiKpi.invoiceCount || "-",

          invoiceValue:
            apiKpi.invoiceValue || "-",

          icon: config.icon,
          iconColor: config.iconColor,
          iconBg: config.iconBg,
        };
      })
    : [];

  return (
    <KpiCardsGrid
      items={kpiData}
      // columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-8"
    />

  );
}