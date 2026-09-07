import {
  FileText,
  AlertCircle,
  FolderOpen,
  TrendingUp,
  Clock3,
  Users,
  ChevronRight,
  Calendar,
} from "lucide-react";

export default function OperationalReporting() {
  const reports = [
    {
      title: "Duplicate Detection Report",
      desc: "Details of duplicate invoices and payments identified.",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Anomaly Detection Report",
      desc: "Details of anomalous transactions detected.",
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "Open Investigation Report",
      desc: "List of open cases with status and priority details.",
      icon: FolderOpen,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Recovery Tracking Report",
      desc: "Recovery status, value and aging details.",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      title: "SLA & Aging Report",
      desc: "SLA compliance and case aging analysis.",
      icon: Clock3,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Investigator Productivity Report",
      desc: "Investigator performance and productivity metrics.",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 xl:col-span-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Operational Reporting
        </h2>

        <button className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700">
          View all reports
        </button>
      </div>

      <div className="space-y-3">
        {reports.map(({ title, desc, icon: Icon, bg, color }) => (
          <div
            key={title}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md ${bg}`}
              >
                <Icon size={16} className={color} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  {title}
                </p>

                <p className="text-xs text-slate-500">
                  {desc}
                </p>
              </div>
            </div>

            <ChevronRight
              size={16}
              className="cursor-pointer text-slate-400"
            />
          </div>
        ))}
      </div>

      <button className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">
        <Calendar size={16} />
        Schedule Report
      </button>
    </div>
  );
}
