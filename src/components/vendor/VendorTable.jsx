"use client";
import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";

const severityClass = (severity) => {
  switch (severity) {
    case "Critical":
      return "bg-[#FEE2E2] text-[#EF4444]";
    case "High":
      return "bg-[#FEF3C7] text-[#F59E0B]";
    case "Medium":
      return "bg-[#DBEAFE] text-[#2563EB]";
    case "Low":
      return "bg-[#D1FAE5] text-[#10B981]";
    default:
      return "bg-[#F1F5F9] text-[#64748B]";
  }
};

const severityDot = (severity) => {
  switch (severity) {
    case "Critical":
      return "bg-[#EF4444]";
    case "High":
      return "bg-[#F59E0B]";
    case "Medium":
      return "bg-[#2563EB]";
    case "Low":
      return "bg-[#10B981]";
    default:
      return "bg-[#94A3B8]";
  }
};

function FilterSelect({ label, children, ...props }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#475569] mb-1.5">
        {label}
      </p>

      <select
        {...props}
        className="w-full h-9 rounded-xl border border-[#D9E1EA] px-3 text-[12px] text-[#334155] bg-white"
      >
        {children}
      </select>
    </div>
  );
}

export const VendorTable = ({ data, totalAlerts }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [severityFilter, setSeverityFilter] = useState("All Severities");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const pageSize = 8;

  const alertData = useMemo(() => Array.isArray(data)
    ? data.map((item) => ({
        id: item.alertId,
        dateTime: new Date(item.timestamp).toLocaleString(),
        severity: item.severity,
        title: item.title,
        subtitle: item.description,
        type: item.alertType,
        source: item.source,
        assignedTo: item.assignedTo ?? "Unassigned",
      }))
    : [], [data]);

  const filteredData = useMemo(() => {
    return alertData.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSeverity =
        severityFilter === "All Severities" || item.severity === severityFilter;

      const matchesType = typeFilter === "All Types" || item.type === typeFilter;

      return matchesSearch && matchesSeverity && matchesType;
    });
  }, [search, severityFilter, typeFilter, alertData]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  return (
    <div className="col-span-12 xl:col-span-8 flex">
      <div
        className="
          w-full
          h-full
          flex
          flex-col
          bg-white
          rounded-[16px]
          border
          border-[#D9E1EA]
          shadow-[0px_2px_8px_rgba(15,23,42,0.05)]
          overflow-hidden
        "
      >
        {/* Filters */}
        <div className="px-4 py-4 border-b border-[#E2E8F0]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <FilterSelect label="Date Range">
              <option>May 14 – May 20, 2025</option>
            </FilterSelect>

            <FilterSelect
              label="Severity"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option>All Severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </FilterSelect>

            <FilterSelect
              label="Alert Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Types</option>
              <option>Duplicate Detection</option>
              <option>Anomaly</option>
              <option>Audit Alert</option>
              <option>Rules Activity</option>
              <option>Data Change</option>
              <option>System</option>
            </FilterSelect>

            <FilterSelect
              label="Source"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option>All Sources</option>
              <option>Resolution Studio</option>
              <option>Audit Log</option>
              <option>Vendors</option>
              <option>Global</option>
            </FilterSelect>

            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Unread</option>
              <option>Read</option>
            </FilterSelect>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search alerts..."
                className="w-full h-9 rounded-xl border border-[#D9E1EA] bg-white pl-9 pr-3 text-[12px] text-[#334155] placeholder:text-[#94A3B8] focus:outline-none"
              />
            </div>

            <button className="h-9 px-4 rounded-xl border border-[#D9E1EA] bg-white text-[12px] font-medium text-[#475569] flex items-center gap-2 shrink-0">
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-1 min-h-[420px]">
          <table className="w-full">
            <thead>
              <tr className="h-[42px] border-b border-[#E2E8F0]">
                {[
                  "DATE / TIME",
                  "SEVERITY",
                  "ALERT TITLE",
                  "ALERT TYPE",
                  "SOURCE",
                  "ASSIGNED TO",
                ].map((item) => (
                  <th
                    key={item}
                    className="
                      px-4
                      text-left
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[#64748B]
                    "
                  >
                    {item}
                  </th>
                ))}

                <th className="w-10" />
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row) => (
                <tr
                  key={row.id}
                  className="h-[44px] border-b border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                >
                  <td className="px-4 text-[12px] text-[#64748B] whitespace-nowrap">
                    {row.dateTime}
                  </td>

                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${severityDot(
                          row.severity
                        )}`}
                      />
                      <span
                        className={`px-2 py-[2px] rounded-md text-[10px] font-semibold ${severityClass(
                          row.severity
                        )}`}
                      >
                        {row.severity}
                      </span>
                    </div>
                  </td>

                  <td className="px-4">
                    <div className="text-[12px] font-medium text-[#0F172A]">
                      {row.title}
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      {row.subtitle}
                    </div>
                  </td>

                  <td className="px-4 text-[12px] text-[#334155] whitespace-nowrap">
                    {row.type}
                  </td>

                  <td className="px-4 text-[12px] text-[#334155] whitespace-nowrap">
                    {row.source}
                  </td>

                  <td className="px-4 text-[12px] text-[#334155] whitespace-nowrap">
                    {row.assignedTo}
                  </td>

                  <td className="pr-4">
                    <MoreVertical size={15} className="text-[#94A3B8]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
          <div className="text-[12px] text-[#64748B]">
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filteredData.length)} of {totalAlerts ?? filteredData.length} alerts
          </div>

          <div className="flex items-center gap-2">
            <select className="h-7 rounded-lg border border-[#D9E1EA] px-2 text-[12px]">
              <option>10 rows per page</option>
            </select>

            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg border border-[#D9E1EA] text-[#475569]"
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`w-7 h-7 rounded-lg text-[12px] font-medium ${
                  page === index + 1
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#D9E1EA] text-[#475569]"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-lg border border-[#D9E1EA] text-[#475569]"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};