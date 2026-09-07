import React, { useState } from "react";
import {
  Sparkles,
  MoreHorizontal,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";

const tableData = [
  {
    caseId: "INV-2025-000123",
    caseType: "Duplicate",
    priority: "High",
    status: "In Progress",
    vendor: "ABC Solutions",
    amount: "125,450.00",
    detectedOn: "May 20, 2025 10:24 AM",
    slaDue: "May 24, 2025",
    remaining: "2 Days Left",
    investigator: "Sarah Johnson",
    sourceSystem: "SAP",
  },
];

export const RecoveriesDetails = () => {
  const [selectedCase] = useState(tableData[0]);
  return (
   <div className="w-full bg-white rounded-[16px] border border-[#D1D5DB] shadow-[0px_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
    {/* Header */}
    <div className="px-4 pt-4">
        <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
            <h2 className="text-[18px] leading-[24px] font-semibold text-[#0F172A]">
            {selectedCase.caseId}
            </h2>

            <span className="px-2 py-[2px] text-[10px] font-medium rounded bg-[#F3E8FF] text-[#9333EA]">
            {selectedCase.caseType}
            </span>
        </div>

        <button className="text-[#64748B] hover:text-[#334155]">
            <X size={16} />
        </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-5 mt-4 border-b border-[#E5E7EB]">
        <button className="pb-2 text-[12px] font-medium text-[#2563EB] border-b border-[#2563EB]">
            Details
        </button>

        <button className="pb-2 text-[12px] text-[#475569]">
            Transactions (4)
        </button>

        <button className="pb-2 text-[12px] text-[#475569]">
            AI Insights
        </button>

        <button className="pb-2 text-[12px] text-[#475569]">
            Audit Trail
        </button>
        </div>
    </div>

    {/* Details */}
    <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-y-5 gap-x-8">
        <Info
            label="STATUS"
            value={
            <span className="inline-flex px-2 py-[2px] rounded text-[10px] font-medium bg-[#DBEAFE] text-[#2563EB]">
                In Progress
            </span>
            }
        />

        <Info
            label="PRIORITY"
            value={
            <div className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#EF4444]" />
                <span>High</span>
            </div>
            }
        />

        <Info
            label="AMOUNT (USD)"
            value={
            <span className="font-semibold text-[14px]">
                125,450.00
            </span>
            }
        />

        <Info
            label="VENDOR"
            value="ABC Solutions"
        />

        <Info
            label="DETECTED ON"
            value="May 20, 2025 10:24 AM"
        />

        <Info
            label="SLA DUE"
            value={
            <span className="text-[#F59E0B]">
                May 24, 2025 (2 Days Left)
            </span>
            }
        />

        <Info
            label="INVESTIGATOR"
            value="Sarah Johnson"
        />

        <Info
            label="SOURCE SYSTEM"
            value="SAP"
        />
        </div>

        {/* AI Recommendation */}
        <div className="mt-5 border border-[#D1D5DB] rounded-[10px] bg-[#F8FAFC] p-3">
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center">
            <Sparkles size={9} className="text-white" />
            </div>

            <span className="text-[13px] font-semibold text-[#0F172A]">
            AI Recommendation
            </span>
        </div>

        <p className="mt-3 text-[12px] leading-5 text-[#475569]">
            Potential duplicate invoice detected with 92%
            confidence. Review and confirm as duplicate or
            false positive.
        </p>

        <button className="mt-2 text-[12px] font-medium text-[#2563EB]">
            View AI Analysis
        </button>
        </div>

        {/* Progress */}
        <div className="mt-5">
        <div className="text-[11px] font-semibold tracking-wide text-[#64748B]">
            CASE PROGRESS
        </div>

        <div className="mt-4 flex items-center">
            <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
            <span className="mt-2 text-[10px] text-[#334155]">
                Detected
            </span>
            </div>

            <div className="w-14 h-[2px] bg-[#2563EB] mx-3" />

            <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#2563EB]" />
            <span className="mt-2 text-[10px] text-[#2563EB] font-medium">
                Under Review
            </span>
            </div>

            <div className="w-14 h-[2px] bg-[#E2E8F0] mx-3" />

            <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1]" />
            <span className="mt-2 text-[10px] text-[#64748B]">
                Resolution
            </span>
            </div>

            <div className="w-14 h-[2px] bg-[#E2E8F0] mx-3" />

            <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1]" />
            <span className="mt-2 text-[10px] text-[#64748B]">
                Closed
            </span>
            </div>
        </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-5">
        <button className="h-9 rounded-md bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8]">
            Review Case
        </button>

        <button className="h-9 rounded-md border border-[#CBD5E1] bg-white text-[13px] font-medium text-[#334155]">
            Escalate Case
        </button>

        <button className="h-9 rounded-md border border-[#CBD5E1] bg-white text-[13px] font-medium text-[#334155] flex items-center justify-center gap-1">
            More Actions
            <ChevronDown size={14} />
        </button>
        </div>

        {/* Notes */}
        <div className="mt-6 pb-4">
        <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold tracking-wide text-[#64748B]">
            NOTES
            </div>

            <Plus size={14} className="text-[#475569]" />
        </div>

        <div className="mt-3 flex gap-2">
            <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-[9px] font-semibold">
            SJ
            </div>

            <div>
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-[#0F172A]">
                Sarah Johnson
                </span>

                <span className="text-[10px] text-[#94A3B8]">
                May 20, 2025 11:15 AM
                </span>
            </div>

            <p className="mt-1 text-[12px] leading-4 text-[#475569] max-w-[320px]">
                Case assigned for review. Initial analysis
                indicates possible duplicate from similar invoice.
            </p>
            </div>
        </div>

        <button className="mt-3 text-[12px] font-medium text-[#2563EB]">
            View all notes
        </button>
        </div>
    </div>
    </div>
  );
};

function Info({ label, value }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-slate-500 tracking-wide mb-1">
        {label}
      </div>

      <div className="text-sm text-slate-800 font-medium">
        {value}
      </div>
    </div>
  );
}