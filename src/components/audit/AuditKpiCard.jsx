import {
  CheckSquare,
  PieChart,
  CircleDollarSign,
  RotateCcw,
  Users,
} from "lucide-react";

const DISTRIBUTION = [
  { label: "Confirmed", value: 2, color: "#10B981" },
  { label: "Rejected", value: 2, color: "#EF4444" },
  { label: "Escalated", value: 0, color: "#F59E0B" },
];

const kpiData = [
  {
    title: "Total Decisions",
    icon: CheckSquare,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
    value: "4",
    supporting: "+12% vs Last Period",
    supportingColor: "text-[#10B981]",
  },
  {
    title: "Decision Distribution",
    icon: PieChart,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    distribution: DISTRIBUTION,
  },
  {
    title: "Recovery Value (USD)",
    icon: CircleDollarSign,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    value: "$93,720",
    supporting: "+8.4% Potentially Recoverable",
    supportingColor: "text-[#10B981]",
  },
  {
    title: "Reversal Rate",
    icon: RotateCcw,
    iconColor: "#8B5CF6",
    iconBg: "#F3E8FF",
    value: "0%",
    supporting: "No reopened decisions",
    supportingColor: "text-[#64748B]",
  },
  {
    title: "Reviewer Compliance",
    icon: Users,
    iconColor: "#06B6D4",
    iconBg: "#CFFAFE",
    value: "100%",
    supporting: "Following review workflow",
    supportingColor: "text-[#64748B]",
  },
];

export const AuditKpiCards = () => {
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
            <div className="flex items-start justify-between">
              <p className="text-[12px] font-medium text-[#475569]">
                {item.title}
              </p>

              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: item.iconBg }}
              >
                <Icon size={14} style={{ color: item.iconColor }} />
              </div>
            </div>

            {item.distribution ? (
              <div className="flex flex-col gap-1">
                {item.distribution.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="text-[#475569]">{row.label}:</span>
                    </div>
                    <span className="font-semibold text-[#0F172A]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h3 className="text-[22px] leading-[26px] font-bold text-[#0F172A]">
                  {item.value}
                </h3>
                <p className={`mt-1 text-[11px] font-medium ${item.supportingColor}`}>
                  {item.supporting}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
