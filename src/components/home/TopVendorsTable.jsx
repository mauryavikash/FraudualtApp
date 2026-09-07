import React from "react";
import CompactDataTable from "@/components/ui/table/CompactDataTable";

export default function TopVendorsTable({ data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "vendor",
        header: "Vendor",
        cell: (info) => (
          <span className="font-semibold text-slate-800">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "open",
        header: "Open",
      },
      {
        accessorKey: "overdue",
        header: "Overdue",
        cell: (info) => (
          <span className="font-medium text-red-500">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "days",
        header: ">10 Days",
      },
      {
        accessorKey: "avgTime",
        header: "Avg Days",
      },
    ],
    []
  );

  return (
    <CompactDataTable
      title="Top 5 Vendors by Open Exceptions"
      subtitle="Overview of vendors with the highest open exception volume."
      data={data}
      columns={columns}
      footerActionText="View All Vendors >"
    />
  );
}