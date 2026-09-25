"use client";

import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const briefingItems = [
  { title: "What changed?", text: "Duplicate exposure increased 10.1% driven by Near & Potential duplicates in the APAC region.", label: "View details", href: "/audit" },
  { title: "Where risk is concentrated?", text: "Top 5 vendors contribute to 68% of total exposure.", label: "View vendors", href: "/vendor" },
  { title: "What should be addressed first?", text: "High-risk paid exposure of $32.4M with aging > 90 days.", label: "View cases", href: "/cases" },
  { title: "Potential cash impact", text: "$48.9M recovery opportunity identified in validated cases.", label: "View recoveries", href: "/recoveries" },
  { title: "Why AI recommends this?", text: "Based on risk, confidence, payment status, and value at risk.", label: "View reasoning", href: "/audit" },
];

const detectionMix = [
  { name: "Rule-Based", value: 9842, color: "#2563eb" },
  { name: "Agentic AI", value: 7981, color: "#7c3aed" },
  { name: "Hybrid (Rule + AI)", value: 919, color: "#14b8a6" },
];

const vendors = [
  ["VEND-10045", "1,842", "$28.7M", "High"],
  ["VEND-20078", "1,435", "$21.4M", "High"],
  ["VEND-30021", "1,123", "$15.6M", "Medium"],
  ["VEND-11009", "862", "$11.2M", "Medium"],
  ["VEND-40056", "734", "$8.9M", "Medium"],
];

const recommendations = [
  "Review high-risk paid duplicates > 90 days amounting to $32.4M.",
  "Validate unusual USD payments for first-time currency vendors.",
  "Investigate amount anomalies > 10x vendor normal range.",
];

const riskMatrix = [
  ["1,024", "2,843", "4,672"],
  ["1,896", "3,245", "2,511"],
  ["1,102", "1,235", "214"],
];

const matrixColors = [
  ["bg-amber-50", "bg-orange-100", "bg-red-400"],
  ["bg-amber-50", "bg-amber-100", "bg-orange-200"],
  ["bg-emerald-50", "bg-lime-50", "bg-green-100"],
];

function ArrowLink({ children, href }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800">
      {children} <ArrowRight size={13} />
    </Link>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

function normalizeRiskMatrix(items) {
  if (!Array.isArray(items) || !items.length) {
    return riskMatrix;
  }

  if (Array.isArray(items[0])) {
    return items;
  }

  const riskLevels = ["High", "Medium", "Low"];
  const confidenceLevels = ["Low", "Medium", "High"];

  return riskLevels.map((riskLevel) =>
    confidenceLevels.map((confidenceLevel) =>
      items
        .filter((item) => {
          const itemRisk = String(item.risk ?? "").toLowerCase();
          const itemConfidence = String(item.confidence ?? "").toLowerCase();
          const matchesRisk = riskLevel === "High"
            ? itemRisk === "high" || itemRisk === "critical"
            : itemRisk === riskLevel.toLowerCase();

          return matchesRisk && itemConfidence === confidenceLevel.toLowerCase();
        })
        .reduce((total, item) => total + Number(item.count ?? item.value ?? 0), 0)
        .toLocaleString()
    )
  );
}

export default function AiExecutiveBriefing({ data }) {
  const apiData = data ?? {};
  const activeBriefingItems = Array.isArray(apiData.briefingItems) && apiData.briefingItems.length
    ? briefingItems.map((item, index) => ({ ...item, ...apiData.briefingItems[index] }))
    : briefingItems;
  const activeDetectionMix = Array.isArray(apiData.detectionMix) && apiData.detectionMix.length
    ? apiData.detectionMix
    : detectionMix;
  const activeRiskMatrix = normalizeRiskMatrix(apiData.riskMatrix);
  const activeVendors = Array.isArray(apiData.vendors) && apiData.vendors.length
    ? apiData.vendors.map((vendor) => Array.isArray(vendor)
      ? vendor
      : [
          vendor.vendor ?? vendor.vendorId ?? "Unknown vendor",
          Number(vendor.findings ?? vendor.count ?? 0).toLocaleString(),
          vendor.exposure ?? vendor.exposureValue ?? vendor.amount
            ? formatCurrency(vendor.exposure ?? vendor.exposureValue ?? vendor.amount)
            : "$0",
          vendor.risk ?? "Low",
        ])
    : vendors;
  const activeRecommendations = Array.isArray(apiData.recommendations) && apiData.recommendations.length
    ? apiData.recommendations.map((recommendation) =>
      typeof recommendation === "string"
        ? recommendation
        : recommendation.recommendation ?? recommendation.text ?? recommendation.title ?? ""
    )
    : recommendations;
  const detectionTotal = activeDetectionMix.reduce((total, item) => total + Number(item.value || 0), 0);

  return (
    <section className="space-y-3">
      <div className="rounded-lg border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-violet-50 p-3 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-800">
          <Sparkles size={16} /> AI Executive Briefing
        </div>
        <div className="grid divide-y divide-violet-100 overflow-hidden rounded-lg border border-violet-200 bg-white md:grid-cols-5 md:divide-x md:divide-y-0">
          {activeBriefingItems.map((item) => (
            <div key={item.title} className="flex min-h-[100px] flex-col px-3 py-2.5">
              <h3 className="text-[11px] font-bold text-slate-800">{item.title}</h3>
              <p className="mt-1 flex-1 text-[11px] leading-4 text-slate-600">{item.text}</p>
              <ArrowLink href={item.href}>{item.label}</ArrowLink>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-12">
        <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm 2xl:col-span-3">
          <h2 className="text-xs font-semibold text-slate-900">Detection Mix (By Source)</h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-36 w-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={activeDetectionMix} dataKey="value" innerRadius={36} outerRadius={53} paddingAngle={2} stroke="none">
                    {activeDetectionMix.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => Number(value).toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 text-[10px]">
              {activeDetectionMix.map((item) => (
                <div key={item.name} className="text-slate-600">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.name}</span>
                  <p className="mt-0.5 pl-3.5">{Number(item.value).toLocaleString()} ({detectionTotal ? ((item.value / detectionTotal) * 100).toFixed(1) : "0.0"}%)</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm 2xl:col-span-3">
          <h2 className="text-xs font-semibold text-slate-900">Risk &amp; Confidence Matrix</h2>
          <p className="text-[10px] text-slate-600">(Count of Findings)</p>
          <div className="mt-2 grid gap-px text-center text-[9px]" style={{ gridTemplateColumns: "42px repeat(3, minmax(0, 1fr))" }}>
            <span />
            {['Low (0-64%)', 'Medium (65-84%)', 'High (85-100%)'].map((label) => <span key={label} className="px-1 py-1 font-semibold text-slate-600">{label}</span>)}
            {activeRiskMatrix.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                <span className="self-center text-left font-semibold text-slate-600">{["High", "Medium", "Low"][rowIndex]}</span>
                {row?.map((value, columnIndex) => (
                  <Link key={value} href="/cases" className={`flex min-h-9 items-center justify-center px-1 font-semibold text-slate-700 transition hover:ring-2 hover:ring-violet-400 ${matrixColors[rowIndex][columnIndex]}`}>
                    {value}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[10px] text-slate-500">Select a cell to view filtered cases</p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm 2xl:col-span-4">
          <h2 className="mb-3 text-xs font-semibold text-slate-900">Top Vendor Exposure</h2>
          <div className="grid grid-cols-[1.2fr_.75fr_.85fr_.55fr] border-b border-slate-200 pb-1 text-[9px] font-semibold text-slate-600">
            <span>Vendor</span><span>Findings</span><span>Exposure (USD)</span><span>Risk</span>
          </div>
          <div className="space-y-1.5 pt-2">
            {activeVendors.map((vendorItem) => {
              const [vendor, findings, exposure, risk] = Array.isArray(vendorItem)
                ? vendorItem
                : [vendorItem.vendor, vendorItem.findings, vendorItem.exposure, vendorItem.risk];

              return <div key={vendor} className="grid grid-cols-[1.2fr_.75fr_.85fr_.55fr] items-center text-[10px] text-slate-700">
                <span>{vendor}</span><span>{findings}</span><span>{exposure}</span>
                <span className={`w-fit rounded px-1.5 py-0.5 text-[9px] font-semibold text-white ${risk === "High" ? "bg-red-500" : "bg-orange-400"}`}>{risk}</span>
              </div>;
            })}
          </div>
          <div className="mt-4 text-right"><ArrowLink href="/vendor">View all vendors</ArrowLink></div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm 2xl:col-span-2">
          <h2 className="mb-3 text-xs font-semibold text-slate-900">AI Top Recommendations</h2>
          <div className="space-y-3">
            {activeRecommendations.map((recommendation, index) => (
              <Link key={recommendation} href="/cases" className="flex gap-2 text-[9px] leading-4 text-slate-700 hover:text-violet-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-violet-300 text-[10px] font-semibold text-violet-700">{index + 1}</span>
                {recommendation}
              </Link>
            ))}
          </div>
          <div className="mt-4 text-right"><ArrowLink href="/cases">View all recommendations</ArrowLink></div>
        </article>
      </div>
    </section>
  );
}