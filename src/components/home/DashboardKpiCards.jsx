import {
  Layers3,
  AlertTriangle,
  BriefcaseBusiness,
  DollarSign,
  Settings,
} from "lucide-react";
import KpiTooltip from "../common/KpiTooltip";

export default function DashboardKpiCards() {
  const kpiData = [
    {
      title: "DUPLICATES IDENTIFIED",
      value: "12,458",
      change: "+14.3%",
      comparison: "vs May 7 - May 13",
      icon: Layers3,
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      positive: true,
      invoiceCount: "12,458",
      invoiceValue: "$1.86M",
    },
    {
      title: "ANOMALIES DETECTED",
      value: "8,392",
      change: "+11.6%",
      comparison: "vs May 7 - May 13",
      icon: AlertTriangle,
      iconColor: "#D97706",
      iconBg: "#FEF3C7",
      positive: true,
      invoiceCount: "8,392",
      invoiceValue: "$1.24M",
    },
    {
      title: "OPEN CASES",
      value: "4,723",
      change: "+9.1%",
      comparison: "vs May 7 - May 13",
      icon: BriefcaseBusiness,
      iconColor: "#7C3AED",
      iconBg: "#EDE9FE",
      positive: true,
      invoiceCount: "4,723",
      invoiceValue: "$980K",
    },
    {
      title: "RECOVERY VALUE (USD)",
      value: "$3.42M",
      change: "+18.7%",
      comparison: "vs May 7 - May 13",
      icon: DollarSign,
      iconColor: "#059669",
      iconBg: "#D1FAE5",
      positive: true,
      invoiceCount: "2,915",
      invoiceValue: "$3.42M",
    },
    {
      title: "AUTOMATION RATE",
      value: "68.2%",
      change: "+6.8%",
      comparison: "vs May 7 - May 13",
      icon: Settings,
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      positive: true,
      invoiceCount: "17,825",
      invoiceValue: "$4.68M",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {kpiData.map((item) => {
        const Icon = item.icon;
        return (
          <KpiTooltip
            key={item.title}
            invoiceCount={item.invoiceCount}
            invoiceValue={item.invoiceValue}
          >
          <div
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
              <p className="mt-1 text-[11px] font-medium flex items-center gap-1 text-[#10B981]">
                ↑ {item.change}{" "}
                <span className="text-[#94A3B8] font-normal">
                  {item.comparison}
                </span>
              </p>
            </div>
          </div>
          </KpiTooltip>
        );
      })}
    </div>
  );
}