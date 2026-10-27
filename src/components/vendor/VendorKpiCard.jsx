import React from "react";
import {
  Bell,
  ShieldAlert,
  TriangleAlert,
  ShieldCheck,
  Info,
  BellOff,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const iconMap = {
  Bell,
  Award: ShieldAlert,
  AlertOctagon: ShieldAlert,
  AlertTriangle: TriangleAlert,
  ShieldCheck,
  Info,
  Mail: BellOff,
};

export const VendorKpiCard = ({ data }) => {
  const apiKpis = Array.isArray(data) ? data : [];

  const kpiData = apiKpis.map((item) => ({
    title: item.title || "",

    value: item.value || "0",

    change: item.change || "",

    comparison: item.comparison || "",

    positive: item.positive ?? false,

    supporting: item.comparison || "",

    invoiceCount: item.invoiceCount || "0",

    invoiceValue: item.invoiceValue || "$0.00",

    icon:
      iconMap[item.icon] || Bell,

    iconColor:
      item.iconColor || "#2563EB",

    iconBg:
      item.iconBg || "#DBEAFE",
  }));

  return (
    <KpiCardsGrid
      items={kpiData}
      columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-6"
      variant="vendor"
    />
  );
};

export default VendorKpiCard;