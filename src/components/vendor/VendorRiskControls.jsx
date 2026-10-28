"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const driverColors = [
  "bg-red-500",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-emerald-500",
];
const colors = ["#e63946", "#f59e0b", "#fbbf24", "#16a34a", "#64748b"];
export default function VendorRiskControls({ data, exposureData }) {
  const riskDrivers = Array.isArray(data)
    ? data.map((item, index) => [
        item.driver,
        Number(item.score ?? 0),
        driverColors[index % driverColors.length],
      ])
    : [];
  const riskScore = riskDrivers.length
    ? Math.round(
        riskDrivers.reduce((total, [, score]) => total + score, 0) /
          riskDrivers.length,
      )
    : 0;
 
  const findings = Array.isArray(exposureData?.findingsDistribution)
    ? exposureData.findingsDistribution.map((item, index) => ({
        name: item.findingType,
        value: Number(item.value ?? 0),
        formattedValue:
          item.formattedValue ?? Number(item.value ?? 0).toLocaleString(),
        percentage: Number(item.percentage ?? 0),
        color: colors[index % colors.length],
      }))
    : [];

  const totalFindings = findings.reduce((total, item) => total + item.value, 0);
  return (
    <section className="mt-4 grid gap-4 md:grid-cols-3">
      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xs font-semibold text-slate-900">
          Vendor Risk Profile
        </h2>
        <div className="relative mx-auto mt-4 h-36 w-56 overflow-hidden">
          <div className="absolute inset-x-5 top-0 h-28 rounded-t-full border-[13px] border-slate-200 border-b-0" />
          <div className="absolute left-5 top-0 h-28 w-[calc(50%_-_20px)] rounded-tl-full border-l-[13px] border-t-[13px] border-red-500" />
          <div className="absolute inset-x-0 top-10 text-center">
            <div className="text-4xl font-bold text-red-500">{riskScore}</div>
            <div className="mt-1 text-xs font-semibold text-slate-800">
              High Risk
            </div>
          </div>
          <span className="absolute bottom-0 left-0 text-[10px] font-semibold text-slate-500">
            0
          </span>
          <span className="absolute bottom-0 right-0 text-[10px] font-semibold text-slate-500">
            100
          </span>
        </div>
      </article>

      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xs font-semibold text-slate-900">Risk Drivers</h2>
        <div className="mt-4 space-y-3">
          {riskDrivers.map(([label, score, color]) => (
            <div
              key={label}
              className="grid grid-cols-[1.4fr_1fr_24px] items-center gap-2 text-[11px]"
            >
              <span className="text-slate-600">{label}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="text-right font-semibold text-slate-700">
                {score}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/vendor"
          className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
        >
          View full risk breakdown <ArrowRight size={13} />
        </Link>
      </article>

      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xs font-semibold text-slate-900">
          Exposure by Finding Type (USD)
        </h2>
        <div className="mt-3 flex items-center gap-6">
          <div className="relative h-50 w-40 shrink-0">
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="whitespace-nowrap text-[14px] font-bold text-slate-900">
                ${(totalFindings / 1000000).toFixed(2)}M
              </span>
              <span className="mt-0.5 text-[9px] text-slate-500">
                Total Findings
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={findings}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  stroke="none"
                >
                  {findings.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-3 text-[11px]">
            {findings.map((item) => (
              <div key={item.name} className="flex gap-1.5">
                <span
                  className="mt-1 h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="leading-4 text-slate-600">
                  {item.name}
                  <br />
                  {/* <b className="whitespace-nowrap text-slate-800">
                    {item.value.toLocaleString()} (
                    {totalFindings
                      ? ((item.value / totalFindings) * 100).toFixed(1)
                      : "0.0"}
                    %)
                  </b> */}
                  <b className="whitespace-nowrap text-slate-800">
                    {item.formattedValue} ({item.percentage}%)
                  </b>
                </span>
              </div>
            ))}
          </div>
        </div>
        <Link
          href="/cases"
          className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
        >
          View all findings <ArrowRight size={13} />
        </Link>
      </article>
    </section>
  );
}
