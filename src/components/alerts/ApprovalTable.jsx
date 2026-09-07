"use client";

import React, { useMemo } from 'react';
// import Link from 'next/next'; 
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const tableData = [
  { id: 'APR-2026-00081', vendor: 'ABC Manufacturing Ltd.', period: 'Jul 2026', type: 'Statement Reconciliation', status: 'In Progress', amount: '$ 245,780.00', priority: 'High', date: '15 May 2026', user: 'Rohit Mehta' },
  { id: 'APR-2026-00082', vendor: 'Global Supplies Inc.', period: 'Jul 2026', type: 'Price Variance', status: 'Pending Review', amount: '$ 82,450.00', priority: 'High', date: '15 May 2026', user: 'Anita Verma' },
  { id: 'APR-2026-00083', vendor: 'Tech Solutions Pvt Ltd.', period: 'Jul 2026', type: 'Missing Invoice', status: 'In Progress', amount: '$ 54,300.00', priority: 'Medium', date: '16 May 2026', user: 'Neha Sharma' },
  { id: 'APR-2026-00084', vendor: 'Office Essentials Co.', period: 'Jul 2026', type: 'Credit Note', status: 'Pending Review', amount: '$ 12,500.00', priority: 'Medium', date: '16 May 2026', user: 'Rohit Mehta' },
  { id: 'APR-2026-00085', vendor: 'Industrial Parts Ltd.', period: 'Jul 2026', type: 'Quantity Variance', status: 'In Progress', amount: '$ 67,850.00', priority: 'Low', date: '17 May 2026', user: 'Anita Verma' },
  { id: 'APR-2026-00086', vendor: 'Blue Star Logistics', period: 'Jul 2026', type: 'Payment Difference', status: 'Pending Review', amount: '$ 32,120.00', priority: 'Low', date: '17 May 2026', user: 'Neha Sharma' },
];

export function ApprovalTable() {
  const columns = useMemo(() => [
    { 
      accessorKey: 'id', 
      header: 'Request ID', 
      cell: info => (
        <span className="text-blue-600 font-medium hover:underline cursor-pointer">
          {info.getValue()}
        </span>
      ) 
    },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'period', header: 'Statement Period' },
    { accessorKey: 'type', header: 'Request Type' },
    { 
      accessorKey: 'status', 
      header: 'Reconciliation Status',
      cell: info => {
        const val = info.getValue();
        const theme = val === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200';
        return <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${theme}`}>{val}</span>;
      }
    },
    { accessorKey: 'amount', header: 'Total Amount', cell: info => <span className="font-semibold text-slate-900">{info.getValue()}</span> },
    { 
      accessorKey: 'priority', 
      header: 'Priority',
      cell: info => {
        const val = info.getValue();
        const theme = val === 'High' ? 'text-red-600 bg-red-50' : val === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-slate-500 bg-slate-100';
        return <span className={`px-2 py-0.5 rounded text-xs font-bold ${theme}`}>{val}</span>;
      }
    },
    { accessorKey: 'date', header: 'Due Date' },
    { accessorKey: 'user', header: 'Submitted By' },
  ], []);

  const table = useReactTable({ data: tableData, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900 text-sm">Pending Approvals</h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">8</span>
        </div>
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
