"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CircleAlert, LockKeyhole, ShieldCheck } from "lucide-react";

const issues = [
  [CircleAlert, "Unusual invoice amounts detected", "Amount anomalies above normal range", "High", "25 cases", "text-red-600", "bg-red-50", "text-red-600"],
  [AlertTriangle, "First-time or rare currencies", "GBP used for the first time", "Medium", "7 cases", "text-amber-600", "bg-amber-50", "text-amber-600"],
  [LockKeyhole, "Potential duplicate invoices", "78 potential duplicates identified", "High", "78 cases", "text-orange-600", "bg-orange-50", "text-red-600"],
  [CircleAlert, "Recurring payment deviations", "3 payment deviations", "Medium", "3 cases", "text-amber-500", "bg-amber-50", "text-amber-600"],
];

const findings = [
  ["CASE-2025-00891", "Amount Anomaly", "High", "$24,560.00", "May 28, 2025"],
  ["CASE-2025-00876", "Potential Duplicate", "High", "$15,987.20", "May 27, 2025"],
  ["CASE-2025-00851", "Currency Deviation", "Medium", "$11,230.00", "May 26, 2025"],
  ["CASE-2025-00847", "True Duplicate", "Critical", "$22,110.40", "May 25, 2025"],
  ["CASE-2025-00833", "Recurring Deviation", "Medium", "$8,900.00", "May 24, 2025"],
];

const actions = [
  [CircleAlert, "Review high-value anomalies", "Multiple high-value annual amount anomalies detected exceeding customer norms.", "High Impact", "text-red-600", "bg-red-50", "text-red-600"],
  [AlertTriangle, "Validate currency usage", "GBP used for the first time. Verify contract / PO and vendor master.", "Medium Impact", "text-amber-600", "bg-amber-50", "text-amber-600"],
  [ShieldCheck, "Strengthen duplicate prevention", "72 potential duplicates identified. Consider tighter matching rules.", "Medium Impact", "text-emerald-600", "bg-emerald-50", "text-emerald-600"],
];

const panel = "rounded-lg border border-slate-200 bg-white p-4 shadow-sm";
const impactClass = (impact) => impact === "High Impact" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600";

export default function VendorFindingsActions() {
  return (
    <section className="mt-4 grid gap-4 xl:grid-cols-3">
      <article className={panel}>
        <h2 className="text-xs font-semibold text-slate-900">Top Issues for This Vendor</h2>
        <div className="mt-4 space-y-3">{issues.map(([Icon, title, detail, risk, count, color, background, riskColor]) => <div key={title} className="grid grid-cols-[20px_minmax(0,1fr)_auto] gap-2"><span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${background} ${color}`}><Icon size={12} /></span><div className="min-w-0"><p className="text-[11px] font-medium text-slate-800">{title}</p><p className="mt-0.5 text-[9px] text-slate-500">{detail}</p></div><div className="text-right"><span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${riskColor} ${background}`}>{risk}</span><p className="mt-1 text-[9px] text-slate-500">{count}</p></div></div>)}</div>
        <Link href="/cases" className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800">View all issues <ArrowRight size={13} /></Link>
      </article>

      <article className={panel}>
        <h2 className="text-xs font-semibold text-slate-900">Recent Findings</h2>
        <div className="mt-4 space-y-3">{findings.map(([caseId, type, priority, amount, date]) => <Link key={caseId} href="/cases" className="grid grid-cols-[1.25fr_1.3fr_.7fr_.9fr_1fr] items-center gap-1 text-[9px] hover:text-blue-700"><span className="font-semibold text-blue-600">{caseId}</span><span className="rounded bg-violet-50 px-1.5 py-0.5 text-center text-violet-700">{type}</span><span className={`rounded px-1.5 py-0.5 text-center ${priority === "Critical" ? "bg-red-50 text-red-600" : priority === "High" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"}`}>{priority}</span><span className="font-semibold text-slate-700">{amount}</span><span className="text-slate-500">{date}</span></Link>)}</div>
        <Link href="/cases" className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800">View all findings <ArrowRight size={13} /></Link>
      </article>

      <article className={panel}>
        <h2 className="text-xs font-semibold text-slate-900">Recommended Actions (AI)</h2>
        <div className="mt-4 space-y-4">{actions.map(([Icon, title, detail, impact, color, background]) => <div key={title} className="grid grid-cols-[20px_minmax(0,1fr)_auto] gap-2"><span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${background} ${color}`}><Icon size={12} /></span><div><p className="text-[11px] font-medium text-slate-800">{title}</p><p className="mt-0.5 text-[9px] leading-3 text-slate-500">{detail}</p></div><span className={`h-fit rounded px-1.5 py-0.5 text-[9px] font-medium ${impactClass(impact)}`}>{impact}</span></div>)}</div>
        <Link href="/cases" className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800">View all recommendations <ArrowRight size={13} /></Link>
      </article>
    </section>
  );
}
