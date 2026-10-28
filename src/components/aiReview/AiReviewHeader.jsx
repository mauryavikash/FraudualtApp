import React from "react";

export const AiReviewHeader = ({ data }) => {
  const meta = data ?? {};

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
  return (
    <div className="contentHeader bg-white border border-[#D9E1EA] rounded-2xl shadow-[0px_2px_8px_rgba(15,23,42,0.05)] px-4 py-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-semibold text-[#0F172A]">
            AI-Powered AP Review Queue
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
              <div className="text-[11px] text-slate-500">Last Refreshed</div>

              <div className="text-[15px] font-semibold text-slate-800">
                {lastRefreshedAt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
