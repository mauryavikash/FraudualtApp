import React from "react";
import {
  FolderOpen,
  Clock3,
  Flag,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const iconMap = {
  FolderOpen,
  Clock: Clock3,
  Clock3,
  AlertTriangle: Flag,
  Flag,
  Timer: Sparkles,
  Sparkles,
  ShieldCheck: BadgeCheck,
  BadgeCheck,
};

export const CasesKpiCards = ({ data }) => {
  const apiKpis = Array.isArray(data) ? data : [];

  const kpiData = apiKpis.map((item) => {
    const changeValue = String(item.change || "").trim();

    const isPositive = changeValue.startsWith("+");
    const isNegative = changeValue.startsWith("-");
    const isNeutral =
      changeValue === "0" ||
      changeValue === "0%" ||
      changeValue === "+0" ||
      changeValue === "-0";

    return {
      title: item.title || "",
      value: item.value || "-",

      change: changeValue,

      comparison: item.comparison || "",

      // Arrow & Color Logic
      positive: isPositive,
      negative: isNegative,
      neutral: isNeutral,

      invoiceCount: item.invoiceCount || "0",

      invoiceValue: item.invoiceValue || "$0.00",

      icon: iconMap[item.icon] || FolderOpen,

      iconColor: item.iconColor || "#8B5CF6",

      iconBg: item.iconBg || "#F3E8FF",
    };
  });

  return (
    <KpiCardsGrid
      items={kpiData}
      columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
    />
  );
};

export default CasesKpiCards;