"use client";
import React, { useState, useMemo, useEffect } from "react";

const statusClass = (status) => {
  switch (status?.toUpperCase()) {
    case "IDENTIFIED":
      return "bg-blue-100 text-blue-700";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const riskClass = (score = 0) => {
  if (score >= 90) {
    return "bg-red-100 text-red-700";
  }
  if (score >= 60) {
    return "bg-yellow-100 text-yellow-700";
  }
  return "bg-green-100 text-green-700";
};
const TABS = [
  "All Reviews",
  "High Risk",
  "Human Review Required",
  "Duplicate Risk",
  "OCR / Posting Mismatch",
  "Audit & Compliance",
  "SLA At Risk",
];
function FilterSelect({ label, children, ...props }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#475569] mb-2">{label}</p>
      <select
        {...props}
        className="w-full h-9 rounded-xl border border-[#D9E1EA] px-3 text-[13px] text-[#334155] bg-white"
      >
        {children}
      </select>
    </div>
  );
}
export const AiReviewTable = ({
  recoveryData = [],
  selectedRecovery,
  setSelectedRecovery,
}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [activeTab, setActiveTab] = useState("All Reviews");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [investigatorFilter, setInvestigatorFilter] = useState("All");
  const pageSize = 8;

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, typeFilter, sourceFilter, investigatorFilter]);
  const statusOptions = [
    "All",
    ...new Set(recoveryData.map((item) => item.status).filter(Boolean)),
  ];

  const typeOptions = [
    "All",
    ...new Set(recoveryData.map((item) => item.type).filter(Boolean)),
  ];

  const sourceOptions = [
    "All",
    ...new Set(recoveryData.map((item) => item.sourceSystem).filter(Boolean)),
  ];

  const investigatorOptions = [
    "All",
    ...new Set(recoveryData.map((item) => item.investigator).filter(Boolean)),
  ];

  const filteredData = useMemo(() => {
    return recoveryData.filter((item) => {
      const matchesTab =
        activeTab === "All Reviews" ||
        (activeTab === "High Risk" && (item.riskScore || 92) >= 90) ||
        (activeTab === "Duplicate Risk" &&
          item.type?.toLowerCase().includes("duplicate")) ||
        (activeTab === "Audit & Compliance" && item.status === "COMPLETED") ||
        (activeTab === "SLA At Risk" && item.slaDue);
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesType = typeFilter === "All" || item.type === typeFilter;

      const matchesSource =
        sourceFilter === "All" || item.sourceSystem === sourceFilter;

      const matchesInvestigator =
        investigatorFilter === "All" ||
        item.investigator === investigatorFilter;

      return (
        matchesTab &&
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesSource &&
        matchesInvestigator
      );
    });
  }, [
    recoveryData,
    activeTab,
    search,
    statusFilter,
    typeFilter,
    sourceFilter,
    investigatorFilter,
  ]);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  return (
    <>
      {/* Tabs */}
      <div className="px-5 pt-4 border-b border-[#E2E8F0] overflow-x-auto">
        <div className="flex gap-5 whitespace-nowrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`pb-3 text-[12px] font-medium transition-all ${
                activeTab === tab
                  ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                  : "text-[#475569]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Filters */}
      <div className="px-5 py-4 border-b border-[#E2E8F0] bg-white">
        <div className="grid grid-cols-6 gap-3">
          <FilterSelect label="Risk Level">
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </FilterSelect>

          <FilterSelect
            label="Exception Type"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Review Reason">
            <option>All</option>
            <option>Duplicate Risk</option>
            <option>Bank Mismatch</option>
            <option>OCR Confidence</option>
          </FilterSelect>

          <FilterSelect label="Supplier">
            <option>All</option>
          </FilterSelect>

          <div>
            <p className="text-[11px] font-semibold text-[#475569] mb-2">
              Amount Range
            </p>

            <div className="flex gap-2">
              <input
                placeholder="Min"
                className="w-full h-9 rounded-md border border-[#D9E1EA] px-3 text-[12px]"
              />
              <input
                placeholder="Max"
                className="w-full h-9 rounded-md border border-[#D9E1EA] px-3 text-[12px]"
              />
            </div>
          </div>
          <div />

          <FilterSelect
            label="Assigned Reviewer"
            value={investigatorFilter}
            onChange={(e) => {
              setInvestigatorFilter(e.target.value);
              setPage(1);
            }}
          >
            {investigatorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>

          {/* <FilterSelect
            label="Source System"
            value={sourceFilter}
            onChange={(e) => {
              setSourceFilter(e.target.value);
              setPage(1);
            }}
          >
            {sourceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect> */}

          <FilterSelect label="AI Confidence">
            <option>All</option>
            <option>90% +</option>
            <option>80% +</option>
            <option>70% +</option>
          </FilterSelect>

          {/* <FilterSelect label="Business Rule">
            <option>All</option>
          </FilterSelect> */}

          <div className="flex items-end gap-3">
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setTypeFilter("All");
                setSourceFilter("All");
                setInvestigatorFilter("All");
                setPage(1);
              }}
              className="h-9 px-4 text-[#2563EB] text-sm font-medium"
            >
              Reset
            </button>
            {/* 
            <button className="h-9 px-6 rounded-md bg-[#2563EB] text-white font-semibold">
              Search
            </button> */}
          </div>
        </div>
      </div>

      <div className="overflow-auto flex-1 min-h-[600px]">
        <table className="min-w-[1500px] w-full">
          <thead>
            <tr className="h-12 border-b border-slate-200 bg-slate-50">
              <th className="w-12 px-2" />

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Invoice ID
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Supplier
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Invoice Amount
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Exception Type
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                AI Risk Score
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                AI Confidence
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Human Review Trigger
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                SLA
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Assigned To
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Status
              </th>

              <th className="px-2 text-left text-[10px] font-bold uppercase text-slate-500">
                Next Action
              </th>

              {/* <th className="w-8" /> */}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, index) => {
              const riskScore = row.riskScore || 92;
              const confidence = row.confidence || "96%";

              return (
                <tr
                  key={row.recoveryId}
                  onClick={() => setSelectedRecovery(row)}
                  className={`h-16 border-b border-slate-200 cursor-pointer hover:bg-slate-50 ${
                    selectedRecovery?.recoveryId === row.recoveryId
                      ? "bg-blue-50"
                      : ""
                  }`}
                >
                  <td className="px-4">
                    <input
                      type="checkbox"
                      checked={selectedRecovery?.recoveryId === row.recoveryId}
                      onChange={() => setSelectedRecovery(row)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>

                  <td className="px-2">
                    <span className="font-semibold text-blue-600 text-sm">
                      {row.recoveryId}
                    </span>
                  </td>

                  <td className="px-2 text-sm text-slate-700">{row.vendor}</td>

                  <td className="px-2 font-semibold text-sm">{row.amount}</td>

                  <td className="px-2">
                    <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                      {row.type}
                    </span>
                  </td>

                  <td className="px-2">
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-bold ${riskClass(
                        riskScore,
                      )}`}
                    >
                      {riskScore} HIGH
                    </span>
                  </td>

                  <td className="px-2 text-sm font-semibold">{confidence}</td>

                  <td className="px-2 text-xs text-slate-600">
                    Amount {">"} $100K
                    <br />
                    Duplicate Risk {">"} 85%
                  </td>

                  <td className="px-2">
                    <span className="px-2 text-sm text-orange-500">
                      {row.slaDue}
                    </span>
                  </td>

                  <td className="px-2 text-sm text-slate-700">
                    {row.investigator}
                  </td>

                  <td className="px-2">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-semibold ${statusClass(
                        row.status,
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewData(row);
                        setIsReviewOpen(true);
                      }}
                      className="h-8 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
        <div className="text-xs text-slate-500">
          Showing {filteredData.length === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, filteredData.length)} of{" "}
          {filteredData.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="h-8 w-8 rounded border"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded text-xs ${
                page === n ? "bg-blue-600 text-white" : "border"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="h-8 w-8 rounded border"
          >
            ›
          </button>
        </div>
      </div>
      {isReviewOpen && reviewData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-[700px] rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Review Details</h2>

              <button
                onClick={() => setIsReviewOpen(false)}
                className="text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-500">Invoice ID</div>
                <div>{reviewData.recoveryId}</div>
              </div>

              <div>
                <div className="text-slate-500">Supplier</div>
                <div>{reviewData.vendor}</div>
              </div>

              <div>
                <div className="text-slate-500">Amount</div>
                <div>{reviewData.amount}</div>
              </div>

              <div>
                <div className="text-slate-500">Exception Type</div>
                <div>{reviewData.type}</div>
              </div>

              <div>
                <div className="text-slate-500">Assigned To</div>
                <div>{reviewData.investigator}</div>
              </div>

              <div>
                <div className="text-slate-500">Status</div>
                <div>{reviewData.status}</div>
              </div>

              <div>
                <div className="text-slate-500">SLA</div>
                <div>{reviewData.slaDue}</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="rounded-md bg-blue-600 px-4 py-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiReviewTable;
