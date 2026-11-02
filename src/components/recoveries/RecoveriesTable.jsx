"use client";

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Download, Search } from "lucide-react";

const TABS = ["All Recoveries", "IDENTIFIED", "COMPLETED", "FAILED"];
const PAGE_SIZE = 8;

const COLUMNS = [
  ["recoveryId", "RECOVERY ID"],
  ["type", "TYPE"],
  ["status", "STATUS"],
  ["vendor", "VENDOR"],
  ["caseId", "RELATED CASE ID"],
  ["amountValue", "AMOUNT (USD)"],
  ["recoveryDate", "RECOVERY DATE"],
  ["slaDue", "SLA DUE"],
  ["investigator", "INVESTIGATOR"],
];

const FILTERS = [
  ["status", "Status"],
  ["type", "Recovery Type"],
  ["sourceSystem", "Source"],
  ["vendor", "Vendor"],
  ["investigator", "Investigator"],
];

const INITIAL_FILTERS = {
  status: "All",
  type: "All",
  sourceSystem: "All",
  vendor: "All",
  investigator: "All",
};

function statusClass(status) {
  switch (status) {
    case "IDENTIFIED":
      return "bg-[#DBEAFE] text-[#2563EB]";
    case "COMPLETED":
      return "bg-[#D1FAE5] text-[#10B981]";
    case "FAILED":
      return "bg-[#FEE2E2] text-[#EF4444]";
    default:
      return "bg-[#F1F5F9] text-[#64748B]";
  }
}

export default function RecoveriesTable({
  recoveries = [],
  selectedRecoveryId,
  onSelectRecovery,
}) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ column: null, direction: "asc" });

  const filterOptions = useMemo(
    () => ({
      status: [...new Set(recoveries.map((row) => row.status).filter(Boolean))],
      type: [...new Set(recoveries.map((row) => row.type).filter(Boolean))],
      sourceSystem: [
        ...new Set(recoveries.map((row) => row.sourceSystem).filter(Boolean)),
      ],
      vendor: [...new Set(recoveries.map((row) => row.vendor).filter(Boolean))],
      investigator: [
        ...new Set(recoveries.map((row) => row.investigator).filter(Boolean)),
      ],
    }),
    [recoveries],
  );

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    return recoveries.filter((row) => {
      const matchesSearch =
        !query || Object.values(row).join(" ").toLowerCase().includes(query);
      const matchesTab =
        activeTab === "All Recoveries" || row.status === activeTab;
      const matchesStatus =
        filters.status === "All" || row.status === filters.status;
      const matchesType = filters.type === "All" || row.type === filters.type;
      const matchesSource =
        filters.sourceSystem === "All" ||
        row.sourceSystem === filters.sourceSystem;
      const matchesVendor =
        filters.vendor === "All" || row.vendor === filters.vendor;
      const matchesInvestigator =
        filters.investigator === "All" ||
        row.investigator === filters.investigator;

      return (
        matchesSearch &&
        matchesTab &&
        matchesStatus &&
        matchesType &&
        matchesSource &&
        matchesVendor &&
        matchesInvestigator
      );
    });
  }, [activeTab, filters, recoveries, search]);

  const sortedData = useMemo(() => {
    if (!sort.column) return filteredData;

    return filteredData
      .map((row, index) => ({ row, index }))
      .sort((left, right) => {
        const leftValue = left.row[sort.column] ?? "";
        const rightValue = right.row[sort.column] ?? "";
        const comparison =
          sort.column === "amountValue"
            ? Number(leftValue) - Number(rightValue)
            : String(leftValue).localeCompare(String(rightValue), undefined, {
                numeric: true,
                sensitivity: "base",
              });

        if (comparison === 0) return left.index - right.index;
        return sort.direction === "asc" ? comparison : -comparison;
      })
      .map(({ row }) => row);
  }, [filteredData, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageData = sortedData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const allPageSelected =
    pageData.length > 0 &&
    pageData.every((row) => row.recoveryId === selectedRecoveryId);

  const changeFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const handleExport = () => {
    const exportData = sortedData.map((row) => ({
      "Recovery ID": row.recoveryId,
      Type: row.type,
      Status: row.status,
      Vendor: row.vendor,
      "Related Case ID": row.caseId,
      "Amount (USD)": row.amount,
      "Recovery Date": row.recoveryDate,
      "SLA Due": row.slaDue,
      Investigator: row.investigator,
      Source: row.sourceSystem,
      "Recovery Method": row.recoveryMethod,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Recoveries");
    XLSX.writeFile(
      workbook,
      `Recoveries_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#D9E1EA] bg-white shadow-[0px_2px_8px_rgba(15,23,42,0.05)]">
      <nav
        className="overflow-x-auto border-b border-[#E2E8F0] px-5 pt-4"
        aria-label="Recovery status"
      >
        <div className="flex gap-5 whitespace-nowrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-pressed={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`pb-3 text-[13px] font-medium transition-all ${
                activeTab === tab
                  ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                  : "text-[#475569]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-b border-[#E2E8F0] px-5 py-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {FILTERS.map(([key, label]) => (
            <label key={key} className="block min-w-0">
              <span className="mb-2 block text-[11px] font-semibold text-[#475569]">
                {label}
              </span>
              <select
                value={filters[key]}
                onChange={(event) => changeFilter(key, event.target.value)}
                className="h-9 w-full rounded-xl border border-[#D9E1EA] bg-white px-3 text-[13px] text-[#334155]"
              >
                <option value="All">All</option>
                {filterOptions[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <label className="relative block w-full sm:max-w-xs">
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
              placeholder="Search recoveries"
              aria-label="Search recoveries"
              className="h-9 w-full rounded-xl border border-[#D9E1EA] pl-9 pr-3 text-[13px] text-[#334155]"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setFilters(INITIAL_FILTERS);
                setSearch("");
                setPage(1);
              }}
              className="text-[12px] font-medium text-[#2563EB] hover:text-[#1D4ED8]"
            >
              Reset filters
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={sortedData.length === 0}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-3 text-[12px] font-medium text-white hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={14} />
              Excel
            </button>
          </div>
        </div>
      </div>

      <div className="table-scrollbar min-h-[320px] flex-1 overflow-auto lg:min-h-[550px]">
        <table className="w-full min-w-[1100px]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="h-[42px] border-b border-[#E2E8F0]">
              <th className="w-12 px-5">
                <input
                  type="checkbox"
                  aria-label="Select all recoveries on this page"
                  checked={allPageSelected}
                  onChange={() => {
                    if (pageData.length > 0) {
                      onSelectRecovery?.(allPageSelected ? null : pageData[0]);
                    }
                  }}
                />
              </th>
              {COLUMNS.map(([column, label]) => (
                <th
                  key={column}
                  aria-sort={
                    sort.column === column
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className="whitespace-nowrap px-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSort((current) => ({
                        column,
                        direction:
                          current.column === column &&
                          current.direction === "asc"
                            ? "desc"
                            : "asc",
                      }))
                    }
                    className="whitespace-nowrap"
                  >
                    {label}
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
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length + 1}
                  className="px-5 py-10 text-center text-[13px] text-[#94A3B8]"
                >
                  No recoveries found.
                </td>
              </tr>
            ) : (
              pageData.map((row) => {
                const isSelected = selectedRecoveryId === row.recoveryId;
                return (
                  <tr
                    key={row.recoveryId}
                    onClick={() => onSelectRecovery?.(row)}
                    aria-selected={isSelected}
                    className={`h-[52px] cursor-pointer border-b border-[#E2E8F0] transition-colors hover:bg-[#F8FAFC] ${
                      isSelected ? "bg-[#F8FAFC]" : ""
                    }`}
                  >
                    <td className="px-5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRecovery?.(row)}
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`Select recovery ${row.recoveryId}`}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] font-semibold text-[#2563EB]">
                      {row.recoveryId}
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] text-[#334155]">
                      {row.type}
                    </td>
                    <td className="px-3">
                      <span
                        className={`whitespace-nowrap rounded-md px-2.5 py-[2px] text-[10px] font-semibold ${statusClass(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] text-[#334155]">
                      {row.vendor}
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] font-medium text-[#2563EB]">
                      {row.caseId}
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] font-semibold text-[#0F172A]">
                      {row.amount}
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] text-[#64748B]">
                      {row.recoveryDate}
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] text-[#64748B]">
                      {row.slaDue}
                    </td>
                    <td className="whitespace-nowrap px-3 text-[12px] text-[#64748B]">
                      {row.investigator}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E2E8F0] px-5 py-3">
        <div className="text-[12px] text-[#64748B]">
          Showing {sortedData.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0} to{" "}
          {Math.min(currentPage * PAGE_SIZE, sortedData.length)} of{" "}
          {sortedData.length.toLocaleString()} recoveries
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="h-7 w-7 rounded-lg border border-[#D9E1EA] text-[#475569] disabled:opacity-40"
          >
            ‹
          </button>
          <span className="px-2 text-[12px] text-[#475569]">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="h-7 w-7 rounded-lg border border-[#D9E1EA] text-[#475569] disabled:opacity-40"
          >
            ›
          </button>
          <span className="hidden h-7 items-center rounded-lg border border-[#D9E1EA] px-2 text-[12px] sm:flex">
            {PAGE_SIZE} / page
          </span>
        </div>
      </div>
    </div>
  );
}
