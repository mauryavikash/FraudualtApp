// "use client";
// import React, { useState } from "react";
// import { X, Check, CircleCheck, FilePenLine, Sparkles } from "lucide-react";

// const statusBadgeClass = (status) => {
//   switch (status) {
//     case "Completed":
//       return "bg-[#D1FAE5] text-[#10B981]";
//     case "In Progress":
//       return "bg-[#DBEAFE] text-[#2563EB]";
//     case "Failed":
//       return "bg-[#FEE2E2] text-[#EF4444]";
//     default:
//       return "bg-[#F1F5F9] text-[#64748B]";
//   }
// };

// const formatDate = (value) => value ? new Date(value).toLocaleString() : "-";

// export const AiReviewDetails = ({ recovery, stages, timeline, tabs }) => {
//   // const [activeTab, setActiveTab] = useState("Overview");
//   const [isDraftGenerated, setIsDraftGenerated] = useState(false);

//   const selected = recovery ?? {};
//   const progressStages = Array.isArray(stages) ? stages : [];
//   const timelineEvents = Array.isArray(timeline) ? timeline : [];
//   // const detailTabs = Array.isArray(tabs) ? tabs.map((tab) => tab.tab) : [];

//   const isClosed = selected.status === "Completed";

//   return (
//     // <div className="w-full flex flex-col bg-white rounded-[16px] border border-[#D9E1EA] shadow-[0px_2px_8px_rgba(15,23,42,0.05)] overflow-hidden">
//       <div className="w-full h-full flex flex-col bg-white rounded-[16px] border border-[#D9E1EA] shadow-[0px_2px_8px_rgba(15,23,42,0.05)] overflow-hidden">
//     {/* Header */}
//       <div className="px-4 pt-4">
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-2">
//             <h2 className="text-[16px] leading-[22px] font-semibold text-[#0F172A]">
//               {selected.recoveryId}
//             </h2>

//             <span
//               className={`px-2 py-[2px] text-[10px] font-semibold rounded ${statusBadgeClass(
//                 selected.status
//               )}`}
//             >
//               {selected.status}
//             </span>
//           </div>

//           <button className="text-[#64748B] hover:text-[#334155]" aria-label="Close recovery details">
//             <X size={16} />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 mt-3 border-b border-[#E5E7EB] overflow-x-auto" role="tablist">
//           {/* {detailTabs.map((tab) => (
//             <button
//               key={tab}
//               role="tab"
//               aria-selected={activeTab === tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-2 text-[12px] font-medium whitespace-nowrap ${
//                 activeTab === tab
//                   ? "text-[#2563EB] border-b-2 border-[#2563EB]"
//                   : "text-[#475569]"
//               }`}
//             >
//               {tab}
//             </button>
//           ))} */}

//           <h5 className="pb-2 text-[12px] font-medium text-[#2563EB] border-b border-[#2563EB]">Overview</h5>
//         </div>
//       </div>

//       {/* Overview */}
//       <div className="px-4 pt-4 flex-1 min-h-0 overflow-y-auto">

//         <div className="flex flex-col gap-2.5 text-[12px]">
//           <MetaRow label="Recovery Type" value={selected.type} />
//           <MetaRow
//             label="Status"
//             value={
//               <span
//                 className={`px-2 py-[2px] rounded text-[10px] font-semibold ${statusBadgeClass(
//                   selected.status
//                 )}`}
//               >
//                 {selected.status}
//               </span>
//             }
//           />
//           <MetaRow label="Vendor" value={selected.vendor || "-"} bold />
//           <MetaRow label="Amount (USD)" value={selected.amount} bold />
//           <MetaRow label="Recovered On" value={formatDate(selected.recoveredOn)} />
//           <MetaRow label="Payment Date" value={formatDate(selected.paymentDate)} />
//           <MetaRow
//             label="Original Payment ID"
//             value={<span className="text-[#2563EB] font-medium">{selected.originalPaymentId}</span>}
//           />
//           <MetaRow label="Investigator" value={selected.investigator ?? "Unassigned"} />
//           <MetaRow label="Source System" value={selected.sourceSystem} />
//           <MetaRow label="Recovery Method" value={selected.recoveryMethod} />
//           <MetaRow label="Notes" value={selected.notes} />
//         </div>

//         {/* Recovery Progress */}
//         <div className="mt-5">
//           <div className="text-[11px] font-semibold tracking-wide text-[#64748B]">
//             RECOVERY PROGRESS
//           </div>

//           <div className="mt-4 flex items-center">
//             {progressStages.map((stage, index) => (
//               <React.Fragment key={stage.stage}>
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center ${
//                       isClosed ? "bg-[#10B981]" : "bg-[#E2E8F0]"
//                     }`}
//                   >
//                     {isClosed && <Check size={12} className="text-white" />}
//                   </div>
//                   <span className="mt-2 text-[10px] font-medium text-[#334155]">
//                     {stage.stage}
//                   </span>
//                   <span className="text-[9px] text-[#94A3B8]">{formatDate(stage.date)}</span>
//                 </div>

//                 {index < progressStages.length - 1 && (
//                   <div
//                     className={`flex-1 h-[2px] mx-1 -mt-4 ${
//                       isClosed ? "bg-[#10B981]" : "bg-[#E2E8F0]"
//                     }`}
//                   />
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           <span className="sr-only">
//             Recovery progress: {progressStages.map((stage) => `${stage.stage} (${stage.date})`).join(", ")}.
//           </span>
//         </div>

//         {/* Recovery Timeline */}
//         <div className="mt-6 pb-4">
//           <div className="text-[11px] font-semibold tracking-wide text-[#64748B] mb-3">
//             RECOVERY TIMELINE
//           </div>

//           <ol className="flex flex-col gap-3.5">
//             {timelineEvents.map((event, index) => (
//               <li key={`${event.event}-${event.timestamp}`} className="flex gap-2.5">
//                 <div className="flex flex-col items-center">
//                   <span className="w-2 h-2 rounded-full bg-[#10B981] mt-1 shrink-0" />
//                   {index < timelineEvents.length - 1 && (
//                     <span className="w-px flex-1 bg-[#E2E8F0] mt-1" />
//                   )}
//                 </div>

//                 <div className="flex-1 flex items-start justify-between gap-2 pb-1">
//                   <div className="min-w-0">
//                     <p className="text-[12px] font-semibold text-[#0F172A]">
//                       {event.event}
//                     </p>
//                     <p className="text-[11px] text-[#64748B]">{event.actor}</p>
//                   </div>
//                   <span className="text-[10px] text-[#94A3B8] whitespace-nowrap shrink-0">
//                     {formatDate(event.timestamp)}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// };

// function MetaRow({ label, value, bold }) {
//   return (
//     <div className="flex items-center justify-between gap-3">
//       <span className="text-[#64748B]">{label}</span>
//       <span className={`text-right text-[#0F172A] ${bold ? "font-semibold" : ""}`}>
//         {value}
//       </span>
//     </div>
//   );
// }


"use client";

import React from "react";
import {
  X,
  AlertCircle,
  Sparkles,
  UserPlus,
  ArrowUpCircle,
  MessageSquare,
  FileText,
} from "lucide-react";

const statusBadgeClass = (status) => {
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

export const AiReviewDetails = ({ recovery }) => {
  const selected = recovery || {};

  return (
    <div className="w-full h-full bg-white rounded-[16px] border border-[#D9E1EA] shadow-sm overflow-hidden">
      {/* Header */}

      <div className="px-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-[#0F172A] leading-none">
              {selected.recoveryId}
            </h2>

            <p className="mt-2 text-sm font-medium text-slate-600">
              {selected.vendor}
            </p>
          </div>

          <button className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        {/* Risk badges */}

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-bold text-red-700">
            HIGH RISK
          </span>

          <span className="rounded-full bg-purple-100 px-3 py-1 text-[11px] font-bold text-purple-700">
            REVIEW REQUIRED
          </span>
        </div>

        {/* Tabs */}

        <div className="mt-5 flex gap-5 border-b">
          <button className="border-b-2 border-blue-600 pb-2 text-xs font-semibold text-blue-600">
            Overview
          </button>

          <button className="pb-2 text-xs font-medium text-slate-500">
            AI Findings
          </button>

          <button className="pb-2 text-xs font-medium text-slate-500">
            Validation
          </button>

          <button className="pb-2 text-xs font-medium text-slate-500">
            Audit Trail
          </button>
        </div>
      </div>

      {/* Body */}

      <div className="px-5 py-4 overflow-y-auto">
        {/* Summary Card */}

        <div className="rounded-lg border border-slate-200 p-4">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <InfoRow
              label="Supplier"
              value={selected.vendor}
            />

            <InfoRow
              label="Invoice Amount"
              value={selected.amount}
            />

            <InfoRow
              label="PO Number"
              value={selected.caseId}
            />

            <InfoRow
              label="Source System"
              value={selected.sourceSystem}
            />

            <InfoRow
              label="Assigned To"
              value={selected.investigator}
            />

            <InfoRow
              label="SLA"
              value={
                <span className="font-semibold text-orange-600">
                  {selected.slaDue}
                </span>
              }
            />

            <InfoRow
              label="AI Risk Score"
              value={
                <span className="font-bold text-red-600">
                  92 / 100 - HIGH
                </span>
              }
            />

            <InfoRow
              label="AI Confidence"
              value="96%"
            />
          </div>
        </div>

        {/* Why Review Required */}

        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-2">
            <AlertCircle
              size={18}
              className="text-blue-600"
            />

            <h3 className="text-sm font-semibold text-blue-700">
              Why is review required?
            </h3>
          </div>

          <ul className="mt-3 space-y-1 text-xs text-slate-700">
            <li>• Potential duplicate detected</li>
            <li>• Bank account mismatch</li>
            <li>• Invoice amount exceeds threshold</li>
          </ul>
        </div>

        {/* AI Recommendation */}

        <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div className="flex items-center gap-2">
            <Sparkles
              size={18}
              className="text-purple-700"
            />

            <h3 className="text-sm font-semibold text-purple-700">
              AI Recommended Next Action
            </h3>
          </div>

          <div className="mt-3 rounded-md bg-red-100 py-3 text-center text-sm font-bold text-red-700">
            HOLD PAYMENT & INVESTIGATE
          </div>

          <p className="mt-3 text-xs text-slate-700">
            High duplicate probability and supplier
            mismatch require validation before payment
            release.
          </p>

          <div className="mt-3">
            <div className="text-xs font-semibold text-slate-700">
              Recommended Steps:
            </div>

            <ol className="mt-2 list-decimal pl-5 text-xs text-slate-600 space-y-1">
              <li>Review duplicate evidence</li>
              <li>Validate supplier bank details</li>
              <li>Confirm tax code</li>
              <li>Resolve exceptions</li>
              <li>Continue payment after approval</li>
            </ol>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="mt-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            Quick Actions
          </h3>

          <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 font-semibold text-white hover:bg-blue-700">
            <FileText size={16} />
            Review Invoice
          </button>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 rounded-md border border-slate-300 py-2 text-xs font-medium hover:bg-slate-50">
              <UserPlus size={14} />
              Assign
            </button>

            <button className="flex items-center justify-center gap-2 rounded-md border border-slate-300 py-2 text-xs font-medium hover:bg-slate-50">
              <ArrowUpCircle size={14} />
              Escalate
            </button>

            <button className="flex items-center justify-center gap-2 rounded-md border border-slate-300 py-2 text-xs font-medium hover:bg-slate-50">
              <FileText size={14} />
              Request Correction
            </button>

            <button className="flex items-center justify-center gap-2 rounded-md border border-slate-300 py-2 text-xs font-medium hover:bg-slate-50">
              <MessageSquare size={14} />
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoRow({ label, value }) {
  return (
    <>
      <div className="text-[12px] font-semibold text-slate-500">
        {label}
      </div>

      <div className="text-[12px] font-semibold text-slate-800">
        {value || "-"}
      </div>
    </>
  );
}

export default AiReviewDetails;