"use client";

import React, { useState, useEffect,useMemo } from "react";
import { createPortal } from "react-dom";
import {
  ChevronRight,
  DollarSign,
  FileText,
  Repeat2,
  X,
  Eye,
  FileSearch,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
// import { submitCaseAction } from "@/app/lib/api";
import { submitVendorAction } from "@/app/lib/api";
const deviationVisuals = {
  currency: {
    icon: DollarSign,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  invoice: {
    icon: FileText,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  recurring: {
    icon: Repeat2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

export default function VendorInsight({ vendor }) {
 const loggedInUser = useMemo(() => {
  if (typeof window === "undefined") return null;

  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
 }, []);

 const userName =
  loggedInUser?.first_name ||
  loggedInUser?.userName ||
  "User";

  const [activeTab, setActiveTab] = useState("overview");
  const [isExceptionsOpen, setIsExceptionsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setCurrentPage(1);
  }, [vendor?.vendorId]);

  const pageSize = 5;
  if (!vendor) return null;

  const handleAction = async (action) => {
    if (action === "approve" && !reason) {
      toast.error("Please select a reason code.");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Processing action...");
    try {
      const payload = {
        vendorId:vendor?.vendorId,
        action,
        reason_code: action === "approve" ? reason : "",
        comments: "",
        performed_by: userName,
        actionedAt: new Date().toISOString(),
      };
      console.log("Submit Payload", payload);
      const response = await submitVendorAction(payload);
      console.log("API Response", response);
      toast.success("Action completed successfully", {
        id: toastId,
      });
    } catch (error) {
      console.error("submitVendorAction error:", error);
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

  const initials = vendor.vendorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  const exceptionInvoices = (vendor.invoices ?? []).filter(
    (invoice) => invoice.deviation,
  );
  console.log("exceptionInvoices", exceptionInvoices);
  const totalPages = Math.ceil(exceptionInvoices.length / pageSize);

  const paginatedInvoices = exceptionInvoices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const openInvoiceImage = (imageUrl) => {
    if (!imageUrl) return;

    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
      {/* HEADER */}
      <header className="flex items-start justify-between border-b border-slate-300 p-4">
        <div className="flex gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
            {initials}
          </span>

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Vendor {vendor.vendorId}
            </h2>

            <p className="text-[10px] text-slate-500">{vendor.vendorName}</p>

            <p className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {vendor.status}
            </p>
          </div>
        </div>

        <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold text-rose-600">
          {vendor.risk}
        </span>
      </header>

      <div className="border border-slate-300 overflow-hidden p-4">
        <div className="max-h-[220px] overflow-auto">
          <table className="w-full min-w-[1100px] text-[10px]">
            <thead className="sticky top-0 bg-cyan-500 text-white z-10">
              <tr>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Posted
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Vendor
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Invoice No.
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Doc No.
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Inv Date
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Amount
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Category
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  Cost Center
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">
                  GL Account
                </th>
                <th className="px-2 py-1 text-left whitespace-nowrap">Risk</th>
                <th className="px-2 py-1 text-left whitespace-nowrap">Text</th>
              </tr>
            </thead>

            <tbody>
              {paginatedInvoices.map((invoice, index) => (
                <tr
                  key={`${vendor.vendorId}-${invoice.id}-${index}`}
                  className="border-b border-slate-100 text-[10px] text-slate-700 hover:bg-slate-50"
                >
                  <td className="px-2 py-1 whitespace-nowrap">
                    {invoice.posted ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    {vendor.vendorName ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>
                        {invoice.invoiceNo ?? invoice.invoice_no ?? "-"}
                      </span>

                      {invoice.invoice_image_url && (
                        <button
                          type="button"
                          title="View Invoice"
                          onClick={() =>
                            openInvoiceImage(invoice.invoice_image_url)
                          }
                          className="text-slate-500 hover:text-blue-600"
                        >
                          <Eye size={12} />
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    {invoice.docNo ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    {invoice.invDate ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap font-semibold">
                    {invoice.amount ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    {invoice.category ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    {invoice.costCenter ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    {invoice.glAccount ?? "-"}
                  </td>

                  <td className="px-2 py-1 whitespace-nowrap">
                    <span className="rounded bg-red-50 px-1 py-[1px] text-[9px] font-medium text-red-600">
                      {invoice.risk ?? "-"}
                    </span>
                  </td>

                  <td
                    className="px-2 py-1 max-w-[180px] truncate"
                    title={invoice.text}
                  >
                    {invoice.text ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 border-t bg-white p-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded border px-1 py-1 text-[10px] disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-[10px] font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded border px-1 py-1 text-[10px] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* TABS */}
      <nav
        className="flex gap-4 overflow-x-auto border-b border-slate-300 px-4"
        aria-label="Vendor details"
      >
        {[
          ["overview", "Overview"],
          // ["deviations", `Deviations (${vendor.issues})`],
          // ["invoices", `Invoices (${vendor.summary.invoices})`],
          // ["history", "History"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`shrink-0 border-b-2 py-3 text-[10px] font-medium ${
              activeTab === id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <div className="space-y-4 p-4">
        {activeTab === "overview" && (
          <>
            <div className="">
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Vendor ID
                  </p>
                  <p className="text-[10px] font-semibold text-slate-800">
                    {vendor.vendorId ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Vendor Name
                  </p>
                  <p className="text-[10px] font-semibold text-slate-800 break-words">
                    {vendor.vendorName ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Status
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600">
                    {vendor.status ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">Risk</p>
                  <p className="text-[10px] font-semibold text-rose-600">
                    {vendor.risk ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Issues
                  </p>
                  <p className="text-[10px] font-semibold text-slate-800">
                    {vendor.issues ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Total Amount
                  </p>
                  <p className="text-[10px] font-semibold text-slate-800">
                    {vendor.totalAmount ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Total Invoices
                  </p>
                  <p className="text-[10px] font-semibold text-slate-800">
                    {vendor.summary?.invoices ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Open Exceptions
                  </p>
                  <p className="text-[10px] font-semibold text-red-600">
                    {vendor.summary?.exceptions ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Summary Amount
                  </p>
                  <p className="text-[10px] font-semibold text-slate-800">
                    {vendor.summary?.totalAmount ?? "$0.00"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium text-slate-500">
                    Exception Amount
                  </p>
                  <p className="text-[10px] font-semibold text-red-600">
                    {vendor.summary?.exceptionAmount ?? "$0.00"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab !== "overview" && (
          <p className="py-12 text-center text-xs text-slate-500">
            Select a deviation category in the table to review {activeTab}.
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-auto grid grid-cols-[1fr_1fr_34px] gap-2 border-t border-slate-300 p-4">
        <button
          type="button"
          onClick={() => setIsExceptionsOpen(true)}
          className="h-8 rounded-md bg-blue-600 text-[10px] font-semibold text-white hover:bg-blue-700"
        >
          View Exceptions
        </button>
      </div>

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
            <span className="mt-1 text-xs font-medium">Approve</span>
          </button>

          {/* Reject */}
          <button
            disabled={loading}
            onClick={() => handleAction("reject")}
            className="flex flex-col items-center justify-center rounded-lg bg-rose-600 py-2 text-white hover:bg-rose-700"
          >
            <X size={18} />
            <span className="mt-1 text-xs font-medium">Reject</span>
          </button>

          {/* Escalate */}
          <button
            disabled={loading}
            onClick={() => handleAction("escalate")}
            className="flex flex-col items-center justify-center rounded-lg border border-amber-500 bg-white py-2 text-amber-600 hover:bg-amber-50"
          >
            <AlertTriangle size={18} />
            <span className="mt-1 text-xs font-medium">Escalate</span>
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Confirm requires a reason code. Reject and Escalate do not.
        </p>
      </div>

      {isExceptionsOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="presentation"
            onClick={() => setIsExceptionsOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4"
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="vendor-exceptions-title"
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl"
            >
              <header className="flex justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Vendor exceptions
                  </p>

                  <h2
                    id="vendor-exceptions-title"
                    className="mt-1 text-lg font-semibold text-slate-900"
                  >
                    {vendor.vendorName}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Close vendor exceptions"
                    onClick={() => setIsExceptionsOpen(false)}
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <X size={20} />
                  </button>
                </div>
              </header>

              <div className="max-h-[60vh] overflow-auto p-5">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="border-b bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Posted</th>
                      <th className="px-3 py-2">Vendor</th>
                      <th className="px-3 py-2">Invoice No.</th>
                      <th className="px-3 py-2">Doc No.</th>
                      <th className="px-3 py-2">Inv Date</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Category</th>
                      <th className="px-3 py-2">Cost Center</th>
                      <th className="px-3 py-2">GL Account</th>
                      <th className="px-3 py-2">Risk</th>
                      <th className="px-3 py-2">Text</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exceptionInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-slate-100 text-slate-700"
                      >
                        <td className="px-3 py-3">{invoice.posted ?? "-"}</td>

                        <td className="px-3 py-3">
                          {vendor.vendorName ?? "-"}
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span>
                              {invoice.invoiceNo ?? invoice.invoice_no ?? "-"}
                            </span>

                            {invoice.invoice_image_url && (
                              <button
                                type="button"
                                title="View Invoice Image"
                                onClick={() =>
                                  openInvoiceImage(invoice.invoice_image_url)
                                }
                                className="text-slate-500 hover:text-blue-600"
                              >
                                <Eye size={16} />
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="px-3 py-3">{invoice.docNo ?? "-"}</td>

                        <td className="px-3 py-3">{invoice.invDate ?? "-"}</td>

                        <td className="px-3 py-3 font-semibold">
                          {invoice.amount ?? "-"}
                        </td>

                        <td className="px-3 py-3">{invoice.category ?? "-"}</td>

                        <td className="px-3 py-3">
                          {invoice.costCenter ?? "-"}
                        </td>

                        <td className="px-3 py-3">
                          {invoice.glAccount ?? "-"}
                        </td>

                        <td className="px-3 py-3">{invoice.risk ?? "-"}</td>

                        <td className="px-3 py-3 min-w-[250px]">
                          {invoice.text ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {exceptionInvoices.length === 0 && (
                  <p className="py-10 text-center text-sm text-slate-500">
                    No exceptions found for this vendor.
                  </p>
                )}
              </div>
            </section>
          </div>,
          document.body,
        )}
    </aside>
  );
}
