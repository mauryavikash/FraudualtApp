"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const panel = "rounded-lg border border-slate-200 bg-white p-4 shadow-sm";

function DonutPanel({ title, data, action }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return <article className={panel}><h2 className="text-xs font-semibold text-slate-900">{title}</h2><div className="mt-4 flex items-center gap-3"><div className="h-32 w-32 shrink-0"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" innerRadius={34} outerRadius={53} paddingAngle={2} stroke="none">{data.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie></PieChart></ResponsiveContainer></div><div className="space-y-2 text-[9px] text-slate-600">{data.map((item) => <div key={item.name} className="flex gap-1.5"><span className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><span>{item.name} <b className="text-slate-800">{((item.value / total) * 100).toFixed(1)}% ({item.value.toLocaleString()})</b></span></div>)}</div></div><Link href="/audit" className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">{action} <ArrowRight size={13} /></Link></article>;
}

const colors = ["#2563eb", "#6d28d9", "#16a34a", "#ef4444", "#f59e0b", "#64748b"];

export default function AuditActivityAnalytics({ data }) {
  const events = Array.isArray(data?.eventTrends)
    ? data.eventTrends.map((item) => ({ ...item, day: item.date }))
    : [];
  const types = Array.isArray(data?.activityTypes)
    ? data.activityTypes.map((item, index) => ({ name: item.type, value: Number(item.count ?? 0), color: colors[index % colors.length] }))
    : [];
  const actors = Array.isArray(data?.actorDistribution)
    ? data.actorDistribution.map((item, index) => ({ name: item.actor, value: Number(item.count ?? 0), color: colors[index % colors.length] }))
    : [];
  const risks = Array.isArray(data?.riskDistribution)
    ? data.riskDistribution.map((item) => [item.riskLevel, `${item.count} (${item.percentage}%)`, item.percentage, item.riskLevel === "CRITICAL" ? "bg-red-500" : item.riskLevel === "HIGH" ? "bg-orange-500" : "bg-emerald-500"])
    : [];
  return <section className="mt-4 grid gap-3 xl:grid-cols-4">
    <article className={panel}><h2 className="text-xs font-semibold text-slate-900">Events Over Time</h2><div className="mt-2 flex flex-wrap gap-2 text-[9px] text-slate-600">{[["Detections", "#2563eb"], ["AI Recommendations", "#6d28d9"], ["User Actions", "#16a34a"], ["Overrides", "#ef4444"]].map(([label, color]) => <span key={label}><i className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />{label}</span>)}</div><div className="mt-2 h-32"><ResponsiveContainer width="100%" height="100%"><LineChart data={events} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e2e8f0" /><XAxis dataKey="day" tick={{ fontSize: 8, fill: "#64748b" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 8, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}K`} /><Tooltip /><Line dataKey="detections" stroke="#2563eb" strokeWidth={2} dot={false} /><Line dataKey="recommendations" stroke="#6d28d9" strokeWidth={2} dot={false} /><Line dataKey="actions" stroke="#16a34a" strokeWidth={2} dot={false} /><Line dataKey="overrides" stroke="#ef4444" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div><Link href="/audit" className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">View full trend <ArrowRight size={13} /></Link></article>
    <DonutPanel title="Event Type Distribution" data={types} action="View type analysis" />
    <DonutPanel title="Actor Type Distribution" data={actors} action="View actor analysis" />
    <article className={panel}><h2 className="text-xs font-semibold text-slate-900">Risk &amp; Confidence Overview</h2><p className="mt-4 text-[10px] font-semibold text-slate-700">Risk Level (by Events)</p><div className="mt-3 space-y-3">{risks.map(([label, value, score, color]) => <div key={label} className="grid grid-cols-[70px_1fr_76px] items-center gap-2 text-[10px]"><span className="text-slate-600">{label}</span><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} /></div><span className="text-right text-slate-600">{value}</span></div>)}</div><div className="mt-5 border-t border-slate-200 pt-4"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[10px]"><span className="font-semibold text-slate-700">Avg. Confidence</span><span className="font-bold text-slate-800">88.6%</span><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[88.6%] rounded-full bg-emerald-500" /></div></div></div><Link href="/audit" className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">View details <ArrowRight size={13} /></Link></article>
  </section>;
}
