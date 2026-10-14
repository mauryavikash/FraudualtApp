"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const panelClass = "min-w-0 rounded-[10px] border border-[#E2E8F0] bg-white p-4 shadow-[0px_1px_4px_rgba(15,23,42,0.05)]";

function DonutPanel({ title, data }) {
  return (
    <article className={panelClass}>
      <h3 className="text-[13px] font-semibold text-[#0F172A]">{title}</h3>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-[104px] w-[104px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={31} outerRadius={48} paddingAngle={2} stroke="none">
                {data.map((item) => <Cell key={item.name} fill={item.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="min-w-0 space-y-2 text-[10px] text-[#334155]">
          {data.map((item) => (
            <div key={item.name} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="min-w-0 leading-3">
                {item.name}
                <strong className="block font-semibold text-[#0F172A]">{item.value} ({item.percent})</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

const chartColors = ["#2563EB", "#7C3AED", "#0F9FAF", "#DC2626", "#F97316", "#9CA3AF"];

function normalizeChart(items, labelKey) {
  return Array.isArray(items)
    ? items.map((item, index) => ({
        name: item.name ?? item[labelKey] ?? "Unknown",
        value: Number(item.value ?? 0),
        percent: item.percent ?? "0%",
        color: chartColors[index % chartColors.length],
      }))
    : [];
}

export default function CasesAnalyticsRow({ data }) {
  const detectionSourceData = normalizeChart(data?.detectionSource, "name");
  const findingTypesData = normalizeChart(data?.findingTypes, "name");
  const riskDistributionData = normalizeChart(data?.riskDistribution, "riskLevel");
  const paymentStatusData = normalizeChart(data?.paymentStatus, "status");
  const maxFindingValue = Math.max(...findingTypesData.map((item) => item.value), 1);

  return (
    <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4 xl:grid-cols-4">
      <DonutPanel title="Detection Source" data={detectionSourceData} />
      <article className={panelClass}>
        <h3 className="text-[13px] font-semibold text-[#0F172A]">Finding Type</h3>
        <div className="mt-4 space-y-2 text-[10px] text-[#334155]">
          {findingTypesData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-[126px] shrink-0 truncate">{item.name}</span>
              <span className="h-[7px] flex-1 rounded-sm bg-[#E2E8F0]">
                <span className="block h-full rounded-sm bg-[#3978D8]" style={{ width: `${(item.value / maxFindingValue) * 100}%` }} />
              </span>
              <span className="w-[58px] text-right">{item.value} ({item.percent})</span>
            </div>
          ))}
        </div>
      </article>
      <DonutPanel title="Risk Distribution" data={riskDistributionData} />
      <DonutPanel title="Payment Status" data={paymentStatusData} />
    </section>
  );
}