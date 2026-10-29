

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

export const AiRecommendationDetails = ({ recovery }) => {
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

export default AiRecommendationDetails;