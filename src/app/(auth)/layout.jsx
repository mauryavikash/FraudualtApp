import React from "react";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100">
      <div className="grid min-h-screen items-center sm:px-6 lg:px-10">


        {/* center side */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md rounded-3xl border border-[#2a2f3a] bg-white/[0.03] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
            <div className="mb-8">

              <p className="mb-2 text-sm uppercase tracking-[0.22em] text-amber-400">
                Sign In
              </p>
              <h2 className="text-2xl font-semibold text-slate-100">
                Welcome to RFQ Automation
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Enter your credentials to access your account.
              </p>
            </div>

            {children}
          </div>

        </div>
        <p className="text-sm text-center text-slate-500 ">
          © Capgemini {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}