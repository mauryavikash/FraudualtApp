"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function AuditTable({
  data = [],
  columns = [],
  loading = false,
  emptyMessage = "No matching records found.",
  initialPageSize = 10,
}) {
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const safeColumns = useMemo(() => (Array.isArray(columns) ? columns : []), [columns]);

  const table = useReactTable({
    data: safeData,
    columns: safeColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: initialPageSize,
      },
    },
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = safeData.length;
  const startItem = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-xs font-medium text-slate-600">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-200 bg-slate-50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={safeColumns.length || 1}
                  className="bg-slate-50/20 px-6 py-12 text-center text-sm font-normal text-slate-400"
                >
                  Loading audit data...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={safeColumns.length || 1}
                  className="bg-slate-50/20 px-6 py-12 text-center text-sm font-normal text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="group transition hover:bg-slate-50/80">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-6 py-3.5 align-middle"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 bg-white px-6 py-4 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {startItem} to {endItem} of {totalRows} items
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-50"
          >
            ‹
          </button>

          <span className="text-xs text-slate-500">
            Page {pageIndex + 1} of {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-50"
          >
            ›
          </button>

          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-[#0b57d0]"
          >
            {[5, 10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}