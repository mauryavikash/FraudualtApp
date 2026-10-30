"use client";

import React, { useState } from "react";

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

export const AiReviewTable = ({
  paginatedData,
  selectedRecovery,
  setSelectedRecovery,
  page,
  setPage,
  totalPages,
  filteredData,
  pageSize,
}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  return (
    <>
      <div className="overflow-auto flex-1 min-h-[600px]">
        <table className="min-w-[1500px] w-full">
          <thead>
            <tr className="h-12 border-b border-slate-200 bg-slate-50">
              <th className="w-12 px-4" />

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                Invoice ID
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                Supplier
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                Invoice Amount
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                Exception Type
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                AI Risk Score
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                AI Confidence
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                Human Review Trigger
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                SLA
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                Assigned To
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
                Status
              </th>

              <th className="px-3 text-left text-[10px] font-bold uppercase text-slate-500">
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

                  <td className="px-3">
                    <span className="font-semibold text-blue-600 text-sm">
                      {row.recoveryId}
                    </span>
                  </td>

                  <td className="px-3 text-sm text-slate-700">{row.vendor}</td>

                  <td className="px-3 font-semibold text-sm">{row.amount}</td>

                  <td className="px-3">
                    <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                      {row.type}
                    </span>
                  </td>

                  <td className="px-3">
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-bold ${riskClass(
                        riskScore,
                      )}`}
                    >
                      {riskScore} HIGH
                    </span>
                  </td>

                  <td className="px-3 text-sm font-semibold">{confidence}</td>

                  <td className="px-3 text-xs text-slate-600">
                    Amount {">"} $100K
                    <br />
                    Duplicate Risk {">"} 85%
                  </td>

                  <td className="px-3">
                    <span className="font-semibold text-orange-500">
                      {row.slaDue}
                    </span>
                  </td>

                  <td className="px-3 text-sm text-slate-700">
                    {row.investigator}
                  </td>

                  <td className="px-3">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-semibold ${statusClass(
                        row.status,
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-3">
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

                  {/* <td>
                    <MoreHorizontal
                      size={16}
                      className="text-slate-400"
                    />
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
        <div className="text-xs text-slate-500">
          Showing {(page - 1) * pageSize + 1} to{" "}
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
        <h2 className="text-lg font-semibold">
          Review Details
        </h2>

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
