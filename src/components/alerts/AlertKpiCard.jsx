import {
  Bell,
  ShieldAlert,
  TriangleAlert,
  ShieldCheck,
  Info,
  BellOff,
} from "lucide-react";

const kpiData = [
  {
    title: "TOTAL ALERTS",
    value: "18",
    supporting: "+12% vs Last 7 Days",
    supportingColor: "text-[#10B981]",
    icon: Bell,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
  },
  {
    title: "CRITICAL",
    value: "3",
    supporting: "Needs immediate attention",
    supportingColor: "text-[#EF4444]",
    icon: ShieldAlert,
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
  },
  {
    title: "HIGH",
    value: "7",
    supporting: "Action recommended",
    supportingColor: "text-[#F59E0B]",
    icon: TriangleAlert,
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    title: "MEDIUM",
    value: "6",
    supporting: "Monitor closely",
    supportingColor: "text-[#64748B]",
    icon: ShieldCheck,
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
  },
  {
    title: "LOW",
    value: "2",
    supporting: "FYI only",
    supportingColor: "text-[#64748B]",
    icon: Info,
    iconColor: "#10B981",
    iconBg: "#DCFCE7",
  },
  {
    title: "UNREAD",
    value: "11",
    supporting: "61% of total alerts",
    supportingColor: "text-[#64748B]",
    icon: BellOff,
    iconColor: "#64748B",
    iconBg: "#F1F5F9",
  },
];

export const AlertKpiCard = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kpiData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="
              rounded-[10px]
              border
              border-[#D9E1EA]
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
              <h3 className="text-[24px] leading-[28px] font-bold text-[#0F172A]">
                {item.value}
              </h3>
              <p className={`mt-1 text-[11px] font-medium ${item.supportingColor}`}>
                {item.supporting}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
