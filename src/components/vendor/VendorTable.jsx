// "use client";
// import React, { useMemo, useState } from "react";
// import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";

// const severityClass = (severity) => {
//   switch (severity) {
//     case "Critical":
//       return "bg-[#FEE2E2] text-[#EF4444]";
//     case "High":
//       return "bg-[#FEF3C7] text-[#F59E0B]";
//     case "Medium":
//       return "bg-[#DBEAFE] text-[#2563EB]";
//     case "Low":
//       return "bg-[#D1FAE5] text-[#10B981]";
//     default:
//       return "bg-[#F1F5F9] text-[#64748B]";
//   }
// };

// const severityDot = (severity) => {
//   switch (severity) {
//     case "Critical":
//       return "bg-[#EF4444]";
//     case "High":
//       return "bg-[#F59E0B]";
//     case "Medium":
//       return "bg-[#2563EB]";
//     case "Low":
//       return "bg-[#10B981]";
//     default:
//       return "bg-[#94A3B8]";
//   }
// };

// function FilterSelect({ label, children, ...props }) {
//   return (
//     <div>
//       <p className="text-[11px] font-semibold text-[#475569] mb-1.5">
//         {label}
//       </p>

//       <select
//         {...props}
//         className="w-full h-9 rounded-xl border border-[#D9E1EA] px-3 text-[12px] text-[#334155] bg-white"
//       >
//         {children}
//       </select>
//     </div>
//   );
// }

// export const VendorTable = ({ data, totalAlerts }) => {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [severityFilter, setSeverityFilter] = useState("All Severities");
//   const [typeFilter, setTypeFilter] = useState("All Types");
//   const [sourceFilter, setSourceFilter] = useState("All Sources");
//   const [dateFilter, setDateFilter] = useState("All Dates");
//   const pageSize = 10;

//   const alertData = useMemo(() => Array.isArray(data)
//     ? data.map((item) => {
//         const timestamp = new Date(item.timestamp);
//         return {
//           id: item.alertId,
//           dateTime: timestamp.toLocaleString(),
//           dateKey: Number.isNaN(timestamp.getTime()) ? "Unknown date" : timestamp.toLocaleDateString(),
//           severity: item.severity,
//           title: item.title,
//           subtitle: item.description,
//           type: item.alertType,
//           source: item.source,
//           assignedTo: item.assignedTo ?? "Unassigned",
//         };
//       })
//     : [], [data]);
//   const dateOptions = useMemo(() => [...new Set(alertData.map((item) => item.dateKey))], [alertData]);
//   const severityOptions = useMemo(() => [...new Set(alertData.map((item) => item.severity))], [alertData]);
//   const typeOptions = useMemo(() => [...new Set(alertData.map((item) => item.type))], [alertData]);
//   const sourceOptions = useMemo(() => [...new Set(alertData.map((item) => item.source))], [alertData]);

//   const filteredData = useMemo(() => {
//     return alertData.filter((item) => {
//       const matchesSearch = Object.values(item)
//         .join(" ")
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const matchesSeverity =
//         severityFilter === "All Severities" || item.severity === severityFilter;
//       const matchesType = typeFilter === "All Types" || item.type === typeFilter;
//       const matchesSource = sourceFilter === "All Sources" || item.source === sourceFilter;
//       const matchesDate = dateFilter === "All Dates" || item.dateKey === dateFilter;

//       return matchesSearch && matchesDate && matchesSeverity && matchesType && matchesSource;
//     });
//   }, [search, dateFilter, severityFilter, typeFilter, sourceFilter, alertData]);

//   const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
//   const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

//   const updateFilter = (setter) => (event) => {
//     setter(event.target.value);
//     setPage(1);
//   };

//   return (
//     <div className="col-span-12 lg:col-span-8 flex">
//       <div
//         className="
//           w-full
//           h-full
//           flex
//           flex-col
//           bg-white
//           rounded-[16px]
//           border
//           border-[#D9E1EA]
//           shadow-[0px_2px_8px_rgba(15,23,42,0.05)]
//           overflow-hidden
//         "
//       >
//         {/* Filters */}
//         <div className="px-4 py-4 border-b border-[#E2E8F0]">
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//             <FilterSelect label="Date Range" value={dateFilter} onChange={updateFilter(setDateFilter)}>
//               <option>All Dates</option>
//               {dateOptions.map((date) => <option key={date}>{date}</option>)}
//             </FilterSelect>

//             <FilterSelect
//               label="Severity"
//               value={severityFilter}
//               onChange={updateFilter(setSeverityFilter)}
//             >
//               <option>All Severities</option>
//               {severityOptions.map((severity) => <option key={severity}>{severity}</option>)}
//             </FilterSelect>

//             <FilterSelect
//               label="Alert Type"
//               value={typeFilter}
//               onChange={updateFilter(setTypeFilter)}
//             >
//               <option>All Types</option>
//               {typeOptions.map((type) => <option key={type}>{type}</option>)}
//             </FilterSelect>

//             <FilterSelect
//               label="Source"
//               value={sourceFilter}
//               onChange={updateFilter(setSourceFilter)}
//             >
//               <option>All Sources</option>
//               {sourceOptions.map((source) => <option key={source}>{source}</option>)}
//             </FilterSelect>
//           </div>

//           <div className="mt-3 flex items-center gap-3">
//             <div className="relative flex-1">
//               <Search
//                 size={14}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
//               />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) => {
//                   setSearch(event.target.value);
//                   setPage(1);
//                 }}
//                 placeholder="Search alerts..."
//                 className="w-full h-9 rounded-xl border border-[#D9E1EA] bg-white pl-9 pr-3 text-[12px] text-[#334155] placeholder:text-[#94A3B8] focus:outline-none"
//               />
//             </div>

           
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto flex-1 min-h-[420px]">
//           <table className="w-full">
//             <thead>
//               <tr className="h-[42px] border-b border-[#E2E8F0]">
//                 {[
//                   "DATE / TIME",
//                   "SEVERITY",
//                   "ALERT TITLE",
//                   "ALERT TYPE",
//                   "SOURCE",
//                   "ASSIGNED TO",
//                 ].map((item) => (
//                   <th
//                     key={item}
//                     className="
//                       px-4
//                       text-left
//                       text-[10px]
//                       font-bold
//                       uppercase
//                       tracking-[0.08em]
//                       text-[#64748B]
//                     "
//                   >
//                     {item}
//                   </th>
//                 ))}

//                 <th className="w-10" />
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedData.length === 0 ? (
//                 <tr><td colSpan={7} className="px-4 py-10 text-center text-[13px] text-[#94A3B8]">No matching alerts found.</td></tr>
//               ) : paginatedData.map((row) => (
//                 <tr
//                   key={row.id}
//                   className="h-[44px] border-b border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
//                 >
//                   <td className="px-4 text-[12px] text-[#64748B] whitespace-nowrap">
//                     {row.dateTime}
//                   </td>

//                   <td className="px-4">
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`w-2 h-2 rounded-full shrink-0 ${severityDot(
//                           row.severity
//                         )}`}
//                       />
//                       <span
//                         className={`px-2 py-[2px] rounded-md text-[10px] font-semibold ${severityClass(
//                           row.severity
//                         )}`}
//                       >
//                         {row.severity}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="px-4">
//                     <div className="text-[12px] font-medium text-[#0F172A]">
//                       {row.title}
//                     </div>
//                     {/* <div className="text-[11px] text-[#94A3B8]">
//                       {row.subtitle}
//                     </div> */}
//                   </td>

//                   <td className="px-4 text-[12px] text-[#334155] whitespace-nowrap">
//                     {row.type}
//                   </td>

//                   <td className="px-4 text-[12px] text-[#334155] whitespace-nowrap">
//                     {row.source}
//                   </td>

//                   <td className="px-4 text-[12px] text-[#334155] whitespace-nowrap">
//                     {row.assignedTo}
//                   </td>

//                   {/* <td className="pr-4">
//                     <MoreVertical size={15} className="text-[#94A3B8]" />
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="border-t border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
//           <div className="text-[12px] text-[#64748B]">
//             Showing {(page - 1) * pageSize + 1}–
//             {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} of {totalAlerts ?? filteredData.length} alerts
//           </div>

//           <div className="flex items-center gap-2">
//             <select className="h-7 rounded-lg border border-[#D9E1EA] px-2 text-[12px]" value={pageSize} disabled>
//               <option value={10}>10 rows per page</option>
//             </select>

//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="w-7 h-7 rounded-lg border border-[#D9E1EA] text-[#475569] disabled:opacity-40"
//             >
//               ‹
//             </button>

//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setPage(index + 1)}
//                 className={`w-7 h-7 rounded-lg text-[12px] font-medium ${
//                   page === index + 1
//                     ? "bg-[#2563EB] text-white"
//                     : "border border-[#D9E1EA] text-[#475569]"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="w-7 h-7 rounded-lg border border-[#D9E1EA] text-[#475569] disabled:opacity-40"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Download,
  DollarSign,
  FileText,
  Repeat2,
} from "lucide-react";

export default function DuplicatePaymentView() {
  const vendorData = [
    {
      vendorId: "7034512",
      vendorName: "ABC Solutions",
      status: "Active",
      risk: "High Risk",
      totalAmount: "$96.24K",
      issues: 8,

      summary: {
        invoices: 48,
        exceptions: 8,
        totalAmount: "$96,240",
        exceptionAmount: "$96,240",
      },

      deviations: [
        {
          title: "Currency Deviations",
          count: 5,
          icon: DollarSign,
        },
        {
          title: "Invoice No. Deviations",
          count: 3,
          icon: FileText,
        },
        {
          title: "Recurring Payment Deviations",
          count: 2,
          icon: Repeat2,
        },
      ],

      invoices: [
        {
          id: 1,
          posted: "2026-05-12",
          vendorId: "7034512",
          invoiceNo: "INV-2026-Q1-1001",
          docNo: "DOC-10265",
          invDate: "2026-05-12",
          amount: "$13,200",
          category: "High Corr.",
          risk: "High",
        },
      ],
    },

    {
      vendorId: "7056789",
      vendorName: "Global Supplies Inc.",
      status: "Active",
      risk: "High Risk",
      totalAmount: "$51.35K",
      issues: 4,

      summary: {
        invoices: 21,
        exceptions: 4,
        totalAmount: "$51,350",
        exceptionAmount: "$51,350",
      },

      deviations: [
        {
          title: "Currency Deviations",
          count: 2,
          icon: DollarSign,
        },
        {
          title: "Invoice No. Deviations",
          count: 1,
          icon: FileText,
        },
        {
          title: "Recurring Payment Deviations",
          count: 1,
          icon: Repeat2,
        },
      ],

      invoices: [
        {
          id: 2,
          posted: "2026-02-23",
          vendorId: "7056789",
          invoiceNo: "INV-2026-Q1-2001",
          docNo: "DOC-10497",
          invDate: "2026-02-23",
          amount: "$4,320",
          category: "Exact Match",
          risk: "High",
        },
      ],
    },
  ];

  const [selectedVendorId, setSelectedVendorId] = useState(
    vendorData[0].vendorId
  );

  const [search, setSearch] = useState("");

  const vendor =
    vendorData.find(
      (item) => item.vendorId === selectedVendorId
    ) || vendorData[0];

  const filteredInvoices = useMemo(() => {
    return vendor.invoices.filter((invoice) =>
      JSON.stringify(invoice)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [vendor, search]);

  return (
    <div className="grid mt-2 gap-4 lg:col-span-8 flex">
      {/* LEFT SIDE */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-8 px-5 overflow-x-auto">
            <button className="border-b-2 border-blue-600 py-4 text-sm font-semibold text-blue-600 whitespace-nowrap">
              Currency Deviations
            </button>

            <button className="py-4 text-sm font-semibold text-slate-500 whitespace-nowrap">
              Invoice Number Deviations
            </button>

            <button className="py-4 text-sm font-semibold text-slate-500 whitespace-nowrap">
              Recurring Payment Deviations
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr]">
          {/* Vendor Sidebar */}
          <div className="border-r bg-slate-50">
            <div className="border-b px-4 py-3 text-xs font-bold uppercase text-slate-500">
              Exception Vendors
            </div>

            {vendorData.map((item) => {
              const selected =
                selectedVendorId === item.vendorId;

              return (
                <button
                  key={item.vendorId}
                  onClick={() =>
                    setSelectedVendorId(item.vendorId)
                  }
                  className={`w-full border-b px-3 py-3 text-left transition-all ${
                    selected
                      ? "bg-white border-l-4 border-l-blue-600"
                      : "hover:bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 shrink-0">
                      {item.vendorName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-800">
                          {item.vendorId}
                        </p>

                        <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                          {item.issues} issues
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {item.vendorName}
                      </p>

                      <p className="mt-2 text-xs font-bold text-slate-800">
                        {item.totalAmount}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* TABLE */}
          <div>
            <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                Invoices with deviations
              </h3>

              <div className="relative w-full md:w-72">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search invoices"
                  className="h-10 w-full rounded-lg border border-slate-300 pl-10 text-sm outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b bg-slate-50">
                  <tr>
                    {[
                      "POSTED",
                      "VENDOR",
                      "INVOICE NO.",
                      "DOC NO.",
                      "INV DATE",
                      "AMOUNT",
                      "CATEGORY",
                      "RISK",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-4 text-left text-[11px] font-bold text-slate-700"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredInvoices.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 text-xs">
                        {row.posted}
                      </td>

                      <td className="px-4 py-4 text-xs font-semibold text-blue-600">
                        {row.vendorId}
                      </td>

                      <td className="px-4 py-4 text-xs">
                        {row.invoiceNo}
                      </td>

                      <td className="px-4 py-4 text-xs">
                        {row.docNo}
                      </td>

                      <td className="px-4 py-4 text-xs">
                        {row.invDate}
                      </td>

                      <td className="px-4 py-4 text-xs font-bold">
                        {row.amount}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded px-2 py-1 text-[10px] font-semibold ${
                            row.category === "Exact Match"
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {row.category}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600">
                          {row.risk}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredInvoices.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-8 text-center text-sm text-slate-500"
                      >
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4">
              <span className="text-xs text-slate-500">
                Showing {filteredInvoices.length} invoice(s)
              </span>

              <div className="flex gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded border">
                  <ChevronLeft size={14} />
                </button>

                <button className="h-8 w-8 rounded bg-blue-600 text-white">
                  1
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded border">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex justify-between border-b p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
              {vendor.vendorName
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Vendor {vendor.vendorId}
              </h3>

              <p className="text-xs text-slate-500">
                {vendor.vendorName}
              </p>

              <p className="mt-1 text-xs text-green-600">
                ● {vendor.status}
              </p>
            </div>
          </div>

          <span className="font-semibold text-red-500">
            {vendor.risk}
          </span>
        </div>

        <div className="flex gap-6 border-b px-5">
          <button className="border-b-2 border-blue-600 py-4 text-sm font-medium text-blue-600">
            Overview
          </button>

          <button className="py-4 text-sm text-slate-500">
            Deviations ({vendor.issues})
          </button>

          <button className="py-4 text-sm text-slate-500">
            Invoices ({vendor.summary.invoices})
          </button>

          <button className="py-4 text-sm text-slate-500">
            History
          </button>
        </div>

        <div className="space-y-3 p-5">
          {vendor.deviations.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Icon size={18} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.count} Detected
                  </p>

                  <p className="text-xs text-slate-400">
                    Last detected May 20, 2025
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="text-slate-400"
                />
              </div>
            );
          })}
        </div>

        <div className="mx-5 rounded-xl border p-5">
          <h3 className="mb-5 text-lg font-bold">
            SUMMARY
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-400">
                Total Invoices
              </p>
              <p className="text-2xl font-bold">
                {vendor.summary.invoices}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Open Exceptions
              </p>
              <p className="text-2xl font-bold text-red-500">
                {vendor.summary.exceptions}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Total Amount (USD)
              </p>
              <p className="text-2xl font-bold">
                {vendor.summary.totalAmount}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Exception Amount
              </p>
              <p className="text-2xl font-bold text-red-500">
                {vendor.summary.exceptionAmount}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_44px] gap-2 p-5">
          <button className="h-10 rounded-lg bg-blue-600 text-sm font-semibold text-white">
            View Exceptions
          </button>

          <button className="flex h-10 items-center justify-center gap-2 rounded-lg border">
            <Download size={15} />
            Download Receipt
          </button>

          <button className="flex h-10 items-center justify-center rounded-lg border">
            <ChevronDown size={15} />
          </button>
        </div>
      </aside>
    </div>
  );
}