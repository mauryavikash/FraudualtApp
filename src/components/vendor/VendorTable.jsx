"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const tabs = [
  ["currency", "Currency Deviations"],
  ["invoice", "Invoice Number Deviations"],
  ["recurring", "Recurring Payment Deviations"],
];

export default function VendorTable({
  vendors,
  selectedVendorId,
  onSelectVendor,
}) {
  const [activeDeviation, setActiveDeviation] = useState("currency");
  const [search, setSearch] = useState("");

  const selectedVendor =
    vendors.find((vendor) => vendor.vendorId === selectedVendorId) ??
    vendors[0];

  const invoices = useMemo(
    () =>
      (selectedVendor?.invoices ?? []).filter(
        (invoice) =>
          invoice.deviation === activeDeviation &&
          JSON.stringify(invoice)
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [activeDeviation, search, selectedVendor]
  );

  return (
    <section className="col-span-12 overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-8">
      {/* TOP TABS */}
      <nav
        className="flex gap-6 overflow-x-auto border-b border-slate-200 px-4"
        aria-label="Deviation category"
      >
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveDeviation(id)}
            className={`shrink-0 border-b-2 py-4 text-sm font-semibold transition-colors ${
              activeDeviation === id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <div className="grid min-h-[510px] grid-cols-1 lg:grid-cols-[235px_minmax(0,1fr)]">
        {/* LEFT SIDEBAR */}
        <aside className="bg-slate-50 lg:border-r lg:border-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
            Exception Vendors
          </div>

          <div className="h-[calc(100vh-280px)] overflow-y-auto overflow-x-hidden">
            {vendors.map((vendor) => {
              const selected = vendor.vendorId === selectedVendorId;

              return (
                <button
                  key={vendor.vendorId}
                  type="button"
                  onClick={() => onSelectVendor(vendor.vendorId)}
                  className={`w-full border-b border-slate-200 px-4 py-4 text-left transition-all duration-200 ${
                    selected
                    ? "bg-[#e9b7d929] border-t-2 border-t-[#A78BFA]"
                    : "bg-white hover:bg-slate-50"
                                      }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16px] font-bold text-slate-800">
                      {vendor.vendorId}
                    </h3>

                    <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500">
                      {vendor.issues} issues
                    </span>
                  </div>

                  <p className="truncate text-[15px] text-slate-600">
                    {vendor.vendorName}
                  </p>

                  <p className="text-[14px] font-bold text-slate-900">
                    {vendor.totalAmount}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {/* TABLE SECTION */}
        <div className="min-w-0 flex h-full flex-col">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-md font-semibold text-slate-800">
              Invoices with deviations
            </h2>

            <label className="relative block sm:w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search invoices"
                className="h-8 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[670px] bg-white">
              <thead className="border-b bg-slate-100">
                <tr>
                  {[
                    "Posted",
                    "Vendor",
                    "Invoice no.",
                    "Doc no.",
                    "Inv date",
                    "Amount",
                    "Category",
                    "Risk",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-500"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-slate-200 bg-[#e9b7d929] hover:bg-slate-50"
                  >
                    <td className="px-3 py-3 text-[11px] text-slate-600">
                      {invoice.posted}
                    </td>

                    <td className="px-3 py-3 text-[11px] font-semibold text-blue-600">
                      {selectedVendor.vendorId}
                    </td>

                    <td className="max-w-28 truncate px-3 py-3 text-[11px] text-slate-700">
                      {invoice.invoiceNo}
                    </td>

                    <td className="px-3 py-3 text-[11px] text-slate-600">
                      {invoice.docNo}
                    </td>

                    <td className="px-3 py-3 text-[11px] text-slate-600">
                      {invoice.invDate}
                    </td>

                    <td className="px-3 py-3 text-[11px] font-bold text-slate-800">
                      {invoice.amount}
                    </td>

                    <td className="px-3 py-3">
                      <span
                        className={`rounded px-2 py-1 text-[9px] font-semibold ${
                          invoice.category === "Exact Match"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {invoice.category}
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <span
                        className={`rounded px-2 py-1 text-[9px] font-semibold ${
                          invoice.risk === "High"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {invoice.risk}
                      </span>
                    </td>
                  </tr>
                ))}

                {invoices.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-3 py-12 text-center text-sm text-slate-500"
                    >
                      No invoices found for this deviation type.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="mt-auto flex items-center justify-between border-t border-slate-200 p-3">
            <span className="text-[10px] text-slate-500">
              {/* Showing {invoices.length} of {selectedVendor.invoices.length}{" "}
              invoices */}
              Showing {invoices?.length || 0} of {selectedVendor?.invoices?.length || 0} invoices
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Previous page"
                className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-slate-500"
              >
                <ChevronLeft size={13} />
              </button>

              <span className="grid h-8 w-8 place-items-center rounded bg-blue-600 text-xs font-semibold text-white">
                1
              </span>

              <button
                type="button"
                aria-label="Next page"
                className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-slate-500"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}