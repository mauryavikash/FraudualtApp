import {
  Database,
  Shield,
  Cpu,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function AuditComplianceOverview() {
  const complianceKpis = [
    {
      title: "Data Ingestions",
      value: "128",
      growth: "+12.5%",
      icon: Database,
      iconColor: "text-blue-500",
      growthColor: "text-emerald-500",
    },
    {
      title: "Detections",
      value: "20,850",
      growth: "+13.8%",
      icon: Shield,
      iconColor: "text-amber-500",
      growthColor: "text-emerald-500",
    },
    {
      title: "AI Recommendations",
      value: "16,742",
      growth: "+10.7%",
      icon: Cpu,
      iconColor: "text-purple-500",
      growthColor: "text-emerald-500",
    },
    {
      title: "User Actions & Approvals",
      value: "9,215",
      growth: "+8.9%",
      icon: Users,
      iconColor: "text-emerald-500",
      growthColor: "text-emerald-500",
    },
    {
      title: "Recoveries Initiated",
      value: "186",
      growth: "+15.4%",
      icon: TrendingUp,
      iconColor: "text-blue-500",
      growthColor: "text-emerald-500",
    },
    {
      title: "Escalations",
      value: "42",
      growth: "-4.6%",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      growthColor: "text-red-500",
    },
  ];

  const complianceInfo = [
    {
      text: "Audit logs are immutable and protected from unauthorized modification.",
    },
    {
      text: "Records are retained in accordance with organizational and regulatory requirements.",
    },
    {
      text: "Historical records available for audit, compliance, and management review.",
    },
  ];

  return (
    <div className="col-span-12 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Audit & Compliance Overview
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {complianceKpis.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <div className="mb-2 flex items-start justify-between">
                <span className="text-xs text-slate-500">
                  {item.title}
                </span>

                <Icon
                  size={16}
                  className={item.iconColor}
                  strokeWidth={2}
                />
              </div>

              <div className="text-[22px] font-bold leading-none text-slate-900">
                {item.value}
              </div>

              <div
                className={`mt-2 text-[11px] font-semibold ${item.growthColor}`}
              >
                {item.growth}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Information Cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {complianceInfo.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <Shield
              size={18}
              className="shrink-0 text-blue-500"
              strokeWidth={2}
            />

            <p className="text-xs leading-4 text-slate-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
