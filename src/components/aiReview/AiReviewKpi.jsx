"use client";

import React, { useMemo } from "react";
import {
  ClipboardCheck,
  TriangleAlert,
  Clock3,
  FileWarning,
  CheckCircle2,
} from "lucide-react";
import KpiCardsGrid from "../common/KpiCardsGrid";

const KPI_STYLES = [
  { icon: ClipboardCheck, iconColor: "#2563EB", iconBg: "#DBEAFE" },
  { icon: TriangleAlert, iconColor: "#EF4444", iconBg: "#FEE2E2" },
  { icon: Clock3, iconColor: "#F97316", iconBg: "#FFEDD5" },
  { icon: FileWarning, iconColor: "#7C3AED", iconBg: "#EDE9FE" },
  { icon: CheckCircle2, iconColor: "#10B981", iconBg: "#D1FAE5" },
];

const KPI_DEFINITIONS = [
  {
    title: "REQUIRES REVIEW",
    icon: ClipboardCheck,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    matches: (review) =>
      review.humanReviewRequired === true ||
      review.human_review_required === true ||
      Boolean(review.humanReviewTrigger && review.humanReviewTrigger !== "-"),
  },
  {
    title: "HIGH-RISK",
    icon: TriangleAlert,
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    matches: (review) =>
      review.riskScore >= 90 || String(review.riskLevel).toUpperCase() === "HIGH",
  },
  {
    title: "SLA AT RISK",
    icon: Clock3,
    iconColor: "#F97316",
    iconBg: "#FFEDD5",
    matches: (review) =>
      review.slaAtRisk === true || review.sla_at_risk === true,
  },
  {
    title: "OCR / POSTING EXCEPTIONS",
    icon: FileWarning,
    iconColor: "#7C3AED",
    iconBg: "#EDE9FE",
    matches: (review) => /ocr|posting/.test(review.exceptionType.toLowerCase()),
  },
  {
    title: "AI AUTO-CLEARED",
    icon: CheckCircle2,
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
    matches: (review) =>
      /auto.?clear|completed|approved/i.test(String(review.status ?? "")),
    percentage: true,
  },
];

function getApiKpis(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];

  const nested = data.kpis ?? data.items ?? data.metrics;
  if (Array.isArray(nested)) return nested;
  if (nested && typeof nested === "object") {
    return Object.entries(nested).map(([title, value]) => ({
      title,
      value: typeof value === "object" ? value.value : value,
      ...(typeof value === "object" ? value : {}),
    }));
  }
  if (Object.keys(data).length > 0) {
    return Object.entries(data).map(([title, value]) => ({
      title,
      value: typeof value === "object" ? value.value : value,
      ...(typeof value === "object" ? value : {}),
    }));
  }
  return [];
}

function normalizeTitle(value) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export const AiReviewKpi = ({ data, reviews = [] }) => {
  const items = useMemo(() => {
    const apiKpis = getApiKpis(data);
    if (apiKpis.length > 0) {
      return apiKpis.map((item, index) => {
        const title = item.title ?? item.label ?? item.name ?? item.kpiName ?? `AI Review ${index + 1}`;
        const styleIndex = KPI_DEFINITIONS.findIndex((definition) =>
          normalizeTitle(title).includes(normalizeTitle(definition.title)),
        );
        const style = KPI_STYLES[styleIndex] ?? KPI_STYLES[index % KPI_STYLES.length];
        const value =
          item.value ?? item.count ?? item.total ?? item.kpiValue ?? "-";
        const change = item.change ?? item.changePercentage;

        return {
          ...item,
          title,
          value: String(value),
          icon: style.icon,
          iconColor: item.iconColor ?? style.iconColor,
          iconBg: item.iconBg ?? style.iconBg,
          ...(change !== undefined && {
            change: String(change),
            comparison: item.comparison ?? item.period ?? "",
            positive: String(change).startsWith("+"),
          }),
        };
      });
    }

    return KPI_DEFINITIONS.map((definition) => {
      const count = reviews.filter(definition.matches).length;
      const value = definition.percentage
        ? `${reviews.length ? Math.round((count / reviews.length) * 1000) / 10 : 0}%`
        : count.toLocaleString();
      return {
        title: definition.title,
        value,
        icon: definition.icon,
        iconColor: definition.iconColor,
        iconBg: definition.iconBg,
      };
    });
  }, [data, reviews]);

  return (
    <KpiCardsGrid
      items={items}
      columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
    />
  );
};

export default AiReviewKpi;
