"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  Download,
  FileText,
  Repeat2,
  X,
} from "lucide-react";

const deviationVisuals = {
  currency: {
    icon: DollarSign,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  invoice: {
    icon: FileText,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  recurring: {
    icon: Repeat2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

export default function VendorInsight({ vendor }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isExceptionsOpen, setIsExceptionsOpen] = useState(false);

  if (!vendor) return null;

  const initials = vendor.vendorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  const exceptionInvoices = (vendor.invoices ?? []).filter(
    (invoice) => invoice.deviation
  );

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
      {/* HEADER */}
      <header className="flex items-start justify-between border-b border-slate-300 p-4">
        <div className="flex gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
            {initials}
          </span>

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Vendor {vendor.vendorId}
            </h2>

            <p className="text-[10px] text-slate-500">
              {vendor.vendorName}
            </p>

            <p className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {vendor.status}
            </p>
          </div>
        </div>

        <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold text-rose-600">
          {vendor.risk}
        </span>
      </header>

      {/* TABS */}
      <nav
        className="flex gap-4 overflow-x-auto border-b border-slate-300 px-4"
        aria-label="Vendor details"
      >
        {[
          ["overview", "Overview"],
          ["deviations", `Deviations (${vendor.issues})`],
          ["invoices", `Invoices (${vendor.summary.invoices})`],
          ["history", "History"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`shrink-0 border-b-2 py-3 text-[10px] font-medium ${
              activeTab === id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <div className="space-y-4 p-4">
        {activeTab === "overview" && (
          <>
            {/* {vendor.deviations.map((deviation) => { */}
            {(vendor?.deviations || []).map((deviation) => {
              const visual =
                deviationVisuals[deviation.type] ??
                deviationVisuals.invoice;

              const Icon = visual.icon;

              return (
                <button
                  key={deviation.type}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-colors hover:bg-slate-100"
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full ${visual.bg} ${visual.color}`}
                  >
                    <Icon size={15} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-slate-800">
                      {deviation.title}
                    </span>

                    <span className="block text-[10px] text-slate-500">
                      {deviation.count} detected
                    </span>

                    <span className="block text-[9px] text-slate-400">
                      Last detected May 20, 2026
                    </span>
                  </span>

                  <ChevronRight
                    size={15}
                    className="text-slate-400"
                  />
                </button>
              );
            })}

            <Summary summary={vendor.summary} />
          </>
        )}

        {activeTab !== "overview" && (
          <p className="py-12 text-center text-xs text-slate-500">
            Select a deviation category in the table to review {activeTab}.
          </p>
        )}
      </div>

      {/* FOOTER */}
      <footer className="mt-auto grid grid-cols-[1fr_1fr_34px] gap-2 border-t border-slate-300 p-4">
        <button
          type="button"
          onClick={() => setIsExceptionsOpen(true)}
          className="h-8 rounded-md bg-blue-600 text-[10px] font-semibold text-white hover:bg-blue-700"
        >
          View Exceptions
        </button>

        {/* <button
          type="button"
          className="flex h-8 items-center justify-center gap-1 rounded-md border border-slate-300 text-[10px] font-semibold text-slate-600 hover:bg-slate-50"
        >
          <Download size={12} />
          Download Receipt
        </button>

        <button
          type="button"
          aria-label="More vendor actions"
          className="grid h-8 place-items-center rounded-md border border-slate-300 text-slate-500"
        >
          <ChevronDown size={13} />
        </button> */}
      </footer>
      {isExceptionsOpen && typeof document !== "undefined" && createPortal(
        <div
          role="presentation"
          onClick={() => setIsExceptionsOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="vendor-exceptions-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl"
          >
            <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Vendor exceptions</p>
                <h2 id="vendor-exceptions-title" className="mt-1 text-lg font-semibold text-slate-900">
                  {vendor.vendorName}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close vendor exceptions"
                onClick={() => setIsExceptionsOpen(false)}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </header>

            <div className="max-h-[60vh] overflow-auto p-5">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="border-b bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Invoice no.</th>
                    <th className="px-3 py-2">Posted</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {exceptionInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-slate-100 text-slate-700">
                      <td className="px-3 py-3">{invoice.invoiceNo ?? invoice.invoice_no ?? "-"}</td>
                      <td className="px-3 py-3">{invoice.posted ?? invoice.posted_date ?? "-"}</td>
                      <td className="px-3 py-3">{invoice.category ?? invoice.deviation}</td>
                      <td className="px-3 py-3 font-semibold">{invoice.amount ?? "-"}</td>
                      <td className="px-3 py-3">{invoice.risk ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {exceptionInvoices.length === 0 && (
                <p className="py-10 text-center text-sm text-slate-500">No exceptions found for this vendor.</p>
              )}
            </div>
          </section>
        </div>,
        document.body
      )}
    </aside>
  );
}

function Summary({ summary }) {
  return (
    <section className="rounded-xl border border-slate-300 p-4">
      <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
        Summary
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        <Metric label="Total invoices" value={summary.invoices} />

        <Metric
          label="Open exceptions"
          value={summary.exceptions}
          alert
        />

        <Metric
          label="Total amount (USD)"
          value={summary.totalAmount}
        />

        <Metric
          label="Exception amount"
          value={summary.exceptionAmount}
          alert
        />
      </div>
    </section>
  );
}

function Metric({ label, value, alert }) {
  return (
    <div>
      <p className="text-[9px] text-slate-400">{label}</p>

      <p
        className={`mt-0.5 text-sm font-bold ${
          alert ? "text-rose-500" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}