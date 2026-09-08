import {
  Lock,
  History,
  BadgeCheck,
  GitBranch,
} from "lucide-react";

export const AuditCardDetails = () => {
  const complianceInfo = [
    {
      icon: Lock,
      text: "Immutable audit records protected from unauthorized modification.",
    },
    {
      icon: History,
      text: "Full reviewer decision history retained for complete transparency.",
    },
    {
      icon: BadgeCheck,
      text: "Supports SOX, Internal Audit, and Compliance validation.",
    },
    {
      icon: GitBranch,
      text: "Historical traceability available for every duplicate cluster.",
    },
  ];

  return (
    <div className="col-span-12 rounded-2xl mt-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {complianceInfo.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3 rounded-md bg-white/80 px-5 py-4 backdrop-blur-sm"
            >
              <Icon
                size={18}
                strokeWidth={2}
                className="shrink-0 text-blue-600"
              />

              <p className="text-sm leading-5 text-slate-600">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};