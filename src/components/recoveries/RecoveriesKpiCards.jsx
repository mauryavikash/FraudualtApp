import React from "react";
import {
  DollarSign,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const iconMap = {
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
};

const defaultIcon = {
  icon: DollarSign,
  iconColor: "#10B981",
  iconBg: "#DCFCE7",
};

export const RecoveriesKpiCards = ({ data }) => {
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

      value: item.value || "$0.00",

      change: changeValue,

      comparison: item.comparison || "",

      // Arrow & Color Logic from change value
      positive: isPositive,
      negative: isNegative,
      neutral: isNeutral,

      invoiceCount: item.invoiceCount || "0",

      invoiceValue: item.invoiceValue || "$0.00",

      icon: iconMap[item.icon] || defaultIcon.icon,

      iconColor:
        item.iconColor || defaultIcon.iconColor,

      iconBg:
        item.iconBg || defaultIcon.iconBg,
    };
  });

  return (
    <KpiCardsGrid
      items={kpiData}
      columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    />
  );
};

export default RecoveriesKpiCards;