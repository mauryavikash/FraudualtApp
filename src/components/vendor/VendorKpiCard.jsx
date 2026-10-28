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

  const kpiData = apiKpis.map((item) => {
    const changeValue = String(item.change || "").trim();

    const isPositive = changeValue.startsWith("+");
    const isNegative = changeValue.startsWith("-");
    const isNeutral =
      changeValue === "0" ||
      changeValue === "0%" ||
      changeValue === "+0" ||
      changeValue === "-0" ||
      changeValue === "";

    return {
      title: item.title || "",

      value: item.value || "0",

      change: changeValue,

      comparison: item.comparison || "",

      // Arrow & Color Logic based on change value
      positive: isPositive,
      negative: isNegative,
      neutral: isNeutral,

      supporting: item.comparison || "",

      invoiceCount: item.invoiceCount || "0",

      invoiceValue: item.invoiceValue || "$0.00",

      icon: iconMap[item.icon] || Bell,

      iconColor: item.iconColor || "#2563EB",

      iconBg: item.iconBg || "#DBEAFE",
    };
  });

  return (
    <KpiCardsGrid
      items={kpiData}
      columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-6"
      variant="vendor"
    />
  );
};

export default VendorKpiCard;