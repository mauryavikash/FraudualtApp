"use client";

import { Bell, Menu,Zap,Bot, ChevronDown,AlertTriangle,CheckCircle2,FileText,Mail, Settings, User, LogOut, HelpCircle, Download, Upload, BarChart3 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
  const NOTIF_ICONS = {
    warning:  { icon: AlertTriangle, color: "text-amber-500",   bg: "bg-amber-50" },
    success:  { icon: CheckCircle2,  color: "text-emerald-500", bg: "bg-emerald-50" },
    info:     { icon: FileText,      color: "text-blue-500",    bg: "bg-blue-50" },
    email:    { icon: Mail,          color: "text-sky-500",     bg: "bg-sky-50" },
    default:  { icon: Bell,          color: "text-slate-500",   bg: "bg-slate-50" },
  };

  function getNotifStyle(type) {
    return NOTIF_ICONS[type] || NOTIF_ICONS.default;
  }

  // ── Agent definitions ──────────────────────────────────────────────────────────
  const LIVE_AGENTS = [
    { name: "Statement Extraction Agent", role: "OCR · PDF · Email parsing", icon: "📄" },
    { name: "AI Matching Engine",         role: "Auto-match supplier invoices", icon: "🔗" },
    { name: "Follow-up Email Agent",      role: "Automated supplier outreach", icon: "📧" },
    { name: "Reconciliation Processor",   role: "Batch reconciliation runs", icon: "⚙️" },
  ];

  const STANDBY_AGENTS = [
    { name: "Root Cause Analysis Agent", role: "Exception pattern analysis", icon: "🔍" },
    { name: "Predictive Exception Agent", role: "Pre-emptive issue detection", icon: "🔮" },
    { name: "Learning Mode Agent",        role: "Continuous model training", icon: "🧠" },
  ];
export default function Header({ setIsOpen, isOpen }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [agentsOpen,   setAgentsOpen]   = useState(false);
  const [standbyOpen,  setStandbyOpen]  = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const dropdownRef = useRef(null);
   const agentsRef  = useRef(null);
  const standbyRef = useRef(null);
  // const notifRef   = useRef(null);
  // const notifications = Array.isArray(dashData?.mockNotifications) && dashData.mockNotifications.length > 0
  //   ? dashData.mockNotifications
  //   : [
  //       { type: "warning", message: "3 exceptions pending review", time: "2 min ago" },
  //       { type: "success", message: "Reconciliation batch completed", time: "15 min ago" },
  //       { type: "email",   message: "New statement from Kumar Textiles", time: "1 hr ago" },
  //     ];

  let title = "Home";

  if (pathname) {
    if (pathname === "/home") title = "Reporting & Audit Center";
    else if (pathname === "/cases") title = "Cases";
    else if (pathname === "/recoveries") title = "Recoveries";
    else if (pathname === "/vendor") title = "Vendor Deviations ";
    else if (pathname === "/audit") title = "Audit Log";
    // else if (pathname === "/reports") title = "Reports & Analytics";
    // else if (pathname === "/settings") title = "Configuration";
    // else if (pathname === "/users-roles") title = "Users & Roles";
  }

  const headerActions = [
    { label: "Export Audit Log", icon: Download },
    { label: "Upload File", icon: Upload },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 gap-3">
        {/* Left section */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
          >
            <Menu size={17} />
          </button>

          <div className="text-[17px] font-semibold tracking-tight text-slate-900">
            {title}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          
          <div className="relative" ref={agentsRef}>
            <button
              type="button"
              onClick={() => { setAgentsOpen((v) => !v); setStandbyOpen(false); }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-100 hover:shadow-md cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Agents Live
              <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white">
                {LIVE_AGENTS.length}
              </span>
            </button>

            {/* Live agents dropdown */}
            <div className={`absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl transition-all duration-200 z-50 ${
              agentsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
            }`}>
              <div className="border-b border-slate-100 bg-emerald-50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Zap size={13} className="text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">Live Agents ({LIVE_AGENTS.length})</span>
                </div>
              </div>
              {LIVE_AGENTS.map((agent) => (
                <div key={agent.name} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                  <span className="mt-0.5 text-base leading-none">{agent.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-slate-800">{agent.name}</p>
                    <p className="text-[11px] text-slate-500">{agent.role}</p>
                  </div>
                  <span className="relative flex h-2 w-2 mt-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Standby pill + dropdown */}
          <div className="relative" ref={standbyRef}>
            <button
              type="button"
              onClick={() => { setStandbyOpen((v) => !v); setAgentsOpen(false); }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 shadow-sm transition-all hover:bg-amber-100 hover:shadow-md cursor-pointer"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              Standby
              <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white">
                {STANDBY_AGENTS.length}
              </span>
            </button>

            {/* Standby agents dropdown */}
            <div className={`absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-xl transition-all duration-200 z-50 ${
              standbyOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
            }`}>
              <div className="border-b border-slate-100 bg-amber-50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Bot size={13} className="text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-700">Standby Agents ({STANDBY_AGENTS.length})</span>
                </div>
              </div>
              {STANDBY_AGENTS.map((agent) => (
                <div key={agent.name} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                  <span className="mt-0.5 text-base leading-none">{agent.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-slate-800">{agent.name}</p>
                    <p className="text-[11px] text-slate-500">{agent.role}</p>
                  </div>
                  <span className="h-2 w-2 mt-1.5 rounded-full bg-amber-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications bell + dropdown */}
       
          
          {/* <div className="relative w-60">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search cases, recoveries, vendors..."
              className="h-9 w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none"
            />
          </div> */}

          {/* {headerActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                className="h-9 px-3.5 rounded-full border border-slate-200 bg-white text-[13px] font-medium text-slate-600 shadow-sm flex items-center gap-1.5 whitespace-nowrap hover:bg-slate-50"
              >
                <ActionIcon size={14} />
                {action.label}
              </button>
            );
          })} */}

          <button
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            title="Notifications"
          >
            <Bell size={16} />
            <span className="absolute -right-0.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-white text-xs bg-red-500 select-none">2</span>
          </button>

          {/* <button8
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            title="Help"
          >
            <HelpCircle size={16} />
          </button> */}

          {/* <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            title="Settings"
          >
            <Settings size={16} />
          </button> */}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white pl-1 pr-2 text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md"
              type="button"
              title="Profile"
            >
              <img
                src="/logo.svg"
                alt="User avatar"
                className="h-7 w-7 rounded-full border border-slate-200 object-cover"
              />
              <span className="hidden flex-col items-start leading-tight sm:flex">
                <span className="text-[12px] font-semibold text-slate-900">
                  Vigneshwaran D
                </span>
                <span className="text-[10px] text-slate-500">Finance Ops Lead</span>
              </span>
              <ChevronDown size={14} className="text-slate-500" />
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
                profileOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              <a
                href="/profile"
                className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-dgem-blue"
              >
                <User size={16} />
                My Profile
              </a>
              <a
                href="/settings"
                className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-dgem-blue"
              >
                <Settings size={16} />
                Settings
              </a>
              <button className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-slate-200">
            {/* <BarChart3 size={16} className="text-emerald-500" /> */}
            {/* <span className="text-[13px] font-bold text-dgem-blue">i360</span> */}
            {/* <img
                src="/pw.png"
                alt="User avatar"
                className="h-8 w-12"
              /> */}
          </div>
          <div className="flex items-center gap-2 pl-1">
            <img src="/cgI.png" alt="Brand" className="h-[34px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
