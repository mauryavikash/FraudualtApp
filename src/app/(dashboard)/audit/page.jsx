"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Check,
  CalendarDays,
  CircleDollarSign,
  FileText,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Upload,
  ChevronDown,
  Clock3,
  Building2,
  AlertCircle,
  MessageSquare,

} from "lucide-react";
import KpiCard from "../../../components/home/KpiCard";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
export default function VendorPage() {
  const [vendorMenuOpen, setVendorMenuOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const timeline = [
    {
      title: "Email Sent – Initial Request",
      desc: "Statement request for Jul 2026 sent to vendor",
      status: "Completed",
      date: "05 May 2026",
      time: "09:15 AM",
      color: "bg-green-500",
    },
    {
      title: "Supplier Response Received",
      desc: "Vendor responded with statement and comments",
      status: "Completed",
      date: "08 May 2026",
      time: "02:40 PM",
      color: "bg-blue-500",
    },
    {
      title: "AI Follow-up Generated",
      desc: "Missing invoice details identified",
      status: "Completed",
      date: "09 May 2026",
      time: "11:20 AM",
      color: "bg-purple-500",
    },
    {
      title: "Escalation Triggered",
      desc: "No response for pending items",
      status: "Active",
      date: "12 May 2026",
      time: "10:30 AM",
      color: "bg-orange-500",
    },
    {
      title: "Supporting Document Uploaded",
      desc: "Vendor uploaded supporting files",
      status: "Completed",
      date: "13 May 2026",
      time: "04:05 PM",
      color: "bg-cyan-500",
    },
    {
      title: "Final Confirmation Pending",
      desc: "Pending vendor confirmation",
      status: "Pending",
      date: "--",
      time: "--",
      color: "bg-slate-400",
    },
  ];

  const requests = [
    {
      id: "REQ-00124",
      type: "Missing Invoice",
      subject: "Invoice INV-10345 details missing",
      status: "Awaiting Response",
      owner: "Anita Verma",
      dueDate: "16 May 2026",
      priority: "High",
      daysPending: 2,
    },
    {
      id: "REQ-00125",
      type: "Payment Confirmation",
      subject: "Payment of $25,000 not reflected",
      status: "Awaiting Response",
      owner: "Rohit Mehta",
      dueDate: "15 May 2026",
      priority: "High",
      daysPending: 3,
    },
    {
      id: "REQ-00126",
      type: "Credit Note Clarification",
      subject: "Credit Note CN-2045 clarification",
      status: "In Progress",
      owner: "Anita Verma",
      dueDate: "18 May 2026",
      priority: "Medium",
      daysPending: 1,
    },
    {
      id: "REQ-00127",
      type: "Balance Confirmation",
      subject: "Confirm closing balance",
      status: "Pending",
      owner: "Rohit Mehta",
      dueDate: "20 May 2026",
      priority: "Low",
      daysPending: 5,
    },
  ];

  const templates = [
    { title: "Initial Statement Request", desc: "Request supplier statement for the period", icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Missing Invoice Request", desc: "Request details for missing invoices", icon: FileText, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Payment Confirmation", desc: "Confirm unapplied or mismatched payments", icon: CircleDollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Credit Note Clarification", desc: "Request clarification for credit notes", icon: ReceiptText, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Balance Confirmation", desc: "Request balance confirmation from vendor", icon: FileCheck2, color: "text-green-600", bg: "bg-green-50" },
  ];

  const compactTimeline = [
    { day: "05", month: "May", title: "Initial Request Sent", time: "09:15 AM", state: "done" },
    { day: "08", month: "May", title: "First Reminder Sent", time: "10:30 AM", state: "done" },
    { day: "12", month: "May", title: "Escalation Level 1", time: "10:30 AM", state: "active" },
    { day: "16", month: "May", title: "Escalation Level 2 (Planned)", time: "--", state: "pending" },
  ];

  const communications = [
    ["12 May 2026 10:30 AM", "Anita Verma", "abc.finance@abc.com", "Escalation – Pending Items", "Sent", "2"],
    ["09 May 2026 11:20 AM", "AI Agent", "abc.finance@abc.com", "Follow-up – Missing Invoices", "Sent", "1"],
    ["08 May 2026 02:40 PM", "abc.finance@abc.com", "Anita Verma", "Re: Statement for Jul 2026", "Received", "3"],
    ["05 May 2026 09:15 AM", "Anita Verma", "abc.finance@abc.com", "Statement Request – Jul 2026", "Sent", "1"],
  ];

  const statusBadge = (status) => {
  if (status === "Completed")
    return "bg-green-100 text-green-700";

  if (status === "Active")
    return "bg-orange-100 text-orange-700";

  if (status === "Pending")
    return "bg-blue-100 text-blue-700";

  return "bg-slate-100 text-slate-700";
};

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-3 text-slate-800 sm:p-4">
      <div className="mx-auto max-w-[1800px] space-y-3">

        {/* HEADER ACTIONS */}
        <div className="flex items-center justify-between gap-2">
          {/* Left Side Heading */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Communications
            </h1>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Change Vendor */}
            <div className="relative">
              <button
                onClick={() => {
                  setVendorMenuOpen(!vendorMenuOpen);
                  setActionsMenuOpen(false);
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
              >
                Change Vendor
                <ChevronDown size={12} />
              </button>

              {vendorMenuOpen && (
                <div className="absolute right-0 z-30 mt-1 w-44 rounded border border-slate-200 bg-white p-1 shadow-lg">
                  {[
                    "ABC Manufacturing Ltd.",
                    "Global Industrial Supply",
                    "Northstar Components",
                  ].map((vendor) => (
                    <button
                      key={vendor}
                      onClick={() => setVendorMenuOpen(false)}
                      className="block w-full cursor-pointer rounded px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {vendor}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="relative">
              <button
                onClick={() => {
                  setActionsMenuOpen(!actionsMenuOpen);
                  setVendorMenuOpen(false);
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded bg-[#0969c8] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
              >
                Actions
                <ChevronDown size={12} />
              </button>

              {actionsMenuOpen && (
                <div className="absolute right-0 z-30 mt-1 w-40 rounded border border-slate-200 bg-white p-1 shadow-lg">
                  {[
                    "Send Statement Request",
                    "Export Vendor View",
                    "Mark for Review",
                  ].map((action) => (
                    <button
                      key={action}
                      onClick={() => setActionsMenuOpen(false)}
                      className="block w-full cursor-pointer rounded px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* SIX HEADER CARDS */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          <KpiCard
            label="Vendor"
            value="ABC Manufacturing Ltd."
            change="Vendor ID: VND-100234"
            isTrendPositive={true}
            icon={Building2}
            iconColor="text-violet-600"
            iconBgColor="bg-violet-100"
          />

          <KpiCard
            label="Statement Period"
            value="Jul 2026"
            change="01 Jul 2026 - 31 Jul 2026"
            isTrendPositive={true}
            icon={CalendarDays}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />

          <KpiCard
            label="Reconciliation Status"
            value="65% Completed"
            change="In Progress"
            isTrendPositive={true}
            icon={Clock3}
            iconColor="text-cyan-600"
            iconBgColor="bg-cyan-100"
          />

          <KpiCard
            label="SLA Status"
            value="At Risk"
            change="Response due in 2 days"
            isTrendPositive={false}
            icon={AlertTriangle}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />

          <KpiCard
            label="Outstanding Exceptions"
            value="8"
            change="Value: $126,540.00"
            isTrendPositive={false}
            icon={AlertCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />

          <KpiCard
            label="Last Communication"
            value="12 May 2026"
            change="10:30 AM • Email Sent"
            isTrendPositive={true}
            icon={MessageSquare}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-100"
          />
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-12 gap-4">

          {/* TIMELINE */}
<div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
  <div className="mb-5 flex justify-between">
    <h2 className="text-sm font-semibold text-slate-900">
      Follow-up Timeline
    </h2>

    <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
      View All History
    </button>
  </div>

  <div className="space-y-4">
    {timeline.map((item, index) => (
      <div
        key={index}
        className="relative grid grid-cols-[32px_minmax(0,1fr)_95px_90px] items-start gap-2"
      >
        {index !== timeline.length - 1 && (
          <div className="absolute left-4 top-8 h-14 w-px bg-slate-200" />
        )}

        {/* Icon */}
        <div
          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color} text-white shadow-sm`}
        >
          <CheckCircle size={14} />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h4 className="break-words text-xs font-semibold leading-4 text-slate-700">
            {item.title}
          </h4>

          <p className="mt-1 break-words text-xs leading-4 text-slate-500">
            {item.desc}
          </p>
        </div>

        {/* Status Badge - Left Shifted & Full Width */}
        <div className="-ml-6 flex justify-start">
          <span
            className={`inline-flex min-w-[88px] items-center justify-center rounded px-2 py-1 text-xs font-semibold ${statusBadge(
              item.status
            )}`}
          >
            {item.status}
          </span>
        </div>

        {/* Date & Time */}
        <div className="text-right">
          <div className="text-xs font-medium leading-4 text-slate-500">
            {item.date}
          </div>

          <div className="mt-1 text-xs leading-4 text-slate-400">
            {item.time}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

          {/* TEMPLATES */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
            <div className="flex justify-between mb-5">
              <h2 className="text-sm font-semibold text-slate-900">
                Communication Templates
              </h2>

              <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                Manage Templates
              </button>
            </div>

            <div className="space-y-3">

              {templates.map(({ title, desc, icon: Icon, color, bg }) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-3 rounded border border-slate-200 bg-[#fbfcfe] px-3 py-2.5 transition hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded ${bg}`}>
                      <Icon size={15} className={color} strokeWidth={1.8} />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-700">
                        {title}
                      </div>

                      <div className="text-xs  text-slate-600">
                        {desc}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTemplate(title)}
                    className={`shrink-0 rounded border px-2 py-1 text-xs  font-semibold ${selectedTemplate === title ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                  >
                    {selectedTemplate === title ? "Selected" : "Use Template"}
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-3 flex w-full items-center justify-between border-t border-slate-200 pt-3 text-xs font-semibold text-blue-600 hover:text-blue-800">
              View All Templates <ArrowRight size={13} />
            </button>
          </div>

          
        </div>

        <div className="grid grid-cols-12 gap-4">
           {/* SLA */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            SLA Compliance
          </h3>

          <select className="cursor-pointer bg-transparent text-xs  font-medium text-slate-600 outline-none">
            <option>May 2025</option>
          </select>
        </div>

            <div className="flex items-center gap-6">
              <div className="relative h-[150px] w-[150px] shrink-0">
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">
                    95.6%
                  </span>

                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                    Compliant
                  </span>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Compliant", value: 95.6, count: 1176 },
                        { name: "At Risk", value: 3.2, count: 40 },
                        { name: "Breached", value: 1.2, count: 15 },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={54}
                      outerRadius={68}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#22c55e" stroke="none" />
                      <Cell fill="#f97316" stroke="none" />
                      <Cell fill="#ef4444" stroke="none" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-1 flex-col gap-3 text-xs ">
                <div className="flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <span className="text-slate-500">Compliant</span>
                  </div>

                  <span className="text-slate-800">
                    95.6%{" "}
                    <span className="font-normal text-slate-400">(1176)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: "#f97316" }}
                    />
                    <span className="text-slate-500">At Risk</span>
                  </div>

                  <span className="text-slate-800">
                    3.2%{" "}
                    <span className="font-normal text-slate-400">(40)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: "#ef4444" }}
                    />
                    <span className="text-slate-500">Breached</span>
                  </div>

                  <span className="text-slate-800">
                    1.2%{" "}
                    <span className="font-normal text-slate-400">(15)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <div>
              <h4 className="mb-2 text-sm font-semibold text-slate-700">
                Response Tracking
              </h4>

              <div className="grid grid-cols-[140px_minmax(0,1fr)] items-center gap-4">
                
                {/* Circular Progress */}
                <div className="relative h-32 w-32 shrink-0">
                  <svg
                    className="h-full w-full -rotate-90"
                    viewBox="0 0 120 120"
                    aria-label="92 percent response rate"
                  >
                    {/* Background Circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />

                    {/* Progress Circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 50 * (1 - 92 / 100)
                      }`}
                    />
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">
                      92%
                    </span>

                    <span className="text-center text-xs text-slate-600">
                      Response Rate
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs font-medium text-slate-600">
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span>Total Requests</span>
                    <span className="font-bold text-slate-800">24</span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span>Responded</span>
                    <span className="font-bold text-slate-800">22</span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span>Pending</span>
                    <span className="font-bold text-slate-800">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-700">Vendor Communication Score</div>
                <div className="mt-0.5 text-xs  text-slate-600">Based on last 6 months performance</div>
              </div>
              <div className="text-right">
                <div className="mb-1 inline-flex rounded bg-emerald-50 px-1.5 py-0.5 text-sm  font-semibold text-emerald-600">Good</div>
                <div className="text-base tracking-[0.18em] text-amber-400">★ ★ ★ ★ <span className="text-slate-300">☆</span>
                </div>
              </div>
            </div>

          </div>
          
        </div>

        {/* OPEN REQUESTS */}
        <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-12">
          <div className="flex items-center justify-between border-b border-slate-200 p-3 px-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Open Requests
              <span className="ml-2 rounded bg-blue-600 px-1.5 py-0.5 text-xs font-bold text-white">4</span>
            </h2>

            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-xs ">
              <thead className="bg-[#f8fafc] text-xs  uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2.5 text-left">Request ID</th>
                  <th className="px-3 py-2.5 text-left">Type</th>
                  <th className="px-3 py-2.5 text-left">Subject</th>
                  <th className="px-3 py-2.5 text-left">Status</th>
                  <th className="px-3 py-2.5 text-left">Owner</th>
                  <th className="px-3 py-2.5 text-left">Due Date</th>
                  <th className="px-3 py-2.5 text-left">Priority</th>
                  <th className="px-3 py-2.5 text-left">Days Pending</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 text-slate-600 transition hover:bg-blue-50/30">
                    <td className="px-3 py-2.5 font-semibold text-blue-600">
                      {row.id}
                    </td>
                    <td className="px-3 py-2.5">{row.type}</td>
                    <td className="px-3 py-2.5 text-slate-700">{row.subject}</td>
                    <td className="px-3 py-2.5"><span className="rounded bg-blue-50 px-2 py-1 text-xs  font-semibold text-blue-700">{row.status}</span></td>
                    <td className="px-3 py-2.5">{row.owner}</td>
                    <td className={`px-3 py-2.5 ${row.priority === "High" ? "font-semibold text-red-500" : ""}`}>{row.dueDate}</td>
                    <td className="px-3 py-2.5"><span className={`rounded px-2 py-1 text-xs  font-semibold ${row.priority === "High" ? "bg-red-50 text-red-600" : row.priority === "Medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{row.priority}</span></td>
                    <td className="px-3 py-2.5">{row.daysPending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-12">
            <div className="mb-3 flex justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Recent Communications
              </h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>

            <table className="w-full min-w-[680px] text-xs ">
              <thead className="bg-[#f8fafc] text-xs  uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-2 py-2 text-left">Date & Time</th>
                  <th className="px-2 py-2 text-left">From</th>
                  <th className="px-2 py-2 text-left">To</th>
                  <th className="px-2 py-2 text-left">Subject</th>
                  <th className="px-2 py-2 text-left">Status</th>
                  <th className="px-2 py-2 text-left">Attachments</th>
                </tr>
              </thead>

              <tbody>
                {communications.map(([date, from, to, subject, status, attachments]) => (
                  <tr key={`${date}-${subject}`} className="border-t border-slate-100 text-slate-600">
                    <td className="px-2 py-2.5">{date}</td>
                    <td className="px-2 py-2.5">{from}</td>
                    <td className="px-2 py-2.5">{to}</td>
                    <td className="px-2 py-2.5 text-slate-700">{subject}</td>
                    <td className={`px-2 py-2.5 font-semibold ${status === "Received" ? "text-blue-600" : "text-emerald-600"}`}>{status}</td>
                    <td className="px-2 py-2.5">{attachments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-sm font-semibold text-slate-900">Follow-up Timeline</h2>
                      <button className="text-xs  font-semibold text-blue-600 hover:text-blue-800">View Calendar</button>
                    </div>
                    <div className="relative space-y-3">
                      <div className="absolute bottom-2 left-[31px] top-2 w-px bg-slate-200" />
                      {compactTimeline.map((item) => (
                        <div key={item.title} className="relative z-10 grid grid-cols-[30px_10px_1fr_auto] items-center gap-2">
                          <div className="text-center leading-none">
                            <div className={`text-xs font-bold ${item.state === "active" ? "text-orange-500" : "text-slate-600"}`}>{item.day}</div>
                            <div className="text-xs  text-slate-400">{item.month}</div>
                          </div>
                          <div className={`h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm ${item.state === "done" ? "bg-emerald-500" : item.state === "active" ? "bg-orange-500" : "bg-slate-300"}`} />
                          <div className={`text-xs font-semibold ${item.state === "active" ? "text-slate-800" : "text-slate-600"}`}>{item.title}</div>
                          <div className="flex items-center gap-1 text-xs  text-slate-400">
                            {item.time}
                            {item.state === "done" && <Check size={12} className="text-emerald-500" />}
                            {item.state === "active" && <Clock3 size={12} className="text-orange-500" />}
                            {item.state === "pending" && <Clock3 size={12} className="text-slate-400" />}
                          </div>
                        </div>
                      ))}
                    </div>
          </div>
           <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-3">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button className="flex cursor-pointer w-full items-center justify-center gap-2 rounded bg-[#0969c8] py-2 text-xs  font-semibold text-white shadow-sm transition hover:bg-[#0759aa]">
                <Mail size={16} />
                Send Email
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs  font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                <Phone size={16} />
                Log Phone Call
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs  font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                <Upload size={16} />
                Upload Document
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs  font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                <ArrowRight size={16} />
                Create Follow-up Task
              </button>
            </div>
          </div>
          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Notes
            </h2>
            <textarea
              value={note}
              onChange={(event) => { setNote(event.target.value); setNoteSaved(false); }}
              className="h-24 w-full resize-none rounded border border-slate-200 bg-[#fbfcfe] p-3 text-xs  text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Add your notes..."
            />
            <button
              onClick={() => setNoteSaved(true)}
              className="mt-2 w-full cursor-pointer rounded bg-[#0969c8] py-2 text-xs  font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
            >
              {noteSaved ? "Note Saved" : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}