// "use client";

// import React from "react";

// const statusClass = (status) => {
//   switch (status) {
//     case "IDENTIFIED":
//       return "bg-[#DBEAFE] text-[#2563EB]";

//     case "COMPLETED":
//       return "bg-[#D1FAE5] text-[#10B981]";

//     case "FAILED":
//       return "bg-[#FEE2E2] text-[#EF4444]";

//     default:
//       return "bg-[#F1F5F9] text-[#64748B]";
//   }
// };

// export const AiReviewTable = ({
//   paginatedData,
//   selectedRecovery,
//   setSelectedRecovery,
//   page,
//   setPage,
//   totalPages,
//   filteredData,
//   pageSize,
// }) => {
//   return (
//     <>
//       {/* TABLE */}
//       <div className="overflow-x-auto flex-1 min-h-[550px]">
//         <table className="w-full">
//           <thead>
//             <tr className="h-[42px] border-b border-[#E2E8F0]">
//               <th className="w-12 px-5">
//               </th>

//               {[
//                 "RECOVERY ID",
//                 "TYPE",
//                 "STATUS",
//                 "VENDOR",
//                 "RELATED CASE ID",
//                 "AMOUNT (USD)",
//                 "RECOVERY DATE",
//                 "SLA DUE",
//                 "INVESTIGATOR",
//               ].map((item) => (
//                 <th
//                   key={item}
//                   className="px-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B] whitespace-nowrap"
//                 >
//                   {item}
//                 </th>
//               ))}

//               <th className="w-10" />
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedData.map((row) => (
//               <tr
//                 key={row.recoveryId}
//                 onClick={() => setSelectedRecovery(row)}
//                 className={`h-[52px] border-b border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors ${
//                   selectedRecovery?.recoveryId === row.recoveryId
//                     ? "bg-[#F8FAFC]"
//                     : ""
//                 }`}
//               >
//                 <td className="px-5">
//                   <input
//                     type="checkbox"
//                     checked={
//                       selectedRecovery?.recoveryId ===
//                       row.recoveryId
//                     }
//                     onChange={() =>
//                       setSelectedRecovery(row)
//                     }
//                     onClick={(e) =>
//                       e.stopPropagation()
//                     }
//                     aria-label={`Select recovery ${row.recoveryId}`}
//                   />
//                 </td>

//                 <td className="px-3 text-[12px] font-semibold text-[#2563EB] whitespace-nowrap">
//                   {row.recoveryId}
//                 </td>

//                 <td className="px-3">
//                   <div className="flex items-center gap-1.5 text-[12px] text-[#334155] whitespace-nowrap">
//                     {row.type}
//                   </div>
//                 </td>

//                 <td className="px-3">
//                   <span
//                     className={`px-2.5 py-[2px] rounded-md text-[10px] font-semibold whitespace-nowrap ${statusClass(
//                       row.status
//                     )}`}
//                   >
//                     {row.status}
//                   </span>
//                 </td>

//                 <td className="px-3 text-[12px] text-[#334155] whitespace-nowrap">
//                   {row.vendor}
//                 </td>

//                 <td className="px-3 text-[12px] font-medium text-[#2563EB] whitespace-nowrap">
//                   {row.caseId}
//                 </td>

//                 <td className="px-3 text-[12px] font-semibold text-[#0F172A] whitespace-nowrap">
//                   {row.amount}
//                 </td>

//                 <td className="px-3 text-[12px] text-[#64748B] whitespace-nowrap">
//                   {row.recoveryDate}
//                 </td>

//                 <td className="px-3 text-[12px] text-[#64748B] whitespace-nowrap">
//                   {row.slaDue}
//                 </td>

//                 <td className="px-3 text-[12px] text-[#64748B] whitespace-nowrap">
//                   {row.investigator}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="border-t border-[#E2E8F0] px-5 py-3 flex items-center justify-between flex-wrap gap-2">
//         <div className="text-[12px] text-[#64748B]">
//           Showing {(page - 1) * pageSize + 1} to{" "}
//           {Math.min(
//             page * pageSize,
//             filteredData.length
//           )}{" "}
//           of {filteredData.length.toLocaleString()} recoveries
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() =>
//               setPage((p) => Math.max(1, p - 1))
//             }
//             className="w-7 h-7 rounded-lg border border-[#D9E1EA] text-[#475569]"
//           >
//             ‹
//           </button>

//           {Array.from(
//             { length: totalPages },
//             (_, index) => index + 1
//           ).map((n) => (
//             <button
//               key={n}
//               onClick={() => setPage(n)}
//               className={`w-7 h-7 rounded-lg text-[12px] font-medium ${
//                 page === n
//                   ? "bg-[#2563EB] text-white"
//                   : "border border-[#D9E1EA] text-[#475569]"
//               }`}
//             >
//               {n}
//             </button>
//           ))}

//           <button
//             onClick={() =>
//               setPage((p) =>
//                 Math.min(totalPages, p + 1)
//               )
//             }
//             className="w-7 h-7 rounded-lg border border-[#D9E1EA] text-[#475569]"
//           >
//             ›
//           </button>

//           <select className="h-7 rounded-lg border border-[#D9E1EA] px-2 text-[12px]">
//             <option>10 / page</option>
//           </select>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AiRecommendationTable;

"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

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

export const AiRecommendationTable = ({
  paginatedData,
  selectedRecovery,
  setSelectedRecovery,
  page,
  setPage,
  totalPages,
  filteredData,
  pageSize,
}) => {
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

              <th className="w-8" />
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
                      checked={
                        selectedRecovery?.recoveryId ===
                        row.recoveryId
                      }
                      onChange={() =>
                        setSelectedRecovery(row)
                      }
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    />
                  </td>

                  <td className="px-3">
                    <span className="font-semibold text-blue-600 text-sm">
                      {row.recoveryId}
                    </span>
                  </td>

                  <td className="px-3 text-sm text-slate-700">
                    {row.vendor}
                  </td>

                  <td className="px-3 font-semibold text-sm">
                    {row.amount}
                  </td>

                  <td className="px-3">
                    <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                      {row.type}
                    </span>
                  </td>

                  <td className="px-3">
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-bold ${riskClass(
                        riskScore
                      )}`}
                    >
                      {riskScore} HIGH
                    </span>
                  </td>

                  <td className="px-3 text-sm font-semibold">
                    {confidence}
                  </td>

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
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-3">
                    <button className="h-8 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700">
                      Review
                    </button>
                  </td>

                  <td>
                    <MoreHorizontal
                      size={16}
                      className="text-slate-400"
                    />
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
          Showing {(page - 1) * pageSize + 1} to{" "}
          {Math.min(
            page * pageSize,
            filteredData.length
          )}{" "}
          of {filteredData.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setPage((p) => Math.max(1, p - 1))
            }
            className="h-8 w-8 rounded border"
          >
            ‹
          </button>

          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded text-xs ${
                page === n
                  ? "bg-blue-600 text-white"
                  : "border"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() =>
              setPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
            className="h-8 w-8 rounded border"
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
};

export default AiRecommendationTable;