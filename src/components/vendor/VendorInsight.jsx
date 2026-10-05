"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  Download,
  FileText,
  Repeat2,
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

  if (!vendor) return null;

  const initials = vendor.vendorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

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
          className="h-8 rounded-md bg-blue-600 text-[10px] font-semibold text-white hover:bg-blue-700"
        >
          View Exceptions
        </button>

        <button
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
        </button>
      </footer>
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