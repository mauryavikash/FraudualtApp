import React from "react";
import {
  FolderOpen,
  Clock3,
  Flag,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const kpiData = [
  {
    title: "TOTAL OPEN CASES",
    value: "4,723",
    change: "+9.1%",
    comparison: "vs May 7 – May 13",
    icon: FolderOpen,
    iconColor: "#8B5CF6",
    iconBg: "#F3E8FF",
    positive: true,
  },
  {
    title: "OVERDUE CASES",
    value: "842",
    change: "+12.4%",
    comparison: "vs May 7 – May 13",
    icon: Clock3,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    positive: true,
  },
  {
    title: "HIGH PRIORITY CASES",
    value: "1,892",
    change: "+19.2%",
    comparison: "vs May 7 – May 13",
    icon: Flag,
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    positive: true,
  },
  {
    title: "AVG. INVESTIGATION CYCLE TIME",
    value: "6.2 Days",
    change: "-1.3 Days",
    comparison: "vs May 7 – May 13",
    icon: Sparkles,
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
    positive: false,
  },
  {
    title: "SLA COMPLIANCE",
    value: "92.4%",
    change: "+2.6%",
    comparison: "vs May 7 – May 13",
    icon: BadgeCheck,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    positive: true,
  },
];

export const CasesKpiCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {kpiData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="
              rounded-[10px]
              border
              border-[1.5px]
              border-[#7DD3FC]
              bg-white
              shadow-[0px_1px_4px_rgba(15,23,42,0.05)]
              px-4
              py-3.5
              min-h-[104px]
              flex
              flex-col
              justify-between
            "
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#64748B] leading-tight">
                {item.title}
              </p>

              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: item.iconBg }}
              >
                <Icon size={15} style={{ color: item.iconColor }} />
              </div>
            </div>

            <div>
              <h3 className="text-[22px] leading-[26px] font-bold text-[#0F172A]">
                {item.value}
              </h3>
              <p
                className={`mt-1 text-[11px] font-medium flex items-center gap-1 ${
                  item.positive ? "text-[#10B981]" : "text-[#F59E0B]"
                }`}
              >
                {item.positive ? "↑" : "↓"} {item.change}{" "}
                <span className="text-[#94A3B8] font-normal">
                  {item.comparison}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

