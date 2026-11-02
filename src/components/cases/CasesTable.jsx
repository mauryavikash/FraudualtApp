"use client";

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Download, Search } from "lucide-react";
import { LoadingState } from "@/components/common/LoadingState";

export const CASE_TABS = [
  "All Cases",
  "Duplicate Cases",
  "Anomaly Cases",
  "Escalated Cases",
  "My Assignments",
  "Watchlist",
];

const columns = [
  { key: "pair_id", label: "PAIR ID" },
  { key: "case_type", label: "CASE TYPE" },
  { key: "duplicate_type", label: "DUPLICATE TYPE" },
  { key: "priority", label: "PRIORITY" },
  { key: "risk_level", label: "STATUS" },
  { key: "vendor", label: "VENDOR" },
  { key: "amount", label: "AMOUNT (USD)" },
  { key: "detectedOn", label: "DETECTED ON" },
  { key: "invoice_date", label: "INVOICE DATE" },
  { key: "invoice_id", label: "INVOICE ID" },
  { key: "invoice_number", label: "INVOICE NUMBER" },
];

const initialFilters = {
  status: "All",
  caseType: "All",
  duplicateType: "All",
  priority: "All",
  investigator: "All",
  vendor: "All",
};

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[11px] font-semibold text-[#475569]">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="h-9 w-full rounded-xl border border-[#D9E1EA] px-3 text-[13px] text-[#334155]"
      >
        <option value="All">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function getDuplicateType(row) {
  return row.duplicateType ?? row.duplicate_type ?? "";
}

function getColumnValue(row, key) {
  switch (key) {
    case "duplicate_type":
      return getDuplicateType(row);
    case "amount":
      return row.invoice_1?.amount ?? "";
    case "invoice_date":
      return row.invoice_1?.invoice_date ?? "";
    case "invoice_id":
      return row.invoice_1?.invoice_id ?? "";
    case "invoice_number":
      return row.invoice_1?.invoice_number ?? "";
    default:
      return row[key] ?? "";
  }
}

function statusClass(status) {
  switch (status) {
    case "In Progress":
      return "bg-[#DBEAFE] text-[#2563EB]";
    case "Pending Review":
      return "bg-[#FDE7C7] text-[#F59E0B]";
    case "Escalated":
      return "bg-[#FEE2E2] text-[#EF4444]";
    case "Open":
      return "bg-[#D1FAE5] text-[#10B981]";
    default:
      return "";
  }
}

function getPaginationItems(page, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "ellipsis-start",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-start",
    page - 1,
    page,
    page + 1,
    "ellipsis-end",
    totalPages,
  ];
}

export default function CasesTable({
  cases = [],
  activeTab = CASE_TABS[0],
  onTabChange,
  selectedCaseId,
  onSelectCase,
  loading = false,
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const pageSize = 10;

  const options = useMemo(
    () => ({
      status: [...new Set(cases.map((row) => row.case_status).filter(Boolean))],
      caseType: [...new Set(cases.map((row) => row.case_type).filter(Boolean))],
      duplicateType: [
        ...new Set(cases.map(getDuplicateType).filter(Boolean)),
      ],
      priority: [...new Set(cases.map((row) => row.priority).filter(Boolean))],
      investigator: [
        ...new Set(cases.map((row) => row.investigator ?? "Unassigned")),
      ],
      vendor: [...new Set(cases.map((row) => row.vendor || "Unassigned"))],
    }),
    [cases],
  );

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cases.filter((row) => {
      const investigator = row.investigator ?? "Unassigned";
      const vendor = row.vendor || "Unassigned";
      const duplicateType = getDuplicateType(row);
      const caseType = (row.case_type || "").toUpperCase();
      const caseStatus = (row.case_status || "").toUpperCase();
      const matchesSearch =
        !query || JSON.stringify(row).toLowerCase().includes(query);
      const matchesStatus =
        filters.status === "All" || row.case_status === filters.status;
      const matchesType =
        filters.caseType === "All" ||
        caseType === filters.caseType.toUpperCase();
      const matchesDuplicateType =
        filters.duplicateType === "All" ||
        duplicateType.toLowerCase() === filters.duplicateType.toLowerCase();
      const matchesPriority =
        filters.priority === "All" || row.priority === filters.priority;
      const matchesInvestigator =
        filters.investigator === "All" ||
        investigator === filters.investigator;
      const matchesVendor =
        filters.vendor === "All" || vendor === filters.vendor;

      let matchesTab = true;
      if (activeTab === "Duplicate Cases") {
        matchesTab = caseType.includes("DUPLICATE");
      } else if (activeTab === "Anomaly Cases") {
        matchesTab = caseType.includes("ANOMALY");
      } else if (activeTab === "Escalated Cases") {
        matchesTab = caseStatus.includes("ESCALATED");
      } else if (activeTab === "My Assignments") {
        matchesTab = Boolean(row.investigator);
      } else if (activeTab === "Watchlist") {
        matchesTab = row.watchlist === true;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesDuplicateType &&
        matchesPriority &&
        matchesInvestigator &&
        matchesVendor &&
        matchesTab
      );
    });
  }, [activeTab, cases, filters, search]);

  const sortedData = useMemo(() => {
    if (!sort.key) {
      return filteredData;
    }

    return filteredData
      .map((row, index) => ({ row, index }))
      .sort((left, right) => {
        const leftValue = getColumnValue(left.row, sort.key);
        const rightValue = getColumnValue(right.row, sort.key);
        const comparison = String(leftValue).localeCompare(
          String(rightValue),
          undefined,
          { numeric: true, sensitivity: "base" },
        );

        if (comparison === 0) {
          return left.index - right.index;
        }
        return sort.direction === "asc" ? comparison : -comparison;
      })
      .map(({ row }) => row);
  }, [filteredData, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const visiblePage = Math.min(page, totalPages);
  const paginationItems = getPaginationItems(visiblePage, totalPages);
  const paginatedData = sortedData.slice(
    (visiblePage - 1) * pageSize,
    visiblePage * pageSize,
  );

  const updateFilter = (key) => (event) => {
    setFilters((current) => ({ ...current, [key]: event.target.value }));
    setPage(1);
  };

  const handleTabChange = (tab) => {
    onTabChange?.(tab);
    setPage(1);
  };

  const handleExportExcel = () => {
    const exportData = sortedData.map((row) => ({
      "Pair ID": row.pair_id,
      "Case Type": row.case_type,
      "Duplicate Type": getDuplicateType(row) || "-",
      Priority: row.priority,
      Status: row.risk_level,
      Vendor: row.vendor,
      "Amount (USD)": row.invoice_1?.amount,
      "Detected On": row.detectedOn,
      "Invoice Date": row.invoice_1?.invoice_date,
      "Invoice ID": row.invoice_1?.invoice_id,
      "Invoice Number": row.invoice_1?.invoice_number,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Cases");
    XLSX.writeFile(
      workbook,
      `Cases_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const handleSort = (key) => {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  if (loading) {
    return <LoadingState label="Loading cases..." />;
  }

  return (
    <div className="flex w-full">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-[#D9E1EA] bg-white shadow-[0px_2px_8px_rgba(15,23,42,0.05)]">
        <div className="border-b border-[#E2E8F0] px-5 pt-4">
          <div className="flex gap-5 overflow-x-auto">
            {CASE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                onClick={() => handleTabChange(tab)}
                className={`shrink-0 pb-3 text-[13px] font-medium transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                    : "text-[#475569]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-[#E2E8F0] px-3 py-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
            <FilterSelect
              label="Status"
              value={filters.status}
              options={options.status}
              onChange={updateFilter("status")}
            />
            <FilterSelect
              label="Case Type"
              value={filters.caseType}
              options={options.caseType}
              onChange={updateFilter("caseType")}
            />
            <FilterSelect
              label="Duplicate Type"
              value={filters.duplicateType}
              options={options.duplicateType}
              onChange={updateFilter("duplicateType")}
            />
            <FilterSelect
              label="Priority"
              value={filters.priority}
              options={options.priority}
              onChange={updateFilter("priority")}
            />
            <FilterSelect
              label="Investigator"
              value={filters.investigator}
              options={options.investigator}
              onChange={updateFilter("investigator")}
            />
            <FilterSelect
              label="Vendor"
              value={filters.vendor}
              options={options.vendor}
              onChange={updateFilter("vendor")}
            />
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleExportExcel}
                className="flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-3 text-[12px] font-medium text-white hover:bg-[#1D4ED8]"
              >
                <Download size={14} />
                Excel
              </button>
            </div>
          </div>
          <label className="relative mt-3 block sm:ml-auto sm:max-w-xs">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search cases"
              aria-label="Search cases"
              className="h-9 w-full rounded-xl border border-[#D9E1EA] pl-9 pr-3 text-[13px] text-[#334155]"
            />
          </label>
        </div>

        <div className="table-scrollbar min-h-[320px] flex-1 overflow-auto lg:min-h-[520px]">
          <table className="w-full min-w-[1550px]">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="h-[46px] border-b border-[#E2E8F0]">
                <th className="w-12 px-5" aria-label="Select case" />
                {columns.map(({ key, label }) => (
                  <th
                    key={key}
                    className="text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]"
                    aria-sort={
                      sort.key === key
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(key)}
                      className="whitespace-nowrap"
                    >
                      {label}
                      {sort.key === key
                        ? sort.direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </button>
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="px-5 py-10 text-center text-[13px] text-[#94A3B8]"
                  >
                    No matching cases found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr
                    key={row.pair_id}
                    onClick={() => onSelectCase?.(row)}
                    aria-selected={selectedCaseId === row.pair_id}
                    className={`h-[58px] cursor-pointer border-b border-[#E2E8F0] transition-colors hover:bg-[#F8FAFC] ${
                      selectedCaseId === row.pair_id ? "bg-[#F8FAFC]" : ""
                    }`}
                  >
                    <td className="px-5">
                      <input
                        type="checkbox"
                        checked={selectedCaseId === row.pair_id}
                        onChange={() => onSelectCase?.(row)}
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`Select case ${row.pair_id}`}
                      />
                    </td>
                    <td className="text-[12px] font-semibold text-[#2563EB]">
                      {row.pair_id}
                    </td>
                    <td>
                      <span
                        className={`rounded-md px-2.5 py-[2px] text-[10px] font-semibold ${
                          row.case_type === "Duplicate"
                            ? "bg-[#F3E8FF] text-[#8B5CF6]"
                            : "bg-[#FDE7C7] text-[#F59E0B]"
                        }`}
                      >
                        {row.case_type}
                      </span>
                    </td>
                    <td className="text-[12px] text-[#334155]">
                      {getDuplicateType(row) || "-"}
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-[12px] text-[#334155]">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            row.priority === "High"
                              ? "bg-red-500"
                              : row.priority === "Medium"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                        />
                        {row.priority}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`rounded-md px-2.5 py-[2px] text-[10px] font-semibold ${statusClass(row.risk_level)}`}
                      >
                        {row.risk_level}
                      </span>
                    </td>
                    <td className="text-[12px] text-[#334155]">{row.vendor}</td>
                    <td className="text-[12px] font-semibold text-[#0F172A]">
                      {row.invoice_1?.amount}
                    </td>
                    <td className="text-[12px] text-[#64748B]">
                      {row.detectedOn}
                    </td>
                    <td className="text-[12px] text-[#334155]">
                      {row.invoice_1?.invoice_date}
                    </td>
                    <td className="text-[12px] text-[#64748B]">
                      {row.invoice_1?.invoice_id}
                    </td>
                    <td className="text-[12px] text-[#64748B]">
                      {row.invoice_1?.invoice_number}
                    </td>
                    <td />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#E2E8F0] px-5 py-3">
          <div className="text-[12px] text-[#64748B]">
            Showing {sortedData.length ? (visiblePage - 1) * pageSize + 1 : 0} to{" "}
            {Math.min(visiblePage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} cases
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              disabled={visiblePage === 1}
              aria-label="Previous page"
              className="h-7 w-7 rounded-lg border border-[#D9E1EA] disabled:opacity-40"
            >
              ‹
            </button>
            {paginationItems.map((item) =>
              typeof item === "number" ? (
                <button
                  type="button"
                  key={item}
                  onClick={() => setPage(item)}
                  aria-current={visiblePage === item ? "page" : undefined}
                  className={`h-7 w-7 rounded-lg text-[12px] font-medium ${
                    visiblePage === item
                      ? "bg-[#2563EB] text-white"
                      : "border border-[#D9E1EA] text-[#475569]"
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={item}
                  className="w-5 text-center text-[#64748B]"
                  aria-hidden="true"
                >
                  ...
                </span>
              ),
            )}
            <button
              type="button"
              onClick={() =>
                setPage((currentPage) => Math.min(totalPages, currentPage + 1))
              }
              disabled={visiblePage === totalPages}
              aria-label="Next page"
              className="h-7 w-7 rounded-lg border border-[#D9E1EA] disabled:opacity-40"
            >
              ›
            </button>
            <span className="hidden h-7 items-center rounded-lg border border-[#D9E1EA] px-2 text-[12px] sm:flex">
              10 / page
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
