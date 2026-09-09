"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const SUMMARY_BY_TYPE = [
  { name: "Duplicate Recoveries", value: 2.05, percent: "59.9%", color: "#3B82F6" },
  { name: "Anomaly Recoveries", value: 1.02, percent: "29.8%", color: "#F59E0B" },
  { name: "Prevention (Stopped)", value: 0.35, percent: "10.2%", color: "#10B981" },
];

const RECOVERY_TREND = [
  { name: "May 14", value: 1.1 },
  { name: "May 15", value: 1.5 },
  { name: "May 16", value: 1.4 },
  { name: "May 17", value: 1.9 },
  { name: "May 18", value: 1.7 },
  { name: "May 19", value: 2.4 },
  { name: "May 20", value: 1.95 },
];

const TOP_VENDORS = [
  { name: "ABC Solutions", value: 680000, max: 680000 },
  { name: "Global Supplies Inc.", value: 510000, max: 680000 },
  { name: "Alpha Traders", value: 420000, max: 680000 },
  { name: "TechWorks LLC", value: 310000, max: 680000 },
  { name: "Office Needs Co.", value: 210000, max: 680000 },
];

const formatUsdCompact = (value) =>
  `$${(value / 1000).toFixed(0)}K`;

const panelClass =
  "rounded-[10px] border border-[#D9E1EA] bg-white p-4 shadow-[0px_1px_4px_rgba(15,23,42,0.05)]";

export default function RecoveriesCharts() {
  const totalValue = SUMMARY_BY_TYPE.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        {/* RECOVERY SUMMARY BY TYPE */}
        <div className={panelClass}>
          <h3 className="text-[13px] font-semibold text-[#0F172A]">
            Recovery Summary by Type
          </h3>
          <p className="text-[10px] text-[#94A3B8]">vs May 7 – May 13, 2025</p>

          <span className="sr-only">
            Donut chart showing recovery value by type: Duplicate Recoveries
            $2.05M (59.9%), Anomaly Recoveries $1.02M (29.8%), Prevention
            (Stopped) $0.35M (10.2%), totaling $3.42M.
          </span>

          <div className="mt-2 flex items-center gap-3">
            <div className="relative h-[110px] w-[110px] shrink-0">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[15px] font-extrabold text-[#0F172A]">
                  ${totalValue.toFixed(2)}M
                </span>
                <span className="text-[9px] font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Total
                </span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SUMMARY_BY_TYPE}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={53}
                    paddingAngle={2}
                  >
                    {SUMMARY_BY_TYPE.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2 text-[10px] min-w-0">
              {SUMMARY_BY_TYPE.map((item) => (
                <div key={item.name} className="flex items-start gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 mt-[3px]"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="min-w-0">
                    <div className="text-[#475569] truncate leading-tight">
                      {item.name}
                    </div>
                    <div className="font-semibold text-[#0F172A] leading-tight">
                      ${item.value.toFixed(2)}M ({item.percent})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECOVERY TREND */}
        <div className={panelClass}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[13px] font-semibold text-[#0F172A]">
                Recovery Trend (USD)
              </h3>
              <p className="text-[10px] text-[#94A3B8]">vs May 7 – May 13, 2025</p>
            </div>
            <select className="h-7 rounded-lg border border-[#D9E1EA] px-2 text-[10px] text-[#475569]">
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>

          <span className="sr-only">
            Area chart showing daily recovery value trend from May 14 to May
            20, 2025, ranging between $1.1M and $2.4M.
          </span>

          <div className="mt-2 h-[130px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={RECOVERY_TREND}
                margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="recoveryTrendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.replace("May ", "")}
                />
                <YAxis tick={{ fontSize: 9, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: "11px", borderRadius: "8px" }}
                  formatter={(value) => `$${value.toFixed(2)}M`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#recoveryTrendFill)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP VENDORS */}
        <div className={panelClass}>
          <h3 className="text-[13px] font-semibold text-[#0F172A]">
            Top Vendors by Recovery Value
          </h3>
          <p className="text-[10px] text-[#94A3B8]">vs May 7 – May 13, 2025</p>

          <div className="mt-3 flex flex-col gap-2.5">
            {TOP_VENDORS.map((vendor) => (
              <div key={vendor.name} className="flex items-center gap-2">
                <span className="text-[11px] text-[#475569] w-[110px] shrink-0 truncate">
                  {vendor.name}
                </span>

                <div className="flex-1 h-[6px] rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#2563EB]"
                    style={{ width: `${(vendor.value / vendor.max) * 100}%` }}
                  />
                </div>

                <span className="text-[11px] font-semibold text-[#0F172A] w-10 text-right shrink-0">
                  {formatUsdCompact(vendor.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
