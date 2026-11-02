"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const tabs = [
  ["currency", "Currency Deviations"],
  ["invoice", "Invoice Number Deviations"],
  ["recurring", "Recurring Payment Deviations"],
  ["outlier", "Outlier Anomaly"],
  ["onetime", "One-time Vendor Findings"],
  ["500k", "500K-plus Findings"],
];

const columns = [
  ["posted", "Posted"],
  ["vendor", "Vendor"],
  ["invoiceNo", "Invoice no."],
  ["docNo", "Doc no."],
  ["invDate", "Inv date"],
  ["amount", "Amount"],
  ["category", "Category"],
  ["risk", "Risk"],
];

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDeviationType(invoice) {
  const labels = [
    invoice?.id,
    invoice?.deviation,
    invoice?.type,
    invoice?.category,
    invoice?.finding,
    invoice?.findingType,
    invoice?.deviationType,
    invoice?.deviation_type,
    invoice?.issueType,
    invoice?.issue_type,
  ]
    .map(normalizeText)
    .filter(Boolean);

  if (labels.some((label) => /currency|amount deviation/.test(label))) {
    return "currency";
  }
  if (labels.some((label) => /invoice|duplicate/.test(label))) {
    return "invoice";
  }
  if (labels.some((label) => /recurring|irregular/.test(label))) {
    return "recurring";
  }
  if (labels.some((label) => /outlier|anomal/.test(label))) {
    return "outlier";
  }
  if (labels.some((label) => /one time|onetime/.test(label))) {
    return "onetime";
  }

  return null;
}

function getAmountValue(amount) {
  if (typeof amount === "number") {
    return Number.isFinite(amount) ? amount : null;
  }

  const normalized = String(amount ?? "")
    .trim()
    .replace(/,/g, "")
    .replace(/[^0-9.+\-kmb]/gi, "");
  const match = normalized.match(/^([+-]?\d*\.?\d+)([kmb])?$/i);

  if (!match) {
    return null;
  }

  const multipliers = { k: 1_000, m: 1_000_000, b: 1_000_000_000 };
  const value = Number(match[1]) * (multipliers[match[2]?.toLowerCase()] ?? 1);
  return Number.isFinite(value) ? value : null;
}

function matchesDeviation(invoice, deviation) {
  if (deviation === "500k") {
    return getAmountValue(invoice?.amount) >= 500_000;
  }

  return getDeviationType(invoice) === deviation;
}

function getInvoiceValue(invoice, vendor, column) {
  switch (column) {
    case "posted":
      return invoice.posted ?? invoice.posted_date ?? "";
    case "vendor":
      return invoice.vendor ?? invoice.vendorName ?? vendor.vendorName ?? "";
    case "invoiceNo":
      return invoice.invoiceNo ?? invoice.invoice_no ?? "";
    case "docNo":
      return invoice.docNo ?? invoice.doc_no ?? "";
    case "invDate":
      return invoice.invDate ?? invoice.inv_date ?? "";
    case "amount":
      return getAmountValue(invoice.amount) ?? normalizeText(invoice.amount);
    case "category":
      return invoice.category ?? "";
    case "risk":
      return invoice.risk ?? "";
    default:
      return "";
  }
}

export default function VendorTable({
  vendors = [],
  oneTimeFindings,
  selectedVendorId,
  onSelectVendor,
}) {
  const [activeDeviation, setActiveDeviation] = useState("currency");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ column: null, direction: "asc" });
  const itemsPerPage = 10;

  const oneTimeVendorRecords = useMemo(
    () => {
      const findingVendors = Array.isArray(oneTimeFindings?.vendors)
        ? oneTimeFindings.vendors
        : Array.isArray(oneTimeFindings)
          ? oneTimeFindings
          : [];

      return findingVendors.map((vendor) => {
        const sourceInvoices =
          Array.isArray(vendor.invoices) && vendor.invoices.length
            ? vendor.invoices
            : [vendor];
        const invoices = sourceInvoices.map((invoice) => ({
          ...invoice,
          type: invoice.type ?? "ONE_TIME_VENDOR_FINDINGS",
          vendorName: invoice.vendorName ?? vendor.vendorName,
        }));

        return {
          ...vendor,
          invoices,
          issues: vendor.issues ?? invoices.length,
        };
      });
    },
    [oneTimeFindings],
  );

  const filteredVendors = useMemo(() => {
    if (activeDeviation === "onetime") {
      if (oneTimeVendorRecords.length > 0) {
        return oneTimeVendorRecords;
      }

      return vendors.filter((vendor) =>
        (vendor.invoices ?? []).some((invoice) =>
          matchesDeviation(invoice, activeDeviation),
        ),
      );
    }

    return vendors.filter((vendor) =>
      (vendor.invoices ?? []).some((invoice) =>
        matchesDeviation(invoice, activeDeviation),
      ),
    );
  }, [vendors, activeDeviation, oneTimeVendorRecords]);

  const selectedVendor = useMemo(
    () =>
      filteredVendors.find(
        (vendor) => String(vendor.vendorId) === String(selectedVendorId),
      ) ??
      filteredVendors[0] ??
      null,
    [filteredVendors, selectedVendorId],
  );

  useEffect(() => {
    const selectionIsValid = filteredVendors.some(
      (vendor) => String(vendor.vendorId) === String(selectedVendorId),
    );
    const nextVendorId = selectionIsValid
      ? selectedVendorId
      : (filteredVendors[0]?.vendorId ?? null);

    if (String(nextVendorId) !== String(selectedVendorId)) {
      onSelectVendor(nextVendorId);
    }
  }, [filteredVendors, onSelectVendor, selectedVendorId]);

  const invoices = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = (selectedVendor?.invoices ?? []).filter(
      (invoice) =>
        !query || JSON.stringify(invoice).toLowerCase().includes(query),
    );

    if (!sort.column) {
      return filtered;
    }

    return filtered
      .map((invoice, index) => ({ invoice, index }))
      .sort((left, right) => {
        const leftValue = getInvoiceValue(left.invoice, selectedVendor, sort.column);
        const rightValue = getInvoiceValue(right.invoice, selectedVendor, sort.column);
        const comparison =
          typeof leftValue === "number" && typeof rightValue === "number"
            ? leftValue - rightValue
            : String(leftValue).localeCompare(String(rightValue), undefined, {
                numeric: true,
                sensitivity: "base",
              });

        return comparison === 0
          ? left.index - right.index
          : sort.direction === "asc"
            ? comparison
            : -comparison;
      })
      .map(({ invoice }) => invoice);
  }, [search, selectedVendor, sort]);

  const totalPages = Math.max(1, Math.ceil(invoices.length / itemsPerPage));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginatedInvoices = invoices.slice(
    (visiblePage - 1) * itemsPerPage,
    visiblePage * itemsPerPage,
  );

  const handleSort = (column) => {
    setSort((current) => ({
      column,
      direction:
        current.column === column && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <section className="col-span-12 overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-8">
      <nav
        className="flex gap-3 overflow-x-auto border-b border-slate-200 px-3"
        aria-label="Deviation category"
      >
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={activeDeviation === id}
            onClick={() => {
              setActiveDeviation(id);
              setSearch("");
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

      <div className="grid min-h-0 grid-cols-1 lg:grid-cols-[235px_minmax(0,1fr)]">
        <aside className="min-h-0 bg-slate-50 lg:border-r lg:border-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
            Exception Vendors
          </div>

          <div className="max-h-[300px] overflow-y-auto overflow-x-hidden lg:max-h-[600px]">
            {filteredVendors.map((vendor) => {
              const selected =
                String(vendor.vendorId) === String(selectedVendor?.vendorId);

              return (
                <button
                  key={vendor.vendorId}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    onSelectVendor(vendor.vendorId);
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  className={`w-full border-b border-slate-200 px-4 py-4 text-left transition-colors ${
                    selected
                      ? "border-t-2 border-t-[#A78BFA] bg-[#e9b7d929]"
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
            {filteredVendors.length === 0 && (
              <p className="px-4 py-6 text-sm text-slate-500">No Data Found</p>
            )}
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
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
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search invoices"
                aria-label="Search invoices"
                className="h-8 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="table-scrollbar max-h-[60vh] overflow-auto lg:max-h-[480px]">
            <table className="w-full min-w-[670px] bg-white">
              <thead className="sticky top-0 z-10 border-b bg-slate-100">
                <tr>
                  {columns.map(([column, title]) => (
                    <th
                      key={column}
                      aria-sort={
                        sort.column === column
                          ? sort.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-500"
                    >
                      <button
                        type="button"
                        onClick={() => handleSort(column)}
                        className="whitespace-nowrap"
                      >
                        {title}
                        {sort.column === column
                          ? sort.direction === "asc"
                            ? " ↑"
                            : " ↓"
                          : ""}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((invoice, index) => (
                  <tr
                    key={`${invoice.id ?? invoice.invoiceNo ?? invoice.invoice_no ?? "invoice"}-${index}`}
                    className="border-b border-slate-200 bg-[#e9b7d929] hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-3 py-2 text-[11px] text-slate-600">
                      {invoice.posted ?? invoice.posted_date ?? "-"}
                    </td>
                    <td
                      title={
                        invoice.vendor ??
                        invoice.vendorName ??
                        selectedVendor?.vendorName ??
                        "-"
                      }
                      className="max-w-36 truncate whitespace-nowrap px-3 py-2 text-[11px] font-semibold text-blue-600"
                    >
                      {invoice.vendor ??
                        invoice.vendorName ??
                        selectedVendor?.vendorName ??
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
                        {invoice.category ?? "-"}
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
                        {invoice.risk ?? "-"}
                      </span>
                    </td>
                  </tr>
                ))}
                {paginatedInvoices.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-3 py-8 text-center text-sm text-slate-500"
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="flex items-center justify-between border-t border-slate-200 p-3">
            <span className="text-[10px] text-slate-500">
              Showing {paginatedInvoices.length} of {invoices.length} invoices
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-slate-500 disabled:opacity-40"
              >
                <ChevronLeft size={13} />
              </button>
              <span className="grid h-8 min-w-8 place-items-center rounded bg-blue-600 px-2 text-xs font-semibold text-white">
                {visiblePage} / {totalPages}
              </span>
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
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
