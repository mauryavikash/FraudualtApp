// import React from "react";
// import {
//   DollarSign,
//   ShieldCheck,
//   TrendingUp,
//   AlertTriangle,
// } from "lucide-react";
// import KpiCardsGrid from "../common/KpiCardsGrid";

// const iconMap = {
//   DollarSign,
//   ShieldCheck,
//   AlertTriangle,
//   TrendingUp,
// };

// const defaultIcon = {
//   icon: DollarSign,
//   iconColor: "#10B981",
//   iconBg: "#DCFCE7",
// };

// export const AiReviewKpi = ({ data }) => {
//   const apiKpis = Array.isArray(data) ? data : [];

//   const kpiData = apiKpis.map((item) => {
//     const changeValue = String(item.change || "").trim();

//     const isPositive = changeValue.startsWith("+");
//     const isNegative = changeValue.startsWith("-");
//     const isNeutral =
//       changeValue === "0" ||
//       changeValue === "0%" ||
//       changeValue === "+0" ||
//       changeValue === "-0" ||
//       changeValue === "";

//     return {
//       title: item.title || "",

//       value: item.value || "$0.00",

//       change: changeValue,

//       comparison: item.comparison || "",

//       // Arrow & Color Logic from change value
//       positive: isPositive,
//       negative: isNegative,
//       neutral: isNeutral,

//       invoiceCount: item.invoiceCount || "0",

//       invoiceValue: item.invoiceValue || "$0.00",

//       icon: iconMap[item.icon] || defaultIcon.icon,

//       iconColor:
//         item.iconColor || defaultIcon.iconColor,

//       iconBg:
//         item.iconBg || defaultIcon.iconBg,
//     };
//   });

//   return (
//     <KpiCardsGrid
//       items={kpiData}
//       columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
//     />
//   );
// };

// export default AiReviewKpi;

import React from "react";
import {
  ClipboardCheck,
  TriangleAlert,
  Clock3,
  FileWarning,
  CheckCircle2,
} from "lucide-react";

import KpiCardsGrid from "../common/KpiCardsGrid";

export const AiReviewKpi = () => {
  const kpiData = [
    {
      title: "REQUIRES REVIEW",
      value: "1,284",
      change: "+12%",
      comparison: "from prior period",
      positive: true,
      icon: ClipboardCheck,
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
    },
    {
      title: "HIGH-RISK",
      value: "186",
      change: "+8%",
      comparison: "from prior period",
      positive: true,
      icon: TriangleAlert,
      iconColor: "#EF4444",
      iconBg: "#FEE2E2",
    },
    {
      title: "SLA AT RISK",
      value: "47",
      change: "+32%",
      comparison: "from prior period",
      positive: true,
      icon: Clock3,
      iconColor: "#F97316",
      iconBg: "#FFEDD5",
    },
    {
      title: "OCR / POSTING EXCEPTIONS",
      value: "312",
      change: "+6%",
      comparison: "from prior period",
      positive: true,
      icon: FileWarning,
      iconColor: "#7C3AED",
      iconBg: "#EDE9FE",
    },
    {
      title: "AI AUTO-CLEARED",
      value: "68.2%",
      change: "+5.1%",
      comparison: "from prior period",
      positive: true,
      icon: CheckCircle2,
      iconColor: "#10B981",
      iconBg: "#D1FAE5",
    },
  ];

  return (
    <KpiCardsGrid
      items={kpiData}
      columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
    />
  );
};

export default AiReviewKpi;