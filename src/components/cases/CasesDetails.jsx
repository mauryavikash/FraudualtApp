import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  Sparkles,
  MoreHorizontal,
  X,
  Plus,
    ArrowRight,
    UserPlus,
    FileSearch,
    AlertTriangle,
    BanknoteArrowUp,
} from "lucide-react";
import { toast } from "sonner";
import { submitCaseAction } from "@/app/lib/api";
export const CasesDetails = ({ caseData, userName }) => {
    
    const selectedCase = caseData ?? {};
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCaseDetailsOpen, setIsCaseDetailsOpen] = useState(false);
    // const handleAction = async (action) => {
    // try {
    //     if (action === "approve" && !reason) {
    //     alert("Please select a reason code.");
    //     return;
    //     }

    //     setLoading(true);

    //     const payload = {
    //     pair_id: selectedCase?.pair_id,
    //     action,
    //     reason_code: reason ,
    //     comments: "",
    //     performed_by: "",
    //     actionedAt: new Date().toISOString(),
    //     };

    //     const response = await submitCaseAction(payload);

    //     toast.success("Action completed successfully");
    // } catch (error) {
    //     // console.error(error);
    //     toast.error(error?.response?.data?.message || "Something went wrong");
    // } finally {
    //     setLoading(false);
    // }
    // };
 
    const handleAction = async (action) => {
  if (action === "approve" && !reason) {
    toast.error("Please select a reason code.");
    return;
  }

  const toastId = toast.loading("Processing action...");

  try {
    const payload = {
      pair_id: selectedCase?.pair_id,
      action,
      reason_code: reason,
      comments: "",
      performed_by: userName,
      actionedAt: new Date().toISOString(),
    };

    await submitCaseAction(payload);

    toast.success("Action completed successfully", {
      id: toastId,
    });
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong",
      {
        id: toastId,
      }
    );
  }
};
    const amount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(Number(selectedCase.amount ?? 0));
    const detectedOn = selectedCase.detectedOn
        ? new Date(selectedCase.detectedOn).toLocaleString()
        : "-";
  return (
   <div className="w-full bg-white rounded-[16px] border border-[#D1D5DB] shadow-[0px_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
    {/* Header */}
    <div className="px-4 pt-4">
        <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
            <h2 className="text-[18px] leading-[24px] font-semibold text-[#0F172A]">
            {selectedCase.pair_id}
            </h2>

            <span className="px-2 py-[2px] text-[10px] font-medium rounded bg-[#F3E8FF] text-[#9333EA]">
            {selectedCase.case_type}
            </span>
        </div>
        

        <button className="text-[#64748B] hover:text-[#334155]">
            <X size={16} />
        </button>
        </div>
        <div className="mt-2">
            <div className="mt-3 overflow-x-auto rounded-lg">
                <div className="min-w-[700px]">
                <div className="grid grid-cols-6 bg-[#01d4d1] px-3 py-2 text-[11px] font-semibold text-white">
                <div>Invoice Number</div>
                <div>Invoice Date</div>
                <div>Vendor Name</div>
                <div>Count</div>
                <div>currency</div>
                <div>Amount</div>
                </div>

                {selectedCase?.invoice_1 && (
                <div className="grid grid-cols-6 border-t bg-[#01d4d1] px-3 py-2 text-[12px] text-white">
                    <div>
                    {selectedCase.invoice_1.invoice_number}
                    </div>

                    <div>
                    {selectedCase.invoice_1.invoice_date}
                    </div>
                    <div>
                    {selectedCase.invoice_1.vendor_name}
                    </div>
                    <div>
                    {selectedCase.invoice_count }
                    </div>
                    <div>
                    {selectedCase.invoice_1.currency }
                    </div>
                    <div >
                    {selectedCase.invoice_1.amount}
                    </div>
                </div>
                )}
                {selectedCase?.invoice_2 && (
                <div className="grid grid-cols-6 border-t bg-[#01d4d1] px-3 py-2 text-[12px] text-white">
                    <div>
                    {selectedCase.invoice_2.invoice_number}
                    </div>

                    <div>
                    {selectedCase.invoice_2.invoice_date}
                    </div>
                    <div>
                    {selectedCase.invoice_2.vendor_name}
                    </div>
                    <div>
                    {selectedCase.invoice_count }
                    </div>
                    <div>
                    {selectedCase.invoice_2.currency }
                    </div>
                    <div >
                    {selectedCase.invoice_2.amount}
                    </div>
                </div>
                )}
                </div>
            </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-5 mt-4 border-b border-[#E5E7EB]">
        <button className="pb-2 text-[12px] font-medium text-[#2563EB] border-b border-[#2563EB]">
            Details
        </button>

        {/* <button className="pb-2 text-[12px] text-[#475569]">
            Transactions (4)
        </button>

        <button className="pb-2 text-[12px] text-[#475569]">
            AI Insights
        </button>

        <button className="pb-2 text-[12px] text-[#475569]">
            Audit Trail
        </button> */}
        </div>
    </div>

    {/* Details */}
    <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-y-3 gap-x-3">
        <Info
            label="STATUS"
            value={
            <span className="inline-flex px-2 py-[2px] rounded text-[10px] font-medium bg-[#DBEAFE] text-[#2563EB]">
                {selectedCase.risk_level ?? "-"}
            </span>
            }
        />

        <Info
            label="PRIORITY"
            value={
            <div className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#EF4444]" />
                <span>{selectedCase.priority ?? "-"}</span>
            </div>
            }
        />

        <Info
            label="AMOUNT (USD)"
            value={
            <span className="font-semibold text-[14px]">
                {selectedCase?.invoice_1?.amount}
            </span>
            }
        />

        <Info
            label="VENDOR"
            value={selectedCase.vendor || "-"}
        />

        <Info
            label="DETECTED ON"
            value={detectedOn}
        />

        <Info
            label="INVOICE DATE"
            value={
            <span className="text-[#F59E0B]">
                {selectedCase.invoice_1?.invoice_date ?? "-"}
            </span>
            }
        />

        <Info
            label="INVOICE ID"
            value={selectedCase.invoice_1?.invoice_id ?? "-"}
        />

        <Info
            label="INVOICE NUMBER"
            value={selectedCase.invoice_1?.invoice_number ?? "-"}
        />
        </div>

                <button
                    type="button"
                    onClick={() => setIsCaseDetailsOpen(true)}
                    className="h-8 rounded-md bg-blue-600 mt-3 px-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                    View Case Details
                </button>
        {/* Progress */}
        <div className="mt-2">
        <div className="text-[11px] font-semibold tracking-wide text-[#64748B]">
            CASE PROGRESS
        </div>

        <div className="mt-2 flex items-center">
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

        {/* Quick Actions */}
        <div className="mt-2 mb-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
          <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>

          <div className="mt-2">
            <label className="text-xs font-medium text-slate-600">
            Reason Code (Required for Confirm)
            </label>

            <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-blue-500"
            >
            <option value="">Select a reason...</option>
            <option value="EXACT_MATCH">Exact Match</option>
            <option value="DUPLICATE_INVOICE">Duplicate Invoice</option>
            <option value="PAYMENT_ERROR">Payment Error</option>
            <option value="VENDOR_ISSUE">Vendor Issue</option>
            </select>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-3">
            {/* Confirm */}
            <button
            disabled={loading}
            onClick={() => handleAction("approve")}
            className="flex flex-col items-center justify-center rounded-lg bg-emerald-600 py-2 text-white hover:bg-emerald-700"
            >
            <FileSearch size={18} />
            <span className="mt-1 text-xs font-medium">
                Approve
            </span>
            </button>

            {/* Reject */}
            <button
            disabled={loading}
            onClick={() => handleAction("reject")}
            className="flex flex-col items-center justify-center rounded-lg bg-rose-600 py-2 text-white hover:bg-rose-700"
            >
            <X size={18} />
            <span className="mt-1 text-xs font-medium">
                Reject
            </span>
            </button>

            {/* Escalate */}
            <button
            disabled={loading}
            onClick={() => handleAction("escalate")}
            className="flex flex-col items-center justify-center rounded-lg border border-amber-500 bg-white py-2 text-amber-600 hover:bg-amber-50"
            >
            <AlertTriangle size={18} />
            <span className="mt-1 text-xs font-medium">
                Escalate
            </span>
            </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
            Confirm requires a reason code. Reject and Escalate do not.
        </p>

        <div className="mt-2 border-t pt-2">
            <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-slate-500">Category</span>
            <span className="font-medium text-right">Exact Match</span>

            <span className="text-slate-500">Rule</span>
            <span className="font-medium text-right">Rule_1</span>

            <span className="text-slate-500">Similarity</span>
            <span className="font-medium text-right">{selectedCase?.similarity ?? "-"}</span>

            <span className="text-slate-500">Total Amount</span>
            <span className="font-medium text-right">{selectedCase?.invoice_1?.amount ?? "-"}</span>

            <span className="text-slate-500">Records</span>
            <span className="font-medium text-right">{selectedCase?.invoice_1?.invoice_count ?? "-"}</span>
            </div>

            <div className="mt-2 rounded-lg bg-slate-100 p-3">
                <div className="text-xs font-semibold text-slate-600">
                    Rule Explanation
                </div>

                <p className="mt-1 text-sm text-slate-700">
                    Exact match on all fields.
                </p>
            </div>
        </div>
        </div>
    </div>
     {isCaseDetailsOpen && typeof document !== "undefined" && createPortal(
            <div
                role="presentation"
                onClick={() => setIsCaseDetailsOpen(false)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4"
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="case-details-title"
                    onClick={(event) => event.stopPropagation()}
                    className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl"
                >
                    <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Case Details</p>
                            <h2 id="case-details-title" className="mt-1 text-lg font-semibold text-slate-900">
                                {selectedCase.pair_id ?? "Case"}
                            </h2>
                        </div>
                        <button
                            type="button"
                            aria-label="Close case details"
                            onClick={() => setIsCaseDetailsOpen(false)}
                            className="rounded-md mt-3 p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 px-6 py-5 text-sm sm:grid-cols-2">
                        <ModalInfo label="Case Type" value={selectedCase.case_type} />
                        <ModalInfo label="Duplicate Type" value={selectedCase.duplicateType ?? selectedCase.duplicate_type} />
                        <ModalInfo label="Status" value={selectedCase.case_status ?? selectedCase.risk_level} />
                        <ModalInfo label="Priority" value={selectedCase.priority} />
                        <ModalInfo label="Vendor" value={selectedCase.vendor} />
                        <ModalInfo label="Similarity" value={selectedCase.similarity} />
                    </div>

                    <div className="border-t border-slate-200 px-6 py-5">
                        <h3 className="text-sm font-semibold text-slate-900">Invoices</h3>
                        <div className="mt-3 overflow-x-auto">
                            <table className="w-full min-w-[540px] text-left text-sm">
                                <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-3 py-2">Invoice Number</th>
                                        <th className="px-3 py-2">Invoice Date</th>
                                        <th className="px-3 py-2">Vendor</th>
                                        <th className="px-3 py-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[selectedCase.invoice_1, selectedCase.invoice_2].filter(Boolean).map((invoice, index) => (
                                        <tr key={`${invoice.invoice_id ?? invoice.invoice_number ?? "invoice"}-${index}`} className="border-b border-slate-100 text-slate-700">
                                            <td className="px-3 py-2">{invoice.invoice_number ?? "-"}</td>
                                            <td className="px-3 py-2">{invoice.invoice_date ?? "-"}</td>
                                            <td className="px-3 py-2">{invoice.vendor_name ?? selectedCase.vendor ?? "-"}</td>
                                            <td className="px-3 py-2">{invoice.amount ?? "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        )}
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

function ModalInfo({ label, value }) {
    return (
        <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
            </div>
            <div className="mt-1 font-medium text-slate-900">{value ?? "-"}</div>
        </div>
    );
}