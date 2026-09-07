import React from "react";
import {
  CalendarDays,
  Download,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

export const RecoveriesHeader = () => {
  return (
            <div className="bg-white border border-[#D9E1EA] rounded-2xl shadow-[0px_2px_8px_rgba(15,23,42,0.05)] px-8 py-5 mb-5">
                <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[20px] font-semibold text-[#0F172A]">
                    Track, Manage and Reconcile
                    </h1>
                    <p className="mt-1 text-[14px] text-[#64748B]">
                    financial recoveries and prevention of duplicate payments.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                    className="
                        h-10
                        px-4
                        rounded-xl
                        border
                        border-[#D9E1EA]
                        bg-[#F8FAFC]
                        text-[14px]
                        font-medium
                        text-[#475569]
                        flex items-center gap-2
                    "
                    >
                    <CalendarDays size={16} />
                    May 14 – May 20, 2025
                    </button>

                    <button
                    className="
                        h-10
                        px-4
                        rounded-xl
                        border
                        border-[#D9E1EA]
                        bg-white
                        text-[14px]
                        font-medium
                        text-[#475569]
                        flex items-center gap-2
                    "
                    >
                    <SlidersHorizontal size={16} />
                    Filters
                    </button>

                    <button
                    className="
                        h-10
                        px-4
                        rounded-xl
                        border
                        border-[#D9E1EA]
                        bg-white
                        text-[14px]
                        font-medium
                        text-[#475569]
                        flex items-center gap-2
                    "
                    >
                    <Download size={16} />
                    Export
                    </button>

                    <button
                    className="
                        h-10
                        px-5
                        rounded-xl
                        bg-[#2563EB]
                        text-white
                        text-[14px]
                        font-medium
                        flex items-center gap-2
                        shadow-sm
                    "
                    >
                    <Plus size={16} />
                    New Recovery
                    </button>
                </div>
                </div>
            </div>
  );
};
