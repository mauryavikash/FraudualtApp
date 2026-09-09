"use client";

import { Bell, Menu, ChevronDown, Settings, User, LogOut, HelpCircle, Download, Upload, BarChart3 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header({ setIsOpen, isOpen }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

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
          <div className="relative w-60">
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
          </div>

          {headerActions.map((action) => {
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
          })}

          <button
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            title="Notifications"
          >
            <Bell size={16} />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-red-500 select-none" />
          </button>

          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            title="Help"
          >
            <HelpCircle size={16} />
          </button>

          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            title="Settings"
          >
            <Settings size={16} />
          </button>

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
            <BarChart3 size={16} className="text-emerald-500" />
            <span className="text-[13px] font-bold text-dgem-blue">i360</span>
            {/* <img
                src="/pw.png"
                alt="User avatar"
                className="h-8 w-12"
              /> */}
          </div>
          <div>
            <img
                src="/capgemini_icon.png"
                alt="capgemini icon"
                className="h-10 w-12"
              />
          </div> 
          {/* <div className="hidden md:block h-6 w-6 rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-fuchsia-500 shrink-0" /> */}
        </div>
      </div>
    </header>
  );
}
