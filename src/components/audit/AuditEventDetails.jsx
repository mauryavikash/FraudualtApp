"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

const details = [
  ["Case ID", "CASE-2025-00891"],
  ["Invoice", "INV-00023456"],
  ["Vendor", "VEND-1045 - Global Supplies Inc."],
  ["Exposure (USD)", "$28,456.00"],
];

export default function AuditEventDetails() {
  return (
    <section className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between"><h2 className="text-sm font-semibold text-slate-900">Event Details</h2><X size={15} className="text-slate-400" /></div>
        <div className="mt-3 flex items-center justify-between"><span className="rounded bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">User Decision</span><span className="text-[10px] font-semibold text-slate-700">EVT-2025-0056789</span></div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-500"><span>May 31, 2025 14:32:18 (UTC)</span><span>2 minutes ago</span></div>
        <div className="mt-4 border-t border-slate-100 pt-3"><p className="text-[10px] font-semibold text-slate-700">Summary</p><p className="mt-2 text-xs font-medium text-slate-900">Marked as True Duplicate</p></div>
      </article>

      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Case / Invoice / Vendor</h2>
        <dl className="mt-4 space-y-2 text-[10px]">{details.map(([label, value]) => <div key={label} className="grid grid-cols-[88px_1fr] gap-2"><dt className="text-slate-500">{label}</dt><dd className={label === "Exposure (USD)" ? "font-semibold text-slate-800" : "font-medium text-blue-600"}>{value}</dd></div>)}</dl>
      </article>

      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Risk &amp; Confidence</h2>
        <div className="mt-4 space-y-4 text-[11px]"><div className="flex justify-between"><span className="text-slate-500">Risk Level</span><span className="rounded bg-red-50 px-2 py-0.5 font-medium text-red-600">Critical</span></div><div className="grid grid-cols-[70px_1fr_auto] items-center gap-2"><span className="text-slate-500">Confidence</span><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[98%] rounded-full bg-emerald-500" /></div><span className="font-semibold text-emerald-700">98%</span></div></div>
        <div className="mt-5 border-t border-slate-100 pt-3"><p className="text-[10px] font-semibold text-slate-700">Actor</p><div className="mt-2 flex items-center gap-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[9px] font-semibold text-white">SJ</span><div><p className="text-xs font-semibold text-slate-800">Sarah Johnson</p><p className="text-[10px] text-slate-500">Investigator</p></div></div></div>
      </article>

      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Decision</h2>
        <dl className="mt-4 space-y-2 text-[10px]"><div className="grid grid-cols-[64px_1fr] gap-2"><dt className="text-slate-500">Outcome</dt><dd className="font-semibold text-slate-800">True Duplicate</dd></div><div className="grid grid-cols-[64px_1fr] gap-2"><dt className="text-slate-500">Action Taken</dt><dd className="text-slate-700">Confirmed Duplicate</dd></div><div className="grid grid-cols-[64px_1fr] gap-2"><dt className="text-slate-500">Reason</dt><dd className="text-slate-700">Exact match on key invoice fields. Duplicate identified.</dd></div></dl>
        <div className="mt-4 border-t border-slate-100 pt-3"><p className="text-[10px] font-semibold text-slate-700">Linked Events (4)</p><div className="mt-2 space-y-1.5 text-[10px] text-slate-600"><p className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-blue-600" /> Detection by Rule R1</p><p className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-violet-600" /> AI Recommendation</p><p className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-600" /> User Decision (This Event)</p></div></div>
        <Link href="/cases" className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800">Open Related Case <ArrowRight size={13} /></Link>
      </article>
    </section>
  );
}
