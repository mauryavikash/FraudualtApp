import {
  BellRing,
  Zap,
  Activity,
  SlidersHorizontal,
} from "lucide-react";

export const AlertCardDetails = () => {
  const infoCards = [
    {
      icon: BellRing,
      title: "Stay informed",
      text: "Get real-time alerts for critical events that need your attention.",
      linkText: "Get real time attention",
    },
    {
      icon: Zap,
      title: "Take action",
      text: "Prioritize alerts by severity and type and resolve issues quickly.",
      linkText: "Take action now",
    },
    {
      icon: Activity,
      title: "Track progress",
      text: "Monitor alert status and resolution path from start to finish.",
      linkText: "Track & resolve",
    },
    {
      icon: SlidersHorizontal,
      title: "Customize alerts",
      text: "Set preferences to receive alerts that matter most to your role.",
      linkText: "Manage alerts",
    },
  ];

  return (
    <div className="col-span-12 mt-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {infoCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-3 rounded-[10px] border border-[#D9E1EA] bg-white px-4 py-3.5 shadow-[0px_1px_4px_rgba(15,23,42,0.05)]"
            >
              <div className="h-8 w-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0">
                <Icon size={15} className="text-[#2563EB]" />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#0F172A]">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] leading-4 text-[#64748B]">
                  {item.text}
                </p>
                <button className="mt-1.5 text-[12px] font-medium text-[#2563EB]">
                  {item.linkText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};