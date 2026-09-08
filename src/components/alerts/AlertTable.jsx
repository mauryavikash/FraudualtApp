"use client";
import React, { useMemo, useState } from "react";
import {MoreVertical} from "lucide-react";
export const AlertTable = () => {
   const [activeTab, setActiveTab] = useState("All Cases");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("All");
    const [caseTypeFilter, setCaseTypeFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const pageSize = 8;
    const TABS = [
      "All Cases",
      "Duplicate Cases",
      "Anomaly Cases",
      "Escalated Cases",
      "My Assignments",
      "Watchlist",
    ];
  
    const tableData = [
      {
        caseId: "INV-2025-000123",
        caseType: "Duplicate",
        priority: "High",
        status: "In Progress",
        vendor: "ABC Solutions",
        amount: "125,450.00",
        detectedOn: "May 20, 2025",
        slaDue: "May 24, 2025",
        remaining: "2 Days Left",
        investigator: "Sarah Johnson",
      },
      {
        caseId: "INV-2025-000122",
        caseType: "Anomaly",
        priority: "High",
        status: "In Progress",
        vendor: "Global Supplies Inc.",
        amount: "78,900.00",
        detectedOn: "May 20, 2025",
        slaDue: "May 23, 2025",
        remaining: "2 Days Left",
        investigator: "Michael Brown",
      },
      {
        caseId: "INV-2025-000121",
        caseType: "Duplicate",
        priority: "Medium",
        status: "Pending Review",
        vendor: "TechWorks LLC",
        amount: "42,600.00",
        detectedOn: "May 19, 2025",
        slaDue: "May 24, 2025",
        remaining: "2 Days Left",
        investigator: "Priya Nair",
      },
      {
        caseId: "INV-2025-000120",
        caseType: "Anomaly",
        priority: "High",
        status: "Escalated",
        vendor: "Alpha Traders",
        amount: "210,000.00",
        detectedOn: "May 19, 2025",
        slaDue: "May 22, 2025",
        remaining: "Overdue",
        investigator: "David Lee",
      },
      {
        caseId: "INV-2025-000119",
        caseType: "Duplicate",
        priority: "Low",
        status: "Open",
        vendor: "Office Needs Co.",
        amount: "12,350.00",
        detectedOn: "May 18, 2025",
        slaDue: "May 25, 2025",
        remaining: "2 Days Left",
        investigator: "Emma Wilson",
      },
       {
        caseId: "INV-2025-000118",
        caseType: "Duplicate",
        priority: "Low",
        status: "Open",
        vendor: "Office Needs Co.",
        amount: "12,350.00",
        detectedOn: "May 18, 2026",
        slaDue: "May 25, 2026",
        remaining: "2 Days Left",
        investigator: "Emma Wilson",
      },
       {
        caseId: "INV-2025-000117",
        caseType: "Duplicate",
        priority: "Low",
        status: "Open",
        vendor: "Office Needs Co.",
        amount: "12,350.00",
        detectedOn: "jun 18, 2026",
        slaDue: "jun 25, 2026",
        remaining: "2 Days Left",
        investigator: "Emma Wilson",
      },
       {
        caseId: "INV-2025-000116",
        caseType: "Duplicate",
        priority: "Low",
        status: "Open",
        vendor: "Office Needs Co.",
        amount: "12,350.00",
        detectedOn: "jul 18, 2026",
        slaDue: "jul 25, 2026",
        remaining: "2 Days Left",
        investigator: "Emma Wilson",
      },
    ];
  
    const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
  
      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;
  
      const matchesType =
        caseTypeFilter === "All" ||
        item.caseType === caseTypeFilter;
  
      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;
  
      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority
      );
    });
  }, [
    search,
    statusFilter,
    caseTypeFilter,
    priorityFilter,
  ]);
  
    const totalPages = Math.ceil(
      filteredData.length / pageSize
    );
  
    const paginatedData = filteredData.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
  
   const statusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-[#DBEAFE] text-[#2563EB]";
  
      case "Pending Review":
        return "bg-[#FDE7C7] text-[#F59E0B]";
  
      case "Escalated":
        return "bg-[#FEE2E2] text-[#EF4444]";
  
      case "Open":
        return "bg-[#D1FAE5] text-[#10B981]";
  
      default:
        return "";
    }
  };
  
  function FilterSelect({
    label,
    children,
    ...props
  }) {
    return (
      <div>
        <p className="text-[11px] font-semibold text-[#475569] mb-2">
          {label}
        </p>
  
        <select
          {...props}
          className="w-full h-9 rounded-xl border border-[#D9E1EA] px-3 text-[13px] text-[#334155]"
        >
          {children}
        </select>
      </div>
    );
  }
    const [selectedCase, setSelectedCase] = useState(tableData[0]);

  return (
     <div className="col-span-12 xl:col-span-8 flex">

          <div
            className="
              w-full
              h-full
              flex
              flex-col
              bg-white
              rounded-[20px]
              border
              border-[#D9E1EA]
              shadow-[0px_2px_8px_rgba(15,23,42,0.05)]
              overflow-hidden
          "
          >

            {/* Tabs */}

            <div className="px-5 pt-4 border-b border-[#E2E8F0]">
              <div className="flex gap-5">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[13px] font-medium transition-all ${
                      activeTab === tab
                        ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                        : "text-[#475569]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}

            <div className="px-5 py-4 border-b border-[#E2E8F0]">

              <div className="grid grid-cols-6 gap-3">

                <FilterSelect
                  label="Status"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>In Progress</option>
                  <option>Pending Review</option>
                  <option>Escalated</option>
                  <option>Open</option>
                </FilterSelect>

                <FilterSelect
                  label="Case Type"
                  value={caseTypeFilter}
                  onChange={(e) =>
                    setCaseTypeFilter(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>Duplicate</option>
                  <option>Anomaly</option>
                </FilterSelect>

                <FilterSelect
                  label="Priority"
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </FilterSelect>

                <FilterSelect label="Investigator">
                  <option>All</option>
                </FilterSelect>

                <FilterSelect label="Vendor">
                  <option>Select vendor</option>
                </FilterSelect>

                <div className="flex items-end gap-3">
                  <button className="h-9 px-4 rounded-xl border border-[#D9E1EA] text-[12px] font-medium text-[#475569]">
                    More Filters
                  </button>

                  <button
                    onClick={() => {
                      setStatusFilter("All");
                      setPriorityFilter("All");
                      setCaseTypeFilter("All");
                      setSearch("");
                    }}
                    className="text-[#2563EB] text-[12px] font-medium"
                  >
                    Reset
                  </button>
                </div>

              </div>
            </div>

            {/* TABLE */}

            <div className="overflow-x-auto flex-1 min-h-[520px]">

              <table className="w-full">

                <thead>

                  <tr className="h-[46px] border-b border-[#E2E8F0]">

                    <th className="w-12 px-5">
                      <input type="checkbox" />
                    </th>

                    {[
                      "CASE ID",
                      "CASE TYPE",
                      "PRIORITY",
                      "STATUS",
                      "VENDOR",
                      "AMOUNT (USD)",
                      "DETECTED ON",
                      "SLA DUE",
                      "INVESTIGATOR",
                    ].map((item) => (
                      <th
                        key={item}
                        className="
                        text-left
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-[#64748B]
                      "
                      >
                        {item}
                      </th>
                    ))}

                    <th />
                  </tr>

                </thead>

                <tbody>

                  {paginatedData.map((row) => (

                    <tr
                      key={row.caseId}
                      onClick={() => setSelectedCase(row)}
                      className={`
                        h-[58px]
                        border-b
                        border-[#E2E8F0]
                        hover:bg-[#F8FAFC]
                        cursor-pointer
                        transition-colors
                        ${
                          selectedCase.caseId === row.caseId
                            ? "bg-[#F8FAFC]"
                            : ""
                        }
                      `}
                    >

                      <td className="px-5">
                        <input type="checkbox" />
                      </td>

                      <td className="text-[12px] font-semibold text-[#2563EB]">
                        {row.caseId}
                      </td>

                      <td>
                        <span
                          className={`px-2.5 py-[2px] rounded-md text-[10px] font-semibold ${
                            row.caseType === "Duplicate"
                              ? "bg-[#F3E8FF] text-[#8B5CF6]"
                              : "bg-[#FDE7C7] text-[#F59E0B]"
                          }`}
                        >
                          {row.caseType}
                        </span>
                      </td>

                      <td>
                        <div className="flex items-center gap-2 text-[12px] text-[#334155]">

                          <span
                            className={`w-2 h-2 rounded-full ${
                              row.priority === "High"
                                ? "bg-red-500"
                                : row.priority === "Medium"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                          />

                          {row.priority}

                        </div>
                      </td>

                      <td>
                        <span
                          className={`px-2.5 py-[2px] rounded-md text-[10px] font-semibold ${statusClass(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td className="text-[12px] text-[#334155]">
                        {row.vendor}
                      </td>

                      <td className="text-[12px] font-semibold text-[#0F172A]">
                        {row.amount}
                      </td>

                      <td className="text-[12px] text-[#64748B]">
                        {row.detectedOn}
                      </td>

                      <td>
                        <div className="text-[12px] text-[#334155]">
                          {row.slaDue}
                        </div>

                        <div
                          className={`text-[10px] font-semibold ${
                            row.remaining === "Overdue"
                              ? "text-[#EF4444]"
                              : "text-[#F59E0B]"
                          }`}
                        >
                          {row.remaining}
                        </div>
                      </td>

                      <td className="text-[12px] text-[#64748B]">
                        {row.investigator}
                      </td>

                      <td className="pr-4">
                        <MoreVertical
                          size={15}
                          className="text-[#94A3B8]"
                        />
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Pagination */}

            <div className="border-t border-[#E2E8F0] px-5 py-3 flex items-center justify-between">

              <div className="text-[12px] text-[#64748B]">
                Showing {(page - 1) * pageSize + 1} to{" "}
                {Math.min(
                  page * pageSize,
                  filteredData.length
                )}
                {" "}of {filteredData.length} cases
              </div>

              <div className="flex items-center gap-2">

                <button className="w-7 h-7 rounded-lg border border-[#D9E1EA]">
                  ‹
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setPage(index + 1)
                    }
                    className={`w-7 h-7 rounded-lg text-[12px] font-medium ${
                      page === index + 1
                        ? "bg-[#2563EB] text-white"
                        : "border border-[#D9E1EA] text-[#475569]"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button className="w-7 h-7 rounded-lg border border-[#D9E1EA]">
                  ›
                </button>

                <select className="h-7 rounded-lg border border-[#D9E1EA] px-2 text-[12px]">
                  <option>10 / page</option>
                </select>

              </div>

            </div>

          </div>
        </div>
  );
};