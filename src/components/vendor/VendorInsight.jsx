"use client";
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { History } from "lucide-react";

const SEVERITY_DATA = [
  { name: "Critical", value: 3, percent: "16.7%", color: "#F87171" },
  { name: "High", value: 7, percent: "38.9%", color: "#FBBF24" },
  { name: "Medium", value: 6, percent: "33.3%", color: "#3B82F6" },
  { name: "Low", value: 2, percent: "11.1%", color: "#34D399" },
];

const TOTAL = SEVERITY_DATA.reduce((sum, item) => sum + item.value, 0);

const TOP_ALERT_TYPES = [
  { name: "Duplicate Detection", value: 6, max: 6, color: "#F87171" },
  { name: "Anomaly", value: 4, max: 6, color: "#FBBF24" },
  { name: "Recovery Alert", value: 3, max: 6, color: "#60A5FA" },
  { name: "Review Activity", value: 2, max: 6, color: "#1E3A8A" },
  { name: "Data Change", value: 1, max: 6, color: "#0D9488" },
  { name: "System", value: 2, max: 6, color: "#34D399" },
];

export const VendorInsight = () => {
  return (
    <div className="w-full bg-white rounded-[16px] border border-[#D9E1EA] shadow-[0px_2px_8px_rgba(15,23,42,0.05)] p-5">
      <h2 className="text-[16px] font-semibold text-[#0F172A]">
        Alert Insights
      </h2>

      {/* Severity Donut */}
      <div className="mt-4">
        <p className="text-[13px] text-[#64748B] mb-3">
          Alerts by Severity
        </p>

        <div className="flex justify-center">
          <div className="relative h-[160px] w-[160px] shrink-0">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-[#0F172A]">
                {TOTAL}
              </span>
              <span className="text-[11px] font-semibold text-[#94A3B8] tracking-wide uppercase">
                Total
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEVERITY_DATA}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={78}
                  paddingAngle={2}
                >
                  {SEVERITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2.5 text-[13px]">
          {SEVERITY_DATA.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#475569]">{item.name}</span>
              </div>
              <span className="font-medium text-[#334155] shrink-0">
                {item.value} ({item.percent})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-5 border-t border-[#E5E7EB]" />

      {/* Top Alert Types */}
      <div>
        <p className="text-[13px] text-[#64748B] mb-4">
          Top Alert Types
        </p>

        <div className="flex flex-col gap-3.5">
          {TOP_ALERT_TYPES.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-[12px] text-[#475569] w-[120px] shrink-0 truncate">
                {item.name}
              </span>

              <div className="flex-1 h-[6px] rounded-full bg-[#F1F5F9] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.value / item.max) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              <span className="text-[12px] font-semibold text-[#0F172A] w-4 text-right shrink-0">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-5 border-t border-[#E5E7EB]" />

      <button className="w-full flex items-center justify-center gap-2 text-[13px] font-medium text-[#2563EB]">
        <History size={14} />
        View All Insights
      </button>
    </div>
  );
};