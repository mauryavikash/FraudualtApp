import {
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const kpiData = [
  {
    title: "TOTAL RECOVERY VALUE (USD)",
    value: "$3.42M",
    change: "+18.7%",
    comparison: "vs May 7 – May 13",
    icon: DollarSign,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
    positive: true,
  },
  {
    title: "RECOVERIES COMPLETED",
    value: "$2.45M",
    change: "+21.3%",
    comparison: "vs May 7 – May 13",
    icon: CheckCircle2,
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
    positive: true,
  },
  {
    title: "RECOVERIES IN PROGRESS",
    value: "$0.72M",
    change: "+5.6%",
    comparison: "vs May 7 – May 13",
    icon: TrendingUp,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    positive: true,
  },
  {
    title: "AVG. RECOVERY CYCLE TIME",
    value: "18.4 Days",
    change: "-2.6 Days",
    comparison: "vs May 7 – May 13",
    icon: Clock3,
    iconColor: "#8B5CF6",
    iconBg: "#F3E8FF",
    positive: false,
  },
  {
    title: "RECOVERY SUCCESS RATE",
    value: "89.3%",
    change: "+6.8%",
    comparison: "vs May 7 – May 13",
    icon: ShieldCheck,
    iconColor: "#06B6D4",
    iconBg: "#CFFAFE",
    positive: true,
  },
];

export const RecoveriesKpiCards = () => {
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
              <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#64748B]">
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

