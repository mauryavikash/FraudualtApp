import React from "react";
import CompactDataTable from "@/components/ui/table/CompactDataTable";

export default function AnalystWorkloadTable({ data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "analyst",
        header: "Analyst",
        cell: (info) => {
          const name = info.getValue();
          const initials = name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${info.row.original.avatarColor} text-[10px] font-bold text-white`}
              >
                {initials}
              </div>
              <span className="font-semibold text-slate-800">{name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "progress",
        header: "In Progress",
      },
      {
        accessorKey: "open",
        header: "Open",
      },
      {
        accessorKey: "completed",
        header: "Completed",
        cell: (info) => (
          <span className="font-medium text-slate-700">{info.getValue()}</span>
        ),
      },
    ],
    []
  );

  return (
    <CompactDataTable
      title="Analyst Workload"
      subtitle="Current workload distribution across reconciliation analysts."
      data={data}
      columns={columns}
      footerActionText="View All Analysts >"
    />
  );
}