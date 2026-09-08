import React from "react";
import {
  SlidersHorizontal,
  FlaskConical,
  Download,
} from "lucide-react";

export const AuditHeader = () => {
  return (
            <div className="bg-white border border-[#D9E1EA] rounded-2xl shadow-[0px_2px_8px_rgba(15,23,42,0.05)] px-4 py-4 mb-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[18px] font-semibold text-[#0F172A]">
                       Audit & Decision Center
                    </h1>
                    <p className="mt-1 text-[13px] text-[#64748B]">
                      Track every decision, reversal, approval, and reviewer activity across the duplicate detection lifecycle.
                    </p>
                </div>

                <div className="flex gap-2.5">
                    <button
                    className="
                        h-9
                        px-3.5
                        rounded-xl
                        border
                        border-[#D9E1EA]
                        bg-white
                        text-[13px]
                        font-medium
                        text-[#475569]
                        flex items-center gap-2
                    "
                    aria-haspopup="true"
                    >
                    <SlidersHorizontal size={15} />
                    Filters
                    </button>

                    <button
                    className="
                        h-9
                        px-3.5
                        rounded-xl
                        border
                        border-[#D9E1EA]
                        bg-white
                        text-[13px]
                        font-medium
                        text-[#475569]
                        flex items-center gap-2
                    "
                    >
                    <FlaskConical size={15} />
                    Sample Validation
                    </button>

                    <button
                    className="
                        h-9
                        px-4
                        rounded-xl
                        bg-[#2563EB]
                        text-white
                        text-[13px]
                        font-medium
                        flex items-center gap-2
                        shadow-sm
                    "
                    >
                    <Download size={15} />
                    Download Evidence
                    </button>
                </div>
                </div>
            </div>
  );
};
