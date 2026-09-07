import React from "react";
import {
  FileText,
  CheckCircle2,
  Target,
  Cpu,
  AlertTriangle,
  Clock,
} from "lucide-react";
import KpiCard from "./KpiCard";

const iconMap = {
  FileText,
  CheckCircle2,
  Target,
  Cpu,
  AlertTriangle,
  Clock,
};

const styleMap = {
  FileText: {
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    cardBgColor: "bg-blue-50/70",
    accent: { border: "border-blue-100" },
  },
  CheckCircle2: {
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
    cardBgColor: "bg-emerald-50/70",
    accent: { border: "border-emerald-100" },
  },
  Target: {
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    cardBgColor: "bg-purple-50/70",
    accent: { border: "border-purple-100" },
  },
  Cpu: {
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
    cardBgColor: "bg-orange-50/70",
    accent: { border: "border-orange-100" },
  },
  AlertTriangle: {
    iconColor: "text-rose-600",
    iconBgColor: "bg-rose-100",
    cardBgColor: "bg-rose-50/70",
    accent: { border: "border-rose-100" },
  },
  Clock: {
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-100",
    cardBgColor: "bg-amber-50/70",
    accent: { border: "border-amber-100" },
  },
};

export default function KpiDashboardGrid({ kpis = [] }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-stretch">
        {kpis.map((kpi, index) => {
          const Icon = iconMap[kpi.icon] || FileText;
          const styles = styleMap[kpi.icon] || {};

          return (
            <KpiCard
              key={index}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              isTrendPositive={kpi.isTrendPositive}
              icon={Icon}
              iconColor={styles.iconColor}
              iconBgColor={styles.iconBgColor}
              cardBgColor={styles.cardBgColor}
              accent={styles.accent}
              vertical={true}
            />
          );
        })}
      </div>
    </div>
  );
}