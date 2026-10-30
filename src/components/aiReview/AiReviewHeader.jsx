"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { assignAiReview } from "@/app/lib/api";
import { toast } from "sonner";
export const AiReviewHeader = ({ data, onSubmit }) => {
  const meta = data ?? {};

  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [status, setStatus] = useState("IDENTIFIED");
  const [isSaving, setIsSaving] = useState(false);

  const dataAsOf = meta?.dataAsOf
    ? new Date(meta.dataAsOf).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const lastRefreshedAt = meta?.lastRefreshedAt
    ? new Date(meta.lastRefreshedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const handleSubmit = async () => {
  setIsSaving(true);

  const toastId = toast.loading("Saving...");

  try {
    await assignAiReview({
      email,
      invoice_id: invoiceId,
      status,
    });

    toast.success("Action completed successfully", {
      id: toastId,
    });

    setShowAssignPopup(false);
    setEmail("");
    setInvoiceId("");
    setStatus("IDENTIFIED");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong",
      {
        id: toastId,
      }
    );
  } finally {
    setIsSaving(false);
  }
};

  return (
    <>
      <div className="contentHeader mb-4 rounded-2xl border border-[#D9E1EA] bg-white px-4 py-4 shadow-[0px_2px_8px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-semibold text-[#0F172A]">
              AI-Powered OCR/Posting Exceptions
            </h1>

            <p className="mt-1 text-[14px] text-[#64748B]">
              Prioritize and review invoices requiring AI-assisted human validation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="text-lg">📅</span>

              <div>
                <div className="text-[11px] text-slate-500">Data As Of</div>

                <div className="text-[15px] font-semibold text-slate-800">
                  {dataAsOf}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="text-lg">🔄</span>

              <div>
                <div className="text-[11px] text-slate-500">
                  Last Refreshed
                </div>

                <div className="text-[15px] font-semibold text-slate-800">
                  {lastRefreshedAt}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setEmail("");
                setInvoiceId("");
                setStatus("IDENTIFIED");
                setShowAssignPopup(true);
              }}
              className="h-8 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
            >
              + Assign/Review
            </button>
          </div>
        </div>
      </div>

      {showAssignPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="w-[450px] rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold">
                Assign / Review Invoice
              </h3>

              <button onClick={() => setShowAssignPopup(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-[12px] font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                className="h-10 w-full rounded-md border border-[#D0D5DD] px-3 outline-none focus:border-[#1565F9]"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-[12px] font-medium">
                Invoice ID
              </label>

              <input
                type="text"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                placeholder="Enter invoice ID"
                className="h-10 w-full rounded-md border border-[#D0D5DD] px-3 outline-none focus:border-[#1565F9]"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-[12px] font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 w-full rounded-md border border-[#D0D5DD] px-3 outline-none focus:border-[#1565F9]"
              >
                <option value="IDENTIFIED">IDENTIFIED</option>
                <option value="INVALID">INVALID</option>
              </select>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowAssignPopup(false)}
                className="rounded-md border px-4 py-2"
              >
                Cancel
              </button>

              <button
  disabled={!email.trim() || !invoiceId.trim() || isSaving}
  onClick={handleSubmit}
  className="cursor-pointer rounded-md bg-[#1565F9] px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-slate-300"
>
  {isSaving ? "Saving..." : "Submit"}
</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};