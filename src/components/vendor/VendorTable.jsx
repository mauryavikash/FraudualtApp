"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const tabs = [
  ["currency", "Currency Deviations"],
  ["invoice", "Invoice Number Deviations"],
  ["recurring", "Recurring Payment Deviations"],
];

function normalizeDeviation(deviation) {
  const value = String(deviation ?? "").toLowerCase();

  if (value.includes("currency") || value.includes("amount")) return "currency";
  if (
    value.includes("invoice") ||
    value.includes("duplicate") ||
    value.includes("potential-dup")
  )
    return "invoice";
  if (value.includes("recurring") || value.includes("irregular"))
    return "recurring";

  return value;
}
function normalizeType(type) {
  const value = String(type ?? "").toLowerCase();

  if (value.includes("currency")) return "currency";

  if (value.includes("invoice") || value.includes("duplicate")) {
    return "invoice";
  }

  if (value.includes("recurring")) return "recurring";

  return value;
}

export default function VendorTable({
  vendors,
  selectedVendorId,
  onSelectVendor,
}) {
  const [activeDeviation, setActiveDeviation] = useState("currency");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredVendors = useMemo(
    () =>
      vendors.filter(
        (vendor) => normalizeType(vendor.type) === activeDeviation,
      ),
    [vendors, activeDeviation],
  );

  const selectedVendor =
    filteredVendors.find((vendor) => vendor.vendorId === selectedVendorId) ??
    filteredVendors[0];

  if (!selectedVendor) {
    return (
      <section className="col-span-12 overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-8">
        <div className="p-10 text-center text-slate-500">
          No vendors found for this deviation type.
        </div>
      </section>
    );
  }
  const invoices = useMemo(
    () =>
      (selectedVendor?.invoices ?? []).filter(
        (invoice) =>
          normalizeDeviation(invoice.deviation) === activeDeviation &&
          JSON.stringify(invoice).toLowerCase().includes(search.toLowerCase()),
      ),
    [activeDeviation, search, selectedVendor],
  );
  const totalPages = Math.max(1, Math.ceil(invoices.length / ITEMS_PER_PAGE));

  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
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
            // onClick={() => setActiveDeviation(id)}
            onClick={() => {
              setActiveDeviation(id);
              setCurrentPage(1);
            }}
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
      <div className="grid h-[510px] min-h-0 grid-cols-1 lg:grid-cols-[235px_minmax(0,1fr)]">
        {/* LEFT SIDEBAR */}
        <aside className="bg-slate-50 lg:border-r lg:border-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
            Exception Vendors
          </div>

          <div className="h-[calc(100vh-220px)] overflow-y-auto overflow-x-hidden">
            {/* {vendors.map((vendor) => { */}
            {filteredVendors.map((vendor) => {
              const selected = vendor.vendorId === selectedVendorId;

              return (
                <button
                  key={vendor.vendorId}
                  type="button"
                  // onClick={() => onSelectVendor(vendor.vendorId)}
                  onClick={() => {
                    onSelectVendor(vendor.vendorId);
                    setCurrentPage(1);
                  }}
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
                // onChange={(event) => setSearch(event.target.value)}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search invoices"
                className="h-8 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="table-scrollbar h-[calc(500px-116px)] overflow-x-auto overflow-y-scroll">
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
                {/* {invoices.map((invoice) => ( */}
                {paginatedInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="h-12 border-b border-slate-200 bg-[#e9b7d929] hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-3 py-2 text-[11px] text-slate-600">
                      {invoice.posted ?? invoice.posted_date ?? "-"}
                    </td>

                    <td
                      title={
                        invoice.vendor ??
                        invoice.vendorName ??
                        selectedVendor.vendorName ??
                        "-"
                      }
                      className="max-w-36 truncate whitespace-nowrap px-3 py-2 text-[11px] font-semibold text-blue-600"
                    >
                      {invoice.vendor ??
                        invoice.vendorName ??
                        selectedVendor.vendorName ??
                        "-"}
                    </td>

                    <td className="max-w-28 truncate whitespace-nowrap px-3 py-2 text-[11px] text-slate-700">
                      {invoice.invoiceNo ?? invoice.invoice_no ?? "-"}
                    </td>

                    <td className="whitespace-nowrap px-3 py-2 text-[11px] text-slate-600">
                      {invoice.docNo ?? invoice.doc_no ?? "-"}
                    </td>

                    <td className="whitespace-nowrap px-3 py-2 text-[11px] text-slate-600">
                      {invoice.invDate ?? invoice.inv_date ?? "-"}
                    </td>

                    <td className="whitespace-nowrap px-3 py-2 text-[11px] font-bold text-slate-800">
                      {invoice.amount ?? "-"}
                    </td>

                    <td className="whitespace-nowrap px-3 py-2">
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

                    <td className="whitespace-nowrap px-3 py-2">
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
              Showing {paginatedInvoices.length} of {invoices.length} invoices
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-slate-500 disabled:opacity-40"
              >
                <ChevronLeft size={13} />
              </button>

              <span className="grid h-8 w-8 place-items-center rounded bg-blue-600 text-xs font-semibold text-white">
                {currentPage}
              </span>

              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-slate-500 disabled:opacity-40"
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
