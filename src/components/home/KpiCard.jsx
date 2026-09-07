import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function KpiCard({
  label,
  value,
  change,
  isTrendPositive = true,
  icon: Icon,
  iconColor = "text-dgem-blue",
  iconBgColor = "bg-dgem-blue/10",
  cardBgColor = "bg-white",
  accent = {},
  vertical = false,
}) {
  // Common classes
  const cardBase = `group h-full rounded-xl border p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-3.5 ${
    vertical
      ? "flex min-h-[170px] flex-col items-center text-center"
      : "flex  items-stretch"
  } ${cardBgColor} ${accent.border || "border-[var(--border)]"}`;

  const iconContainer = `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11 ${
    vertical ? "" : "self-start"
  } ${iconBgColor}`;

  const labelClass = `min-h-[32px] flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]`;
  const valueClass = `min-h-[28px] flex items-center mt-0.5 text-[16px] font-bold leading-tight tracking-tight text-[var(--text)] sm:text-lg`;

  const trendClass = `flex items-center gap-1 text-[10px] font-medium sm:text-[11px] ${
    isTrendPositive ? "text-emerald-600" : "text-rose-600"
  }`;

  const trendIcon = isTrendPositive ? (
    <ArrowUpRight className="h-3 w-3" />
  ) : (
    <ArrowDownRight className="h-3 w-3" />
  );

  if (vertical) {
    return (
      <div className={cardBase}>
        <div className={iconContainer}>
          <Icon className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${iconColor}`} />
        </div>

        <div className="mt-3 flex w-full flex-1 flex-col items-center">
          <div className={labelClass}>{label}</div>
          <div className={`${valueClass} mt-1`}>{value}</div>

          <div className={`mt-auto pt-3 ${trendClass}`}>
            {trendIcon}
            <span>{change}</span>
          </div>
        </div>
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={cardBase}>
      <div className={iconContainer}>
        <Icon className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${iconColor}`} />
      </div>

      <div className="min-w-0 flex-1 flex flex-col justify-between ml-3">
        <div>
          <div className={labelClass}>{label}</div>
          <div className={valueClass}>{value}</div>
        </div>

        <div className={`mt-2 ${trendClass}`}>
          {trendIcon}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}
