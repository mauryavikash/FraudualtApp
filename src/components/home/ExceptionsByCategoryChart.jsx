import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Matches the blue, green, purple, orange, cyan sequence seen in the visual slice
const CATEGORY_COLORS = ["#3b82f6", "#22c55e", "#8b5cf6", "#f97316", "#06b6d4"];

export default function ExceptionsByCategoryChart({
  data = [
    { name: "Missing Invoice", count: 85, percentage: 40 },
    { name: "Missing Payment", count: 54, percentage: 25 },
    { name: "Credit Note Not Reflected", count: 32, percentage: 15 },
    { name: "Amount Mismatch", count: 24, percentage: 11 },
    { name: "Others", count: 17, percentage: 8 },
  ],
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Exceptions by Category</h3>
        <select className="bg-transparent text-xs text-slate-500 font-medium outline-none cursor-pointer">
          <option>May 2025</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        {/* Centralized Metric Ring */}
        <div className="relative h-[160px] w-[160px] shrink-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-extrabold text-slate-900">213</span>
            <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
              Total
            </span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Layout with Identical Alignment */}
        <div className="flex flex-col gap-2.5 flex-1 min-w-0 text-xs">
          {data.map((item, idx) => (
            <div key={item.name} className="flex items-center justify-between font-medium">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }}
                />
                <span className="text-slate-600 truncate">{item.name}</span>
              </div>
              <span className="text-slate-800 ml-2 whitespace-nowrap shrink-0">
                {item.count} <span className="text-slate-400 font-normal">({item.percentage}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
