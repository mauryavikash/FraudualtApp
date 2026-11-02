"use client";
import React, { useState, useMemo } from "react";

const statusClass = (status) => {
  switch (status?.toUpperCase()) {
    case "IDENTIFIED":
    case "PENDING":
    case "PENDING REVIEW":
    case "REQUIRES REVIEW":
      return "bg-blue-100 text-blue-700";
    case "COMPLETED":
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "FAILED":
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const riskClass = (score, level) => {
  const numericScore = Number(score);
  const normalizedLevel = String(level ?? "").toUpperCase();
  if (numericScore >= 90 || normalizedLevel === "HIGH") {
    return "bg-red-100 text-red-700";
  }
  if (
    (Number.isFinite(numericScore) && numericScore >= 60) ||
    normalizedLevel === "MEDIUM"
  ) {
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

const displayValue = (value) => {
  if (value === undefined || value === null || value === "") return "-";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
};

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
  reviews = [],
  selectedReview,
  onSelectReview,
}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [activeTab, setActiveTab] = useState("All Reviews");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [supplierFilter, setSupplierFilter] = useState("All");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [confidenceFilter, setConfidenceFilter] = useState("All");
  const pageSize = 8;

  const statusOptions = [
    "All",
    ...new Set(reviews.map((item) => item.status).filter(Boolean)),
  ];

  const typeOptions = [
    "All",
    ...new Set(reviews.map((item) => item.exceptionType).filter(Boolean)),
  ];

  const assignedOptions = [
    "All",
    ...new Set(reviews.map((item) => item.assignedTo).filter(Boolean)),
  ];
  const supplierOptions = [
    "All",
    ...new Set(reviews.map((item) => item.supplier).filter(Boolean)),
  ];
  const reasonOptions = [
    "All",
    ...new Set(reviews.map((item) => item.reviewReason).filter(Boolean)),
  ];

  const filteredData = useMemo(() => {
    return reviews.filter((item) => {
      const exceptionType = String(item.exceptionType).toLowerCase();
      const isHumanReviewRequired =
        item.humanReviewRequired === true ||
        item.human_review_required === true ||
        Boolean(item.humanReviewTrigger && item.humanReviewTrigger !== "-");
      const confidenceValue = Number(
        String(item.confidence ?? "").replace("%", ""),
      );
      const riskLevel = String(item.riskLevel ?? "").toUpperCase();
      const isHighRisk = item.riskScore >= 90 || riskLevel === "HIGH";
      const isMediumRisk =
        (item.riskScore >= 60 && item.riskScore < 90) || riskLevel === "MEDIUM";
      const isLowRisk =
        (item.riskScore !== null && item.riskScore < 60) || riskLevel === "LOW";
      const matchesTab =
        activeTab === "All Reviews" ||
        (activeTab === "High Risk" && isHighRisk) ||
        (activeTab === "Human Review Required" && isHumanReviewRequired) ||
        (activeTab === "Duplicate Risk" &&
          exceptionType.includes("duplicate")) ||
        (activeTab === "OCR / Posting Mismatch" &&
          /ocr|posting|mismatch/.test(exceptionType)) ||
        (activeTab === "Audit & Compliance" &&
          Boolean(item.auditCompliance || item.audit_compliance)) ||
        (activeTab === "SLA At Risk" &&
          Boolean(item.slaAtRisk || item.sla_at_risk));
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesType =
        typeFilter === "All" || item.exceptionType === typeFilter;
      const matchesRisk =
        riskFilter === "All" ||
        (riskFilter === "High" && isHighRisk) ||
        (riskFilter === "Medium" && isMediumRisk) ||
        (riskFilter === "Low" && isLowRisk);
      const matchesReason =
        reasonFilter === "All" || item.reviewReason === reasonFilter;
      const matchesSupplier =
        supplierFilter === "All" || item.supplier === supplierFilter;
      const matchesAssigned =
        assignedFilter === "All" || item.assignedTo === assignedFilter;
      const matchesAmount =
        (minAmount === "" || item.amountValue >= Number(minAmount)) &&
        (maxAmount === "" || item.amountValue <= Number(maxAmount));
      const confidenceThreshold =
        confidenceFilter === "All"
          ? null
          : Number.parseInt(confidenceFilter, 10);
      const matchesConfidence =
        confidenceThreshold === null ||
        (Number.isFinite(confidenceValue) &&
          confidenceValue >= confidenceThreshold);

      return (
        matchesTab &&
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesRisk &&
        matchesReason &&
        matchesSupplier &&
        matchesAssigned &&
        matchesAmount &&
        matchesConfidence
      );
    });
  }, [
    reviews,
    activeTab,
    search,
    statusFilter,
    typeFilter,
    assignedFilter,
    riskFilter,
    reasonFilter,
    supplierFilter,
    minAmount,
    maxAmount,
    confidenceFilter,
  ]);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
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
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <FilterSelect
            label="Risk Level"
            value={riskFilter}
            onChange={(event) => {
              setRiskFilter(event.target.value);
              setPage(1);
            }}
          >
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

          <FilterSelect
            label="Review Reason"
            value={reasonFilter}
            onChange={(event) => {
              setReasonFilter(event.target.value);
              setPage(1);
            }}
          >
            <option>All</option>
            {reasonOptions
              .filter((option) => option !== "All")
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </FilterSelect>

          <FilterSelect
            label="Supplier"
            value={supplierFilter}
            onChange={(event) => {
              setSupplierFilter(event.target.value);
              setPage(1);
            }}
          >
            <option>All</option>
            {supplierOptions
              .filter((option) => option !== "All")
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </FilterSelect>

          <div>
            <p className="text-[11px] font-semibold text-[#475569] mb-2">
              Amount Range
            </p>

            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={minAmount}
                onChange={(event) => {
                  setMinAmount(event.target.value);
                  setPage(1);
                }}
                placeholder="Min"
                className="w-full h-9 rounded-md border border-[#D9E1EA] px-3 text-[12px]"
              />
              <input
                type="number"
                min="0"
                value={maxAmount}
                onChange={(event) => {
                  setMaxAmount(event.target.value);
                  setPage(1);
                }}
                placeholder="Max"
                className="w-full h-9 rounded-md border border-[#D9E1EA] px-3 text-[12px]"
              />
            </div>
          </div>

          <FilterSelect
            label="Assigned Reviewer"
            value={assignedFilter}
            onChange={(e) => {
              setAssignedFilter(e.target.value);
              setPage(1);
            }}
          >
            {assignedOptions.map((option) => (
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

          <FilterSelect
            label="AI Confidence"
            value={confidenceFilter}
            onChange={(event) => {
              setConfidenceFilter(event.target.value);
              setPage(1);
            }}
          >
            <option value="All">All</option>
            <option value="90">90% +</option>
            <option value="80">80% +</option>
            <option value="70">70% +</option>
          </FilterSelect>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search AI reviews"
            aria-label="Search AI reviews"
            className="h-10 flex-1 rounded-xl border border-[#D9E1EA] px-4 text-[13px] outline-none focus:border-[#2563EB]"
          />

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setTypeFilter("All");
              setAssignedFilter("All");
              setRiskFilter("All");
              setReasonFilter("All");
              setSupplierFilter("All");
              setMinAmount("");
              setMaxAmount("");
              setConfidenceFilter("All");
              setPage(1);
            }}
            className="h-10 rounded-xl border border-[#2563EB] px-5 text-sm font-medium text-[#2563EB] hover:bg-blue-50"
          >
            Reset
          </button>
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
                Case ID
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
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No AI reviews found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const riskScore = row.riskScore;
                const riskLabel =
                  row.riskLevel ??
                  (riskScore >= 90
                    ? "HIGH"
                    : riskScore >= 60
                      ? "MEDIUM"
                      : riskScore === null
                        ? "-"
                        : "LOW");
                const isSelected =
                  String(selectedReview?.aiReviewId) === String(row.aiReviewId);
                return (
                  <tr
                    key={row.aiReviewId ?? `${row.invoiceId}-${index}`}
                    onClick={() => onSelectReview(row)}
                    aria-selected={isSelected}
                    className={`h-16 cursor-pointer border-b border-slate-200 hover:bg-slate-50 ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectReview(row)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select AI review ${row.invoiceId}`}
                      />
                    </td>

                    <td className="px-2">
                      <span className="font-semibold text-blue-600 text-sm">
                        {row.invoiceId}
                      </span>
                    </td>
                    <td className="px-2">
                      <span className="font-medium text-slate-700 text-sm">
                        {row.caseId || "-"}
                      </span>
                    </td>
                    <td className="px-2 text-sm text-slate-700">
                      {row.supplier}
                    </td>

                    <td className="px-2 font-semibold text-sm">
                      {row.invoiceAmount}
                    </td>

                    <td className="px-2">
                      <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                        {row.exceptionType}
                      </span>
                    </td>

                    <td className="px-2">
                      <span
                        className={`rounded-md px-2 whitespace-nowrap py-1 text-[10px] font-bold ${riskClass(
                          riskScore,
                          riskLabel,
                        )}`}
                      >
                        {riskScore ?? riskLabel}
                        {riskScore !== null ? ` ${riskLabel}` : ""}
                      </span>
                    </td>

                    <td className="px-2 text-sm font-semibold">
                      {row.confidence}
                    </td>

                    <td className="px-2 text-xs text-slate-600">
                      {row.humanReviewTrigger}
                    </td>

                    <td className="px-2">
                      <span className="px-2 text-sm whitespace-nowrap text-orange-500">
                        {row.slaDueAt
                          ? new Date(row.slaDueAt).toLocaleDateString("en-GB")
                          : "-"}
                      </span>
                    </td>

                    <td className="px-2 text-sm text-slate-700">
                      {row.assignedTo}
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
                        {row.nextAction === "-" ? "Review" : row.nextAction}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
        <div className="text-xs text-slate-500">
          Showing{" "}
          {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
          {filteredData.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="h-8 w-8 rounded border"
          >
            ‹
          </button>

          {Array.from(
            {
              length: Math.min(5, totalPages),
            },
            (_, i) => {
              let pageNumber;

              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`h-8 min-w-[32px] rounded-md text-xs font-medium transition ${
                    currentPage === pageNumber
                      ? "bg-[#2563EB] text-white"
                      : "border border-[#D9E1EA] bg-white text-[#334155] hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            },
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="h-8 w-8 rounded border"
          >
            ›
          </button>
        </div>
      </div>
      {isReviewOpen && reviewData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Review Details</h2>

              <button
                type="button"
                onClick={() => {
                  setIsReviewOpen(false);
                  setReviewData(null);
                }}
                aria-label="Close review details"
                className="text-xl font-bold"
              >
                ×
              </button>
            </div>

            <section className="mt-6">
              {reviewData.reviewDetails?.length ? (
                <div className="max-h-[500px] overflow-auto rounded-md border border-slate-200">
                  <table className="w-full min-w-[500px] text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200">
                      <tr>
                        <th className="px-2 py-2 text-left text-[11px] font-bold uppercase text-slate-500">
                          Field
                        </th>
                        <th className="px-2 py-2 text-left text-[11px] font-bold uppercase text-slate-500">
                          AI/OCR Extracted
                        </th>
                        <th className="px-2 py-2 text-left text-[11px] font-bold uppercase text-slate-500">
                          ERP Posting
                        </th>
                        <th className="px-2 py-2 text-left text-[11px] font-bold uppercase text-slate-500">
                          Validation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviewData.reviewDetails.map((detail, index) => {
                        const status = String(
                          detail.matchStatus || "",
                        ).toUpperCase();

                        const validationClass =
                          status === "MATCH"
                            ? "text-emerald-600"
                            : status === "MISMATCH"
                              ? "text-amber-600"
                              : status === "ERP ONLY"
                                ? "text-emerald-600"
                                : status === "REVIEW"
                                  ? "text-amber-600"
                                  : status === "HIGH_RISK_MISMATCH"
                                    ? "text-red-600"
                                    : "text-slate-600";

                        return (
                          <tr
                            key={`${detail.field}-${index}`}
                            className="border-b border-slate-200 hover:bg-slate-50"
                          >
                            {/* Field */}
                            <td className="px-2 py-2">
                              <div className="text-[13px] font-bold text-slate-900">
                                {displayValue(detail.field)}
                              </div>

                              {detail.ocrConfidence && (
                                <div className="mt-1 text-[12px] text-slate-500">
                                  OCR {displayValue(detail.ocrConfidence)}
                                </div>
                              )}
                            </td>

                            {/* OCR */}
                            <td className="px-2 py-2 text-[12px] font-medium text-slate-700">
                              {displayValue(detail.ocrValue)}
                            </td>

                            {/* ERP */}
                            <td className="px-2 py-2 text-[12px] font-medium text-slate-700">
                              {displayValue(detail.erpValue)}
                            </td>

                            {/* Validation */}
                            <td className="px-2 py-2">
                              <span
                                className={`text-[12px] font-semibold ${validationClass}`}
                              >
                                {status === "MATCH" && "✓ Match"}

                                {status === "MISMATCH" && "⚠ Mismatch"}

                                {status === "ERP ONLY" && "✓ ERP Only"}

                                {status === "REVIEW" && "? Review"}

                                {status === "HIGH_RISK_MISMATCH" &&
                                  "❗High-risk mismatch"}

                                {![
                                  "MATCH",
                                  "MISMATCH",
                                  "ERP ONLY",
                                  "REVIEW",
                                  "HIGH_RISK_MISMATCH",
                                ].includes(status) &&
                                  displayValue(detail.matchStatus)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="rounded-md bg-slate-50 px-3 py-4 text-sm text-slate-500">
                  No invoice field details were supplied.
                </p>
              )}
            </section>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsReviewOpen(false);
                  setReviewData(null);
                }}
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
