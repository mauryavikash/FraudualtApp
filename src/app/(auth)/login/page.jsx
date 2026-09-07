"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Sparkles, UserRound, Mail, Lock, BadgeCheck } from "lucide-react";
import { APP_NAME, ROLE_OPTIONS } from "@/utils/constants";
import {Button} from "@/components/common/Button";
import {Card} from "@/components/common/Card";

const dummyUsers = [
  {
    name: "Ava Johnson",
    email: "ava.johnson@company.com",
    role: "AP Analyst",
  },
  {
    name: "Marcus Lee",
    email: "marcus.lee@company.com",
    role: "Finance Controller",
  },
  {
    name: "Sophia Patel",
    email: "sophia.patel@company.com",
    role: "Internal Auditor",
  },
];

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="page-container flex min-h-screen items-center justify-center py-8">
        <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles className="h-4 w-4" />
              Statement reconciliation made simpler
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Welcome to {APP_NAME}
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600">
                A secure, role-based reconciliation workspace for AP teams, finance control,
                vendor collaboration, approvals, and audit visibility.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {ROLE_OPTIONS.slice(0, 4).map((role) => (
                <div
                  key={role}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-sm font-medium text-slate-900">{role}</p>
                  <p className="mt-1 text-xs text-slate-500">Static role preview for Phase 1.</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Designed for finance controls, approvals, and audit readiness.
            </div>

            {/* Dummy login presets */}
            <Card className="p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <BadgeCheck className="h-4 w-4 text-blue-600" />
                Dummy login presets
              </div>
              <div className="space-y-3">
                {dummyUsers.map((user) => (
                  <div
                    key={user.email}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right login card */}
          <Card className="mx-auto w-full max-w-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
              <p className="mt-1 text-sm text-slate-500">
                Phase 1 uses a static login experience only.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    defaultValue="ava.johnson@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                  Remember me
                </label>
                <button type="button" className="font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>

              <Button className="w-full justify-center" onClick={handleSignIn}>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-xs text-slate-500">
                No backend auth in Phase 1. This is a UI-only login screen.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}