"use client";
import React, { useState, useMemo } from "react";
import { X, Check, FileSearch, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { submitCaseAction } from "@/app/lib/api";
// import { submitRecoveryAction } from "@/app/lib/api";
const statusBadgeClass = (status) => {
  switch (status) {
    case "Completed":
      return "bg-[#D1FAE5] text-[#10B981]";
    case "In Progress":
      return "bg-[#DBEAFE] text-[#2563EB]";
    case "Failed":
      return "bg-[#FEE2E2] text-[#EF4444]";
    default:
      return "bg-[#F1F5F9] text-[#64748B]";
  }
};

const formatDate = (value) => (value ? new Date(value).toLocaleString() : "-");

export const RecoveriesDetails = ({ recovery, stages, timeline, tabs }) => {
  const loggedInUser = useMemo(() => {
    if (typeof window === "undefined") return null;

    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);

  const userName = loggedInUser?.first_name || loggedInUser?.userName || "User";
// const [activeTab, setActiveTab] = useState("Overview");
  const [isDraftGenerated, setIsDraftGenerated] = useState(false);

  const selected = recovery ?? {};
  const progressStages = Array.isArray(stages) ? stages : [];
  const timelineEvents = Array.isArray(timeline) ? timeline : [];
  // const detailTabs = Array.isArray(tabs) ? tabs.map((tab) => tab.tab) : [];

  const isClosed = selected.status === "Completed";
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    if (action === "invalid" && !reason) {
      toast.error("Please select a reason code.");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Processing action...");
    try {
      const payload = {
        recoveryId: selected.recoveryId,
        action,
        reason_code: action === "invalid" ? reason : "",
        comments: "",
        performed_by: userName,
        actionedAt: new Date().toISOString(),
      };
      console.log("Submit Payload", payload);
      const response = await submitCaseAction(payload);
      console.log("API Response", response);
      toast.success("Action completed successfully", {
        id: toastId,
      });
    } catch (error) {
      console.error("submitCaseAction error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
        {
          id: toastId,
        },
      );
    } finally {
      setLoading(false);
    }
  };

  

  return (
    // <div className="w-full flex flex-col bg-white rounded-[16px] border border-[#D9E1EA] shadow-[0px_2px_8px_rgba(15,23,42,0.05)] overflow-hidden">
    <div className="w-full h-full flex flex-col bg-white rounded-[16px] border border-[#D9E1EA] shadow-[0px_2px_8px_rgba(15,23,42,0.05)] overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] leading-[22px] font-semibold text-[#0F172A]">
              {selected.recoveryId}
            </h2>

            <span
              className={`px-2 py-[2px] text-[10px] font-semibold rounded ${statusBadgeClass(
                selected.status,
              )}`}
            >
              {selected.status}
            </span>
          </div>

          <button
            className="text-[#64748B] hover:text-[#334155]"
            aria-label="Close recovery details"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-4 mt-3 border-b border-[#E5E7EB] overflow-x-auto"
          role="tablist"
        >
          {/* {detailTabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[12px] font-medium whitespace-nowrap ${
                activeTab === tab
                  ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                  : "text-[#475569]"
              }`}
            >
              {tab}
            </button>
          ))} */}

          <h5 className="pb-2 text-[12px] font-medium text-[#2563EB] border-b border-[#2563EB]">
            Overview
          </h5>
        </div>
      </div>

      {/* Overview */}
      <div className="px-4 pt-4 flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-2.5 text-[12px]">
          <MetaRow label="Recovery Type" value={selected.type} />
          <MetaRow
            label="Status"
            value={
              <span
                className={`px-2 py-[2px] rounded text-[10px] font-semibold ${statusBadgeClass(
                  selected.status,
                )}`}
              >
                {selected.status}
              </span>
            }
          />
          <MetaRow label="Vendor" value={selected.vendor || "-"} bold />
          <MetaRow label="Amount (USD)" value={selected.amount} bold />
          <MetaRow
            label="Recovered On"
            value={formatDate(selected.recoveredOn)}
          />
          <MetaRow
            label="Payment Date"
            value={formatDate(selected.paymentDate)}
          />
          <MetaRow
            label="Original Payment ID"
            value={
              <span className="text-[#2563EB] font-medium">
                {selected.originalPaymentId}
              </span>
            }
          />
          <MetaRow
            label="Investigator"
            value={selected.investigator ?? "Unassigned"}
          />
          <MetaRow label="Source System" value={selected.sourceSystem} />
          <MetaRow label="Recovery Method" value={selected.recoveryMethod} />
          <MetaRow label="Notes" value={selected.notes} />
        </div>

        {/* Recovery Progress */}
        <div className="mt-5">
          <div className="text-[11px] font-semibold tracking-wide text-[#64748B]">
            RECOVERY PROGRESS
          </div>

          <div className="mt-4 flex items-center">
            {progressStages.map((stage, index) => (
              <React.Fragment key={stage.stage}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isClosed ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                    }`}
                  >
                    {isClosed && <Check size={12} className="text-white" />}
                  </div>
                  <span className="mt-2 text-[10px] font-medium text-[#334155]">
                    {stage.stage}
                  </span>
                  <span className="text-[9px] text-[#94A3B8]">
                    {formatDate(stage.date)}
                  </span>
                </div>

                {index < progressStages.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-1 -mt-4 ${
                      isClosed ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <span className="sr-only">
            Recovery progress:{" "}
            {progressStages
              .map((stage) => `${stage.stage} (${stage.date})`)
              .join(", ")}
            .
          </span>
        </div>

        <div className="mt-2 mb-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
          <h3 className="text-sm font-semibold text-slate-900">
            Quick Actions
          </h3>

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
              onClick={() => handleAction("recovered")}
              className="flex flex-col items-center justify-center rounded-lg bg-emerald-600 py-2 text-white hover:bg-emerald-700"
            >
              <FileSearch size={18} />
              <span className="mt-1 text-xs font-medium">Recovered</span>
            </button>

            {/* Reject */}
            <button
              disabled={loading}
              onClick={() => handleAction("invalid")}
              className="flex flex-col items-center justify-center rounded-lg bg-rose-600 py-2 text-white hover:bg-rose-700"
            >
              <X size={18} />
              <span className="mt-1 text-xs font-medium">Invalid</span>
            </button>

            {/* Escalate */}
            <button
              disabled={loading}
              onClick={() => handleAction("adjusted internally")}
              className="flex flex-col items-center justify-center rounded-lg border border-amber-500 bg-white py-2 text-amber-600 hover:bg-amber-50"
            >
              <AlertTriangle size={18} />
              <span className="mt-1 text-xs font-medium">Adjusted Internally</span>
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Confirm requires a reason code. Invalid and Adjusted Internally do not.
          </p>
        </div>
        {/* Recovery Timeline */}
        <div className="mt-6 pb-4">
          {/* <div className="text-[11px] font-semibold tracking-wide text-[#64748B] mb-3">
            RECOVERY TIMELINE
          </div> */}

          <ol className="flex flex-col gap-3.5">
            {timelineEvents.map((event, index) => (
              <li
                key={`${event.event}-${event.timestamp}`}
                className="flex gap-2.5"
              >
                <div className="flex flex-col items-center">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] mt-1 shrink-0" />
                  {index < timelineEvents.length - 1 && (
                    <span className="w-px flex-1 bg-[#E2E8F0] mt-1" />
                  )}
                </div>

                <div className="flex-1 flex items-start justify-between gap-2 pb-1">
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-[#0F172A]">
                      {event.event}
                    </p>
                    <p className="text-[11px] text-[#64748B]">{event.actor}</p>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] whitespace-nowrap shrink-0">
                    {formatDate(event.timestamp)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

function MetaRow({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[#64748B]">{label}</span>
      <span
        className={`text-right text-[#0F172A] ${bold ? "font-semibold" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
