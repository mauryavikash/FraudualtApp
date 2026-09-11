import React from "react";
import {
  Download,
  Upload,
  CheckCheck,
  Bell,
} from "lucide-react";

export const VendorHeader = () => {
  return (
            <div className="bg-white border border-[#D9E1EA] rounded-2xl shadow-[0px_2px_8px_rgba(15,23,42,0.05)] px-4 py-4 mb-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[20px] font-semibold text-[#0F172A]">
                       Monitor and Act
                    </h1>
                    <p className="mt-1 text-[13px] text-[#64748B]">
                      Monitor and act on important events, anomalies, and system notifications.
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
                    >
                    <Download size={15} />
                    Export Alerts
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
                    <Upload size={15} />
                    Upload File
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
                    <CheckCheck size={15} />
                    Mark all as Read
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
                    <Bell size={15} />
                    Alert Preferences
                    </button>
                </div>
                </div>
            </div>
  );
};
