"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ACTIONS_BY_DAY = [
  { name: "May 14", confirmed: 3, rejected: 1, escalated: 0 },
  { name: "May 15", confirmed: 5, rejected: 2, escalated: 1 },
  { name: "May 16", confirmed: 2, rejected: 3, escalated: 0 },
  { name: "May 17", confirmed: 6, rejected: 2, escalated: 1 },
  { name: "May 18", confirmed: 4, rejected: 4, escalated: 0 },
  { name: "May 19", confirmed: 7, rejected: 1, escalated: 1 },
  { name: "May 20", confirmed: 3, rejected: 2, escalated: 0 },
];

const DECISION_BREAKDOWN = [
  { name: "Confirmed", value: 2, percent: "50%", color: "#10B981" },
  { name: "Rejected", value: 2, percent: "50%", color: "#EF4444" },
  { name: "Escalated", value: 0, percent: "0%", color: "#F59E0B" },
];
const DECISION_TOTAL = DECISION_BREAKDOWN.reduce((s, i) => s + i.value, 0);

const RECOVERY_VALUE_TREND = [
  { name: "May 14", value: 42000 },
  { name: "May 15", value: 58000 },
  { name: "May 16", value: 51000 },
  { name: "May 17", value: 74000 },
  { name: "May 18", value: 63000 },
  { name: "May 19", value: 93720 },
  { name: "May 20", value: 80000 },
];

const TOP_REJECTION_REASONS = [
  { label: "Incorrect Vendor", value: 32, max: 32 },
  { label: "Duplicate Custom Error", value: 24, max: 32 },
  { label: "Manual Reviewer Override", value: 18, max: 32 },
  { label: "Vendor Selection Error", value: 15, max: 32 },
];

const panelClass =
  "rounded-[10px] border border-[#D9E1EA] bg-white p-4 shadow-[0px_1px_4px_rgba(15,23,42,0.05)]";

export const AuditChart = () => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
        {/* ACTIONS BY DAY */}
        <div className={panelClass}>
          <h3 className="text-[13px] font-semibold text-[#0F172A]">
            Actions by Day
          </h3>

          <div className="mt-1.5 flex items-center gap-3">
            {[
              { name: "Confirmed", color: "#34D399" },
              { name: "Rejected", color: "#F87171" },
              { name: "Escalated", color: "#FB923C" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-[#64748B]">{item.name}</span>
              </div>
            ))}
          </div>

          <span className="sr-only">
            Area chart showing confirmed, rejected, and escalated actions per
            day from May 14 to May 20, 2025.
          </span>

          <div className="mt-2 h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={ACTIONS_BY_DAY}
                margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="confirmedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34D399" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rejectedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F87171" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#F87171" stopOpacity={0} />
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
                <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="confirmed" name="Confirmed" stroke="#34D399" strokeWidth={2} fill="url(#confirmedFill)" dot={false} />
                <Area type="monotone" dataKey="rejected" name="Rejected" stroke="#F87171" strokeWidth={2} fill="url(#rejectedFill)" dot={false} />
                <Area type="monotone" dataKey="escalated" name="Escalated" stroke="#FB923C" strokeWidth={2} fill="transparent" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* DECISION BREAKDOWN */}
        <div className={panelClass}>
          <h3 className="text-[13px] font-semibold text-[#0F172A]">
            Decision Breakdown
          </h3>

          <span className="sr-only">
            Donut chart showing 2 confirmed decisions (50%), 2 rejected
            decisions (50%), and 0 escalated decisions out of 4 total.
          </span>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="relative h-[120px] w-[120px] shrink-0">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-[#0F172A]">
                  {DECISION_TOTAL}
                </span>
                <span className="text-[9px] font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Total
                </span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DECISION_BREAKDOWN}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={56}
                    paddingAngle={2}
                  >
                    {DECISION_BREAKDOWN.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2 text-[11px] min-w-0">
              {DECISION_BREAKDOWN.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#475569] whitespace-nowrap">
                    {item.name}: {item.value} ({item.percent})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECOVERY VALUE OVER TIME */}
        <div className={panelClass}>
          <h3 className="text-[13px] font-semibold text-[#0F172A]">
            Recovery Value over Time (USD)
          </h3>

          <span className="sr-only">
            Area chart showing recovery value trending from $42,000 on May 14
            to $80,000 on May 20, peaking at $93,720 on May 19.
          </span>

          <div className="mt-2 h-[170px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RECOVERY_VALUE_TREND} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRecoveryValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.replace("May ", "")}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${Math.round(v / 1000)}K`}
                />
                <Tooltip
                  contentStyle={{ fontSize: "11px", borderRadius: "8px" }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#colorRecoveryValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP REJECTION REASONS */}
        <div className={panelClass}>
          <h3 className="text-[13px] font-semibold text-[#0F172A]">
            Top Rejection Reasons
          </h3>

          <div className="mt-3 flex flex-col gap-3">
            {TOP_REJECTION_REASONS.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#475569] truncate">
                    {item.label}
                  </span>
                  <span className="text-[11px] font-semibold text-[#0F172A]">
                    {item.value}
                  </span>
                </div>

                <div className="mt-1 h-[6px] rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#2563EB]"
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};