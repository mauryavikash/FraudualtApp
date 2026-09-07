import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const TREND_COLORS = {
  matched: "#3b82f6",
  exceptions: "#8b5cf6",
  open: "#22c55e",
};

export default function LineTrendChart({
  trendData = [],
}) {
  const chartData = trendData.map((item) => ({
    name: item.name,
    matched: item.matched,
    exceptions: item.exceptions,
    open: item.open,
  }));

  return (
    <div className="w-full h-full rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Reconciliation Trend</h3>
        <select className="cursor-pointer rounded border border-slate-200 bg-transparent px-2 py-1 text-xs font-medium text-slate-500 outline-none">
          <option>Last 7 Days</option>
        </select>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderRadius: "8px",
                color: "#fff",
                border: "none",
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="matched"
              stroke={TREND_COLORS.matched}
              strokeWidth={2.5}
              dot={{ r: 4, fill: TREND_COLORS.matched, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="exceptions"
              stroke={TREND_COLORS.exceptions}
              strokeWidth={2.5}
              dot={{ r: 4, fill: TREND_COLORS.exceptions, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="open"
              stroke={TREND_COLORS.open}
              strokeWidth={2.5}
              dot={{ r: 4, fill: TREND_COLORS.open, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-blue-500" />
          <span>Statements Received</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-violet-500" />
          <span>Reconciliations Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-green-500" />
          <span>Open Exceptions</span>
        </div>
      </div>
    </div>
  );
}