"use client";

import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const submissionData = [
  { id: 'APR-2026-00080', vendor: 'Prime Retail Ltd', stamp: '12 May 2026 02:30 PM', user: 'Rohit Mehta', type: 'Statement Reconciliation', amount: '$ 145,230.00', status: 'Pending Review' },
  { id: 'APR-2026-00079', vendor: 'QuickOffice Supplies', stamp: '12 May 2026 11:15 AM', user: 'Anita Verma', type: 'Missing Invoice', amount: '$ 9,850.00', status: 'In Progress' },
  { id: 'APR-2026-00078', vendor: 'Universal Traders', stamp: '11 May 2026 05:45 PM', user: 'Neha Sharma', type: 'Price Variance', amount: '$ 22,600.00', status: 'Pending Review' },
  { id: 'APR-2026-00077', vendor: 'Metro Components', stamp: '11 May 2026 03:20 PM', user: 'Rohit Mehta', type: 'Payment Difference', amount: '$ 18,750.00', status: 'Approved' },
  { id: 'APR-2026-00076', vendor: 'Secure Pack Pvt Ltd.', stamp: '10 May 2026 10:10 AM', user: 'Anita Verma', type: 'Credit Note', amount: '$ 7,450.00', status: 'Approved' },
];

export function RecentSubmissionsTable() {
  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'Request ID', cell: info => <span className="text-blue-600 font-medium cursor-pointer">{info.getValue()}</span> },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'stamp', header: 'Submitted On' },
    { accessorKey: 'user', header: 'Submitted By' },
    { accessorKey: 'type', header: 'Request Type' },
    { accessorKey: 'amount', header: 'Amount', cell: info => <span className="font-semibold text-slate-900">{info.getValue()}</span> },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: info => {
        const val = info.getValue();
        const theme = val === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : val === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200';
        return <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${theme}`}>{val}</span>;
      }
    },
  ], []);

  const table = useReactTable({ data: submissionData, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="font-bold text-slate-900 text-sm">Recent Submissions</h3>
        <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(h => (
                  <th key={h.id} className="p-3 font-semibold uppercase tracking-wider">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
