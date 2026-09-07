"use client";

import { useState } from "react";
import {
  ChevronRight,
  Settings,
  Shield,
  Zap,
  Users,
  MessageSquare,
  Gauge,
  Database,
  Workflow,
  AlertCircle,
  CheckCircle,
  ScanLine,
  Copy,
  Clock,
  Clock3,
  FlaskConical,
  Plus,
  Pencil,
  BadgeAlert,
  Trash2,
  CopyCheck,
  ClipboardCheck,
  MailSearch,
  FileSearch,
  FileWarning,
  FileText,
  UserRound,
  Settings2,
  TriangleAlert,
  FileKey2,
  ClipboardList,
  ShieldCheck, 
  Bot, 
  UsersRound, 
  ChevronDown, 

} from "lucide-react";
import KpiCard from "../../../components/home/KpiCard";
export default function SettingsPage() {
  const [expandedSection, setExpandedSection] = useState("ai-config");
 const kpiData = [
  {
    label: "Active Reconciliation Rules",
    value: "156",
    change: "↑ 12 this month",
    icon: <Bot className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "AI Models Configured",
    value: "8",
    change: "↑ 1 this month",
    icon: <Settings2 className="h-6 w-6 text-blue-600" />,
    bg: "bg-blue-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "Vendor Profiles",
    value: "1,248",
    change: "↑ 28 this month",
    icon: <UsersRound className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "Automation Coverage",
    value: "91%",
    change: "↑ 6% vs last month",
    icon: <Gauge className="h-6 w-6 text-green-600" />,
    bg: "bg-green-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "Approval Workflows",
    value: "24",
    change: "No change",
    icon: <ClipboardCheck className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    valueColor: "text-slate-900",
    changeColor: "text-slate-500",
  },
  {
    label: "Security Policies",
    value: "Healthy",
    change: "All policies active",
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
    bg: "bg-green-100",
    valueColor: "text-green-600",
    changeColor: "text-slate-500",
  },
  ];
  const vendorItems = [
    {
      title: "Vendor Master Sync",
      description: "Sync vendor data from ERP",
      icon: Database,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Risk Scoring Setup",
      description: "Configure vendor risk parameters",
      icon: Shield,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      title: "Communication Preferences",
      description: "Set vendor communication channels",
      icon: MessageSquare,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Statement Format Mapping",
      description: "Map vendor statement formats",
      icon: FileText,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Portal Access Settings",
      description: "Manage vendor portal access",
      icon: Settings,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];
  const slaItems = [
    {
      label: "Open Exception",
      days: "Day 0",
      dot: "bg-green-500",
    },
    {
      label: "Reminder 1",
      days: "2 Days",
      dot: "bg-blue-600",
    },
    {
      label: "Reminder 2",
      days: "5 Days",
      dot: "bg-blue-600",
    },
    {
      label: "Escalation L1",
      days: "7 Days",
      dot: "bg-orange-500",
    },
    {
      label: "Escalation L2",
      days: "10 Days",
      dot: "bg-orange-500",
    },
    {
      label: "Management Escalation",
      days: "15 Days",
      dot: "bg-red-500",
    },
  ];

  const integrations = [
  {
    name: "SAP S/4HANA",
    logo: "SAP",
    logoClass: "bg-blue-600 text-white",
  },
  {
    name: "Oracle ERP Cloud",
    logo: "O",
    logoClass: "bg-red-500 text-white",
  },
  {
    name: "Coupa",
    logo: "C",
    logoClass: "bg-sky-500 text-white",
  },
  {
    name: "Ariba Network",
    logo: "A",
    logoClass: "bg-amber-500 text-white",
  },
  {
    name: "Microsoft Teams",
    logo: "T",
    logoClass: "bg-indigo-600 text-white",
  },
  {
    name: "Outlook",
    logo: "O",
    logoClass: "bg-blue-500 text-white",
  },
  ];
  const templateData = [
  { label: "Initial Statement Request", count: 8 },
  { label: "Missing Invoice Request", count: 5 },
  { label: "Credit Memo Clarification", count: 6 },
  { label: "Payment Confirmation", count: 4 },
  { label: "Balance Confirmation", count: 5 },
  { label: "Escalation Notice", count: 3 },
  ];
  // Chart Data
  const chartData = [
    { time: "12 AM", accuracy: 92, resolution: 88 },
    { time: "3 AM", accuracy: 94, resolution: 90 },
    { time: "6 AM", accuracy: 91, resolution: 87 },
    { time: "9 AM", accuracy: 96, resolution: 93 },
    { time: "12 PM", accuracy: 98, resolution: 95 },
    { time: "3 PM", accuracy: 97, resolution: 94 },
    { time: "6 PM", accuracy: 95, resolution: 92 },
    { time: "9 PM", accuracy: 93, resolution: 89 },
  ];



const [confidence, setConfidence] = useState(85);

const [settings, setSettings] = useState({
  "Auto Resolution": true,
  "Learning Mode": true,
  "Escalation Intelligence": true,
  "Root Cause Analysis": true,
  "Predictive Exception Detection": true,
});

  const configSections = [
    {
      id: "ai-config",
      title: "1. AI Agent Configuration",
      icon: <Zap className="w-5 h-5" />,
      items: [
        { label: "Confidence Threshold", value: "85%" },
        { label: "Auto Resolution", enabled: true },
        { label: "Learning Mode", enabled: true },
        { label: "Exception Handling", enabled: true },
        { label: "Root Cause Analysis", enabled: true },
        { label: "Predictive Exception Detection", enabled: true },
      ],
      actionText: "View All Agent Settings",
    },
    {
      id: "reconciliation",
      title: "2. Reconciliation Rules Management",
      icon: <Settings className="w-5 h-5" />,
      hasTable: true,
    },
    {
      id: "exception",
      title: "3. Exception Configuration",
      icon: <AlertCircle className="w-5 h-5" />,
      grid: true,
    },
    {
      id: "vendor",
      title: "4. Vendor Configuration",
      icon: <Users className="w-5 h-5" />,
      items: [
        { label: "Data Sync", actionable: true },
        { label: "Risk Scoring", actionable: true },
        { label: "Communication Preferences", actionable: true },
        { label: "Portal Access Settings", actionable: true },
      ],
    },
    {
      id: "sla",
      title: "5. SLA Configuration",
      icon: <Clock className="w-5 h-5" />,
      items: [
        { label: "Open Escalation", color: "bg-green-100 text-green-700" },
        { label: "Escalation L1", color: "bg-blue-100 text-blue-700" },
        { label: "Reminder 2", color: "bg-cyan-100 text-cyan-700" },
        { label: "Escalation L3", color: "bg-orange-100 text-orange-700" },
        { label: "Escalation L2", color: "bg-pink-100 text-pink-700" },
        { label: "Manual Escalation", color: "bg-red-100 text-red-700" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Configuration Audit Log (single row on top) */}
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight ">
                Configuration
              </h1>
          </div>
          <div>
          <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 shadow-sm">
            Configuration Audit Log <ChevronRight className="w-3 h-3 text-blue-600" />
          </a>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {kpiData.map((kpi, idx) => (
            <div
              key={idx}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_2px_8px_rgba(15,23,42,0.05)]
                hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)]
                transition
              "
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${kpi.bg}`}
                >
                  {kpi.icon}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]">
                    {kpi.label}
                  </p>

                  <div className={`mt-1 text-2xl font-bold ${kpi.valueColor}`}>
                    {kpi.value}
                  </div>

                  <p className={`mt-1 text-xs font-semibold ${kpi.changeColor}`}>
                    {kpi.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Main Rows — every row is 2 columns at lg and takes full width */}
        <div className="space-y-4 mb-6">
          {/* Row 1: AI Config | Main Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              {/* AI Configuration Section */}

              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <Settings className="w-4 h-4 text-purple-600" />
                  </div>

                  <h2 className="text-sm font-bold text-slate-800">
                    1. AI Agent Configuration
                  </h2>
                </div>

                {/* Body */}
                <div className="p-4">
  {/* Confidence Threshold */}
  <div className="mb-6">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-slate-700">
        Confidence Threshold
      </span>

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-600">
          {confidence}%
        </span>

        <div className="relative w-28">
          {/* Invisible Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />

          {/* Track */}
          <div className="h-1.5 rounded-full bg-slate-200">
            <div
              className="h-1.5 rounded-full bg-blue-600 transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>

          {/* Thumb */}
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-white shadow-sm transition-all"
            style={{ left: `calc(${confidence}% - 8px)` }}
          />
        </div>
      </div>
    </div>
  </div>

  {/* Settings */}
  <div className="space-y-4">
    {[
      {
        title: "Auto Resolution",
        desc: "Automatically resolve eligible items",
      },
      {
        title: "Learning Mode",
        desc: "Continuous learning from outcomes",
      },
      {
        title: "Escalation Intelligence",
        desc: "AI-based escalation recommendations",
      },
      {
        title: "Root Cause Analysis",
        desc: "Identify and learn from exception patterns",
      },
      {
        title: "Predictive Exception Detection",
        desc: "Detect exceptions before they occur",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="flex items-start justify-between"
      >
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {item.title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {item.desc}
          </p>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() =>
            setSettings((prev) => ({
              ...prev,
              [item.title]: !prev[item.title],
            }))
          }
          className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
            settings[item.title]
              ? "bg-blue-600"
              : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${
              settings[item.title]
                ? "right-1"
                : "left-1"
            }`}
          />
        </button>
      </div>
    ))}
  </div>
</div>

                {/* Footer */}
                <button
                  className="flex w-full items-center justify-between border-t border-slate-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50"
                >
                  <span>View AI Agent Settings</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm h-full">
              {/* Header */}
              <div className="px-4 py-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">
                  Agent Health
                </h3>
              </div>

            <div className="p-4 flex flex-col h-[calc(100%-53px)]">

              {/* Metric 1 */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    AI Accuracy
                  </p>

                  <svg
                    className="w-[160px] h-8"
                    viewBox="0 0 160 30"
                    fill="none"
                  >
                    <path
                      d="M2 18 L18 17 L30 18 L42 14 L56 16 L70 15 L84 9 L98 16 L112 13 L126 16 L142 12 L158 13"
                      stroke="#9EDBB3"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-right">
                  <p className="text-[20px] font-bold text-slate-800 leading-none">
                    96.2%
                  </p>
                  <p className="text-xs font-semibold text-green-500 mt-1">
                    ↑ 4.1%
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-b border-slate-100 my-3" />

              {/* Metric 2 */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    Auto Resolution Rate
                  </p>

                  <svg
                    className="w-[160px] h-8"
                    viewBox="0 0 160 30"
                    fill="none"
                  >
                    <path
                      d="M2 18 L18 19 L34 18 L48 19 L62 16 L76 8 L92 14 L108 16 L124 10 L142 14 L158 11"
                      stroke="#9EDBB3"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-right">
                  <p className="text-[20px] font-bold text-slate-800 leading-none">
                    58%
                  </p>
                  <p className="text-xs font-semibold text-green-500 mt-1">
                    ↑ 7.5%
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-b border-slate-100 my-3" />

              {/* Metric 3 */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    Rule Success Rate
                  </p>

                  <svg
                    className="w-[160px] h-8"
                    viewBox="0 0 160 30"
                    fill="none"
                  >
                    <path
                      d="M2 19 L20 19 L36 18 L52 19 L68 17 L84 9 L100 18 L116 20 L132 17 L148 18 L158 15"
                      stroke="#9EDBB3"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-right">
                  <p className="text-[20px] font-bold text-slate-800 leading-none">
                    94%
                  </p>
                  <p className="text-xs font-semibold text-green-500 mt-1">
                    ↑ 3.8%
                  </p>
                </div>
              </div>

              {/* Push footer to bottom */}
              <div className="flex-1" />

              {/* Footer */}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-end">
                <div>
                  <p className="text-sm text-slate-700 mb-1">
                    Learning Status
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                    <span className="text-lg font-semibold text-green-600">
                      Active
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">
                    Model
                  </p>

                  <p className="text-lg font-semibold text-slate-700">
                    v2.4
                  </p>
                </div>
              </div>

            </div>
          </div>
            </div>
          </div>

          {/* Row 2: Reconciliation Rules | Exception Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              {/* Reconciliation Rules */}

              <div className="h-full rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <ScanLine className="h-3 w-3 text-purple-600" strokeWidth={2.5} />
                  </div>

                  <h2 className="text-sm font-bold text-slate-800">
                    2. Reconciliation Rules Management
                  </h2>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 p-4 pb-3">
                  <button className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700">
                    <Plus className="w-3.5 h-3.5" />
                    Add Rule
                  </button>

                  <button className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    <Pencil className="w-3.5 h-3.5 text-blue-600" />
                    Edit
                  </button>

                  <button className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    <Copy className="w-3.5 h-3.5 text-blue-600" />
                    Clone
                  </button>

                  <button className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
                    Test Rule
                  </button>
                </div>

                {/* Table */}
                <div className="px-4 flex-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-3 text-left font-semibold text-slate-600">
                            Rule ID
                          </th>

                          <th className="py-3 text-left font-semibold text-slate-600">
                            Description
                          </th>

                          <th className="py-3 text-left font-semibold text-slate-600">
                            Type
                          </th>

                          <th className="py-3 text-left font-semibold text-slate-600">
                            Status
                          </th>

                          <th className="py-3 text-left font-semibold text-slate-600">
                            Last Updated
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {[
                          {
                            id: "RR-001",
                            desc: "Invoice Match",
                            type: "Automated",
                            status: "Active",
                            date: "16 May 2026",
                          },
                          {
                            id: "RR-002",
                            desc: "Credit Memo Validation",
                            type: "Automated",
                            status: "Active",
                            date: "15 May 2026",
                          },
                          {
                            id: "RR-003",
                            desc: "Duplicate Payment Check",
                            type: "Semi-Auto",
                            status: "Active",
                            date: "16 May 2026",
                          },
                          {
                            id: "RR-004",
                            desc: "Amount Tolerance Check",
                            type: "Automated",
                            status: "Active",
                            date: "14 May 2026",
                          },
                          {
                            id: "RR-005",
                            desc: "GL Account Validation",
                            type: "Automated",
                            status: "Active",
                            date: "13 May 2026",
                          },
                        ].map((rule) => (
                          <tr
                            key={rule.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="py-3 font-semibold text-blue-600">
                              {rule.id}
                            </td>

                            <td className="py-3 text-slate-700">
                              {rule.desc}
                            </td>

                            <td className="py-3 text-slate-600">
                              {rule.type}
                            </td>

                            <td className="py-3">
                              <span className="font-semibold text-green-600">
                                {rule.status}
                              </span>
                            </td>

                            <td className="py-3 text-slate-500">
                              {rule.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer */}
                <button className="mt-auto flex w-full items-center justify-between border-t border-slate-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                  <span className="cursor-pointer">View All Rules</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              {/* Exception Configuration */}
              <div className="h-full rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-purple-300 bg-purple-50">
                    <BadgeAlert
                      className="h-3 w-3 text-purple-600"
                      strokeWidth={2.5}
                    />
                  </div>

                  <h2 className="text-sm font-bold text-slate-800">
                    3. Exception Configuration
                  </h2>
                </div>

                {/* Cards */}
                <div className="p-4 flex-1">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                    {[
                      {
                        icon: Trash2,
                        title: "Missing Invoice Logic",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                      },
                      {
                        icon: CopyCheck,
                        title: "Duplicate Detection Settings",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                      },
                      {
                        icon: ClipboardCheck,
                        title: "Balance Mismatch Rules",
                        color: "text-sky-600",
                        bg: "bg-sky-50",
                      },
                      {
                        icon: MailSearch,
                        title: "Unapplied Payment Logic",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                      },
                      {
                        icon: FileSearch,
                        title: "Credit Note Validation",
                        color: "text-green-600",
                        bg: "bg-green-50",
                      },
                      {
                        icon: FileWarning,
                        title: "Materiality Thresholds",
                        color: "text-orange-500",
                        bg: "bg-orange-50",
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={index}
                          className="
                            flex flex-col items-center justify-center
                            rounded-lg border border-slate-200
                            bg-white
                            p-4
                            text-center
                            transition-all
                            hover:border-blue-200
                            hover:shadow-sm
                            min-h-[115px]
                          "
                        >
                          <div
                            className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${item.bg}`}
                          >
                            <Icon
                              className={`h-5 w-5 ${item.color}`}
                              strokeWidth={2}
                            />
                          </div>

                          <span className="text-sm font-semibold text-slate-700 leading-5">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <button
                  className="
                    flex items-center justify-between
                    border-t border-slate-200
                    px-4 py-3
                    text-sm font-semibold
                    text-blue-600
                    hover:bg-slate-50
                  "
                >
                  <span className="cursor-pointer">View All Exception Settings</span>

                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Vendor | SLA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              {/* Vendor Configuration */}
              <div className="h-full rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">
                    4. Vendor Configuration
                  </h2>
                </div>

                <div className="p-4">
                  <div className="space-y-1">
                    {vendorItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.title}
                          className="w-full flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconBg}`}
                            >
                              <Icon className={`w-5 h-5 ${item.iconColor}`} />
                            </div>

                            <div className="text-left">
                              <p className="text-sm font-semibold text-slate-800">
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <ChevronRight className="w-5 h-5 text-blue-500" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            <div>
              {/* SLA Configuration */}
              <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">
  
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Clock3 className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">
                    5. SLA Configuration
                  </h2>
                </div>

                {/* Timeline */}
                <div className="flex-1 p-5">
                  <div className="relative">

                    {/* Vertical line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-200" />

                    <div className="space-y-6">
                      {slaItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            
                            {/* Dot */}
                            <div
                              className={`relative z-10 h-5 w-5 rounded-full border-4 border-white shadow ${item.dot}`}
                            />

                            {/* Label */}
                            <span className="text-sm font-semibold text-slate-700">
                              {item.label}
                            </span>
                          </div>

                          {/* Days */}
                          <span className="text-sm font-semibold text-slate-600">
                            {item.days}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <button className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-blue-600 font-semibold hover:bg-slate-50">
                  <span className="cursor-pointer">View SLA Policies</span>
                  <ChevronRight className="h-5 w-5" />
                </button>

              </div>
            </div>
          </div>

          {/* Row 4: Approval Workflow | Right stack (Agent Health, Recent Changes, Quick Actions) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              {/* Approval Workflow Designer (6) */}
                <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">

                  {/* Header */}
                  <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
                    <Workflow className="h-4 w-4 text-blue-600" />

                    <h2 className="text-sm font-semibold text-slate-800">
                      6. Approval Workflow Designer
                    </h2>
                  </div>

                  {/* Body */}
                  <div className="flex-1 p-5">

                    {/* Top Workflow Row */}
                    <div className="flex items-center justify-center">

                      {/* AP Analyst */}
                      <div className="w-[145px] rounded-lg border border-blue-200 bg-blue-50 px-3 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <UserRound className="h-4 w-4 text-blue-600" />

                          <span className="text-[13px] font-semibold text-slate-700">
                            AP Analyst
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="mx-2 flex items-center">
                        <div className="w-8 border-t border-slate-300"></div>
                        <ChevronRight className="-ml-1 h-4 w-4 text-slate-500" />
                      </div>

                      {/* AP Team Lead */}
                      <div className="w-[180px] rounded-lg border border-green-200 bg-green-50 px-3 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <UserRound className="h-4 w-4 text-green-600" />

                          <span className="text-[13px] font-semibold text-slate-700">
                            AP Team Lead
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="mx-2 flex items-center">
                        <div className="w-8 border-t border-slate-300"></div>
                        <ChevronRight className="-ml-1 h-4 w-4 text-slate-500" />
                      </div>

                      {/* Controller */}
                      <div className="w-[145px] rounded-lg border border-purple-200 bg-purple-50 px-3 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <UserRound className="h-4 w-4 text-purple-600" />

                          <span className="text-[13px] font-semibold text-slate-700">
                            Controller
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Arrow */}
                    <div className="mt-2 flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="flex flex-col items-center">
                          <div className="h-8 border-l border-slate-300"></div>
                          <ChevronDown className="-mt-1 h-4 w-4 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    {/* Finance Manager */}
                    <div className="flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="w-[220px] rounded-lg border border-orange-200 bg-orange-50 px-3 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <UserRound className="h-4 w-4 text-orange-500" />

                            <span className="text-[13px] font-semibold text-slate-700">
                              Finance Manager
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow To Auto Approval */}
                    <div className="mt-2 flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="flex flex-col items-center">
                          <div className="h-8 border-l border-slate-300"></div>
                          <ChevronDown className="-mt-1 h-4 w-4 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    {/* Auto Approval Conditions */}
                    <div className="flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="w-[300px] rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center">

                          <h4 className="text-sm font-semibold text-slate-700">
                            Auto Approval Conditions
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            (Amount, Risk, Confidence)
                          </p>

                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-200">
                    <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                      <span className="cursor-pointer">Manage Workflows</span>

                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                </div>

            </div>

            <div>
              {/* Right stacked cards */}
               {/* Recent Changes */}
               <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800">Recent Changes</h3>
                    <a href="#" className="text-xs cursor-pointer font-semibold text-blue-600 hover:text-blue-800">View All</a>
                  </div>

                  <div className="space-y-3">
                    {[{ icon: "📋", label: "Rule RR-015 Updated", time: "10:30 AM", date: "15 May 2026" },{ icon: "📋", label: "SLA Policy Modified", time: "04:30 PM", date: "15 May 2026" },{ icon: "➕", label: "New User Template Added", time: "11:15 AM", date: "15 May 2026" },{ icon: "🔄", label: "Workflow Updated", time: "03:45 PM", date: "14 May 2026" },{ icon: "🤖", label: "AI Model Retrained", time: "09:30 AM", date: "14 May 2026" }].map((change, idx) => (
                      <div key={idx} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0">
                        <div className="text-lg mt-0.5">{change.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-700">{change.label}</p>
                          <p className="text-[10px] text-slate-500">{change.date} at {change.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             
                <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">

                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <MessageSquare className="h-5 w-5 text-purple-600" />

                  <h2 className="text-sm font-bold text-slate-800">
                    7. Communication Templates
                  </h2>
                </div>

                {/* Accordion List */}
                <div className="flex-1">

                  {templateData.map((template, index) => (
                    <button
                      key={template.label}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition ${
                        index !== templateData.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">

                        <ChevronRight className="h-4 w-4 text-slate-400" />

                        <span className="text-sm font-medium text-slate-700">
                          {template.label}
                        </span>

                      </div>

                      <span className="min-w-[24px] rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                        {template.count}
                      </span>
                    </button>
                  ))}

                </div>

                {/* Footer */}
                <div className="border-t border-slate-200">
                    <button className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                      <span className="cursor-pointer">Manage All Templates</span>

                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                </div>

                {/* Quick Actions */}
                <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                  <h3 className="text-sm font-bold text-slate-800 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {[{ icon: "➕", label: "Create New Rule", color: "text-blue-600" },{ icon: "👥", label: "Add Vendor", color: "text-green-600" },{ icon: "⚙️", label: "Import Configuration", color: "text-purple-600" },{ icon: "📊", label: "AI Optimization Review", color: "text-orange-600" }].map((action, idx) => (
                      <button key={idx} className="w-full flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"><span className="text-base">{action.icon}</span>{action.label}</button>
                    ))}
                  </div>
                </div>
          </div>
        </div>

        {/* Bottom rows: each row 2 columns (full width) */}
        <div className="space-y-4">
          {/* Row A: Communication Templates | Security & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
               <div className="h-full rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 border-b border-slate-200 p-4">
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-purple-300 bg-purple-50">
                    <Settings2 className="h-3 w-3 text-purple-600" />
                  </div>

                  <h2 className="text-sm font-bold text-slate-800">
                    8. Security & Governance
                  </h2>
                </div>

                {/* Content */}
                <div className="flex-1 p-3">

                  {[
                    {
                      icon: Users,
                      title: "RBAC Management",
                      desc: "Manage roles and permissions",
                      color: "text-purple-600",
                      bg: "bg-purple-50",
                    },
                    {
                      icon: TriangleAlert,
                      title: "Azure AD Integration",
                      desc: "Single sign-on and directory sync",
                      color: "text-blue-600",
                      bg: "bg-blue-50",
                    },
                    {
                      icon: FileKey2,
                      title: "SoD Controls",
                      desc: "Segregation of duties setup",
                      color: "text-sky-600",
                      bg: "bg-sky-50",
                    },
                    {
                      icon: ClipboardList,
                      title: "Data Retention Policies",
                      desc: "Configure data retention rules",
                      color: "text-orange-500",
                      bg: "bg-orange-50",
                    },
                    {
                      icon: FileSearch,
                      title: "Audit Logging",
                      desc: "System and user activity logs",
                      color: "text-green-600",
                      bg: "bg-green-50",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Compliance Monitoring",
                      desc: "Track compliance and certifications",
                      color: "text-slate-500",
                      bg: "bg-slate-100",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={index}
                        className="flex w-full items-center justify-between border-b border-slate-100 py-3 last:border-b-0 hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-3">

                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}
                          >
                            <Icon
                              className={`h-5 w-5 ${item.color}`}
                              strokeWidth={2}
                            />
                          </div>

                          <div className="text-left">
                            <p className="text-sm font-semibold text-slate-800">
                              {item.title}
                            </p>

                            <p className="text-xs text-slate-500">
                              {item.desc}
                            </p>
                          </div>

                        </div>

                        <ChevronRight className="h-4 w-4 text-blue-600" />
                      </button>
                    );
                  })}

                </div>

              </div>
            </div>

            <div>
              {/* <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <h3 className="text-sm font-bold text-slate-800 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {[{ icon: "➕", label: "Create New Rule", color: "text-blue-600" },{ icon: "👥", label: "Add Vendor", color: "text-green-600" },{ icon: "⚙️", label: "Import Configuration", color: "text-purple-600" },{ icon: "📊", label: "AI Optimization Review", color: "text-orange-600" }].map((action, idx) => (
                    <button key={idx} className="w-full flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"><span className="text-base">{action.icon}</span>{action.label}</button>
                  ))}
                </div>
              </div> */}
 <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">

                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Database className="h-5 w-5 text-purple-600" />

                  <h2 className="text-sm font-bold text-slate-800">
                    9. Integration Management
                  </h2>
                </div>

                {/* Integration List */}
                <div className="flex-1">

                  {integrations.map((integration, index) => (
                    <button
                      key={integration.name}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition ${
                        index !== integrations.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      {/* Left Side */}
                      <div className="flex items-center gap-3">

                        {/* Logo */}
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded ${integration.logoClass}`}
                        >
                          <span className="text-xs font-bold">
                            {integration.logo}
                          </span>
                        </div>

                        {/* Name */}
                        <span className="text-sm font-medium text-slate-700">
                          {integration.name}
                        </span>

                      </div>

                      {/* Right Side */}
                      <div className="flex items-center gap-6">

                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />

                          <span className="text-sm font-medium text-slate-500">
                            Connected
                          </span>
                        </div>

                        <ChevronRight className="h-5 w-5 text-blue-500" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200">
                  <button className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                    <span className="cursor-pointer">Manage Integrations</span>

                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
