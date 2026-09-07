import React from "react";

export default function ReconciliationStatusOverview({
  data = [
    { name: "Completed", count: 1032, percentage: 82.9, barColor: "bg-emerald-500" },
    { name: "In Progress", count: 145, percentage: 11.6, barColor: "bg-blue-500" },
    { name: "Pending Vendor Response", count: 43, percentage: 3.5, barColor: "bg-orange-400" },
    { name: "Failed / On Hold", count: 25, percentage: 2.0, barColor: "bg-red-500" },
  ],
}) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header Block */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Reconciliation Status Overview</h3>
        </div>

        {/* Data Rows Container */}
        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <div key={item.name} className="grid grid-cols-12 items-center gap-4 text-xs font-medium">
              
              {/* Status Name Label */}
              <div className="col-span-4 text-slate-600 truncate">
                {item.name}
              </div>

              {/* Counts Column */}
              <div className="col-span-2 text-slate-800 font-semibold text-right">
                {item.count.toLocaleString()}
              </div>

              {/* Percentage Column */}
              <div className="col-span-2 text-slate-400 text-right">
                {item.percentage}%
              </div>

              {/* Visual Horizontal Indicator Bar */}
              <div className="col-span-4 pl-2">
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.barColor}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Navigation Footer Link */}
      <div className="mt-6 border-t border-slate-100 pt-3">
        <button className="text-xs font-semibold text-blue-600 hover:underline">
          View Reconciliation List &gt;
        </button>
      </div>
    </div>
  );
}
