
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ManagementDashboard() {
  const cardClass = `
    rounded-xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
    transition-all
    duration-300
    cursor-pointer
    hover:bg-slate-50
    hover:border-slate-300
    hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)]
  `;

  const openClosedData = [
    { name: "Open", value: 4723, percent: "47.9%", color: "#6886d1" },
    { name: "Closed", value: 5119, percent: "52.1%", color: "#5ed3af" },
  ];

  const priorityData = [
    { name: "High", value: 1892, percent: "19.2%", color: "#e28282" },
    { name: "Medium", value: 3913, percent: "39.7%", color: "#ebbc62" },
    { name: "Low", value: 4037, percent: "41.1%", color: "#5ed3af" },
  ];

  const recoveryTrendData = [
    { name: "May 14", value: 1.1 },
    { name: "May 15", value: 1.5 },
    { name: "May 16", value: 1.4 },
    { name: "May 17", value: 1.9 },
    { name: "May 18", value: 1.7 },
    { name: "May 19", value: 2.4 },
    { name: "May 20", value: 1.95 },
  ];

  const investigationCycleData = [
    { name: "May 14", value: 5.1 },
    { name: "May 15", value: 6.0 },
    { name: "May 16", value: 5.5 },
    { name: "May 17", value: 5.0 },
    { name: "May 18", value: 6.1 },
    { name: "May 19", value: 7.6 },
    { name: "May 20", value: 6.5 },
  ];

  const vendorTrendData = [
    { name: "May 14", value: 180 },
    { name: "May 15", value: 220 },
    { name: "May 16", value: 215 },
    { name: "May 17", value: 245 },
    { name: "May 18", value: 225 },
    { name: "May 19", value: 235 },
    { name: "May 20", value: 270 },
  ];

  const dashboardSummary = {
    totalCases: "9,842",
    recoveryValue: "$3.42M",
    recoveryGrowth: "+18.7%",
    cycleTime: "6.2 Days",
    cycleImprovement: "-1.3 Days",
    slaCompliance: "92.4%",
    automationRate: "68.2%",
    automationGrowth: "+6.8%",
    highRiskVendors: "245",
    highRiskGrowth: "+8.4%",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid grid-cols-12 gap-4 items-stretch">
        {/* Header */}
        <div className="col-span-12 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-slate-800">
            Management Dashboard
          </h2>

          <button className="text-[14px] font-semibold text-blue-600 hover:text-blue-700">
            View full dashboard
          </button>
        </div>

        {/* LEFT SECTION */}
        <div className="col-span-12 xl:col-span-8 h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* OPEN VS CLOSED */}
            <div className={`col-span-12 md:col-span-6 ${cardClass}`}>
              <h3 className="mb-4 text-[13px] font-bold text-slate-800">
              OPEN VS CLOSED CASES
            </h3>

            <div className="flex items-center justify-between">
              <div className="relative h-[128px] w-[128px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={openClosedData}
                      dataKey="value"
                      innerRadius={34}
                      outerRadius={50}
                      stroke="none"
                    >
                      {openClosedData.map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[18px] font-bold text-slate-800">
                    {dashboardSummary.totalCases}
                  </div>

                  <div className="text-[10px] font-semibold text-slate-400">
                    TOTAL
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {openClosedData.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />

                      <span className="text-[13px] font-semibold text-slate-700">
                        {item.name}
                      </span>
                    </div>

                    <div className="ml-4 text-[16px] font-bold text-slate-800">
                      {item.value.toLocaleString()}
                      <span className="ml-1 text-[12px] text-slate-400">
                        ({item.percent})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>

            {/* RECOVERY VALUE */}
            <div className={`col-span-12 md:col-span-6 ${cardClass}`}>
              {/* your existing Recovery Value code */}
              <div className="flex items-start justify-between">
              <h3 className="text-[13px] font-bold text-slate-800">
                RECOVERY VALUE (USD)
              </h3>

              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                ↗ {dashboardSummary.recoveryGrowth}
              </span>
            </div>

            <div className="mt-2 text-[24px] font-bold text-slate-800">
              {dashboardSummary.recoveryValue}
            </div>

            <div className="text-[11px] text-slate-400">
              vs May 7 – May 13, 2025
            </div>

            <div className="mt-4 h-[90px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recoveryTrendData} margin={{ top: 5, right: 10, left: -30, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5ED3AF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#5ED3AF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" hide={true} />
                  <YAxis hide={true} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                    formatter={(value) => `$${value.toFixed(2)}M`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#5ED3AF"
                    strokeWidth={2.5}
                    fill="url(#colorRecovery)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            </div>

            {/* CASES BY PRIORITY */}
            <div className={`col-span-12 md:col-span-6 ${cardClass}`}>
              {/* your existing Cases By Priority code */}
              <h3 className="mb-6 text-lg font-bold text-slate-800">
              CASES BY PRIORITY
            </h3>

            <div className="flex items-center justify-between">
              <div className="relative h-[140px] w-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      dataKey="value"
                      innerRadius={42}
                      outerRadius={56}
                      stroke="none"
                    >
                      {priorityData.map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-3">
                {priorityData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />

                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-slate-800">
                        {item.name}
                      </span>

                      <span className="text-xs text-slate-500">
                        {item.value.toLocaleString()} ({item.percent})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>

            {/* AUTOMATION RATE */}
            <div className="col-span-12 md:col-span-6 flex">
              <div
                className="
                  flex-1
                  rounded-2xl
                  border
                  border-[#D8E0EA]
                  bg-white
                  px-6
                  py-6
                  shadow-sm
                  transition-all
                  duration-300
                  cursor-pointer
                  hover:bg-slate-50
                  hover:border-slate-300
                  hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)]
                "
              >
                {/* your existing Automation Rate code */}
                 <h3 className="text-[14px] font-semibold text-[#1E293B] tracking-tight">
                AUTOMATION RATE
              </h3>

              {/* Gauge */}
              <div className="flex justify-center">
                <div className="relative h-[170px] w-[240px]">
                  <svg
                    viewBox="0 0 240 160"
                    className="h-full w-full"
                  >
                    <defs>
                      <linearGradient
                        id="automationGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6783D0"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6D89D6"
                        />
                      </linearGradient>
                    </defs>

                    {/* Background Arc */}
                    <path
                      d="M40 120 A80 80 0 0 1 200 120"
                      fill="none"
                      stroke="#DADFE8"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />

                    {/* Progress Arc 68.2% */}
                    <path
                      d="M40 120 A80 80 0 0 1 168 58"
                      fill="none"
                      stroke="url(#automationGradient)"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Center Content */}
                  <div className="absolute top-[60px] inset-0 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-bold leading-none text-[#26334D]">
                      68.2%
                    </div>

                    <div className="mt-2 text-[13px] font-medium text-[#66758C]">
                      Automation
                    </div>

                    <div
                      className="
                        mt-2
                        rounded-full
                        bg-[#DDF7E7]
                        px-4
                        py-[7px]
                        text-[13px]
                        font-semibold
                        text-[#10B981]
                        leading-none
                      "
                    >
                      ↗ +6.8%
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-1 text-center text-[12px] font-medium text-[#94A3B8]">
                vs May 7 – May 13, 2025
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-4 h-full">
          {/* INVESTIGATION */}
          <div className={cardClass}>
            {/* your existing Investigation code */}
            <div className="text-[10px] font-bold text-slate-500">
            INVESTIGATION CYCLE TIME
          </div>

          <div className="mt-1 flex items-center gap-2">
            <div className="text-[18px] font-bold text-slate-800">
              {dashboardSummary.cycleTime}
            </div>

            <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
              ↘ {dashboardSummary.cycleImprovement}
            </span>
          </div>

          <div className="text-[10px] text-slate-400">
            vs May 7 – May 13, 2025
          </div>

          <div className="mt-3 h-[70px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={investigationCycleData} margin={{ top: 5, right: 10, left: -30, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorInvestigation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6886D1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6886D1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" hide={true} />
                <YAxis hide={true} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                  formatter={(value) => `${value.toFixed(1)} Days`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6886D1"
                  strokeWidth={2}
                  fill="url(#colorInvestigation)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          </div>

          {/* SLA */}
          <div className={cardClass}>
            {/* your existing SLA code */}
            <h3 className="text-[14px] font-semibold text-[#475569] uppercase">
            SLA COMPLIANCE
          </h3>

          <div className="flex justify-center">
            <div className="relative w-[300px] h-[150px]">

              <svg
                viewBox="0 0 220 140"
                className="w-full h-full"
              >
                {/* Background Arc */}
                <path
                  d="M40 110 A70 70 0 0 1 180 110"
                  fill="none"
                  stroke="#DFE5ED"
                  strokeWidth="12"
                  strokeLinecap="round"
                  pathLength="100"
                />

                {/* Progress Arc = 92.4% */}
                <path
                  d="M40 110 A70 70 0 0 1 180 110"
                  fill="none"
                  stroke="#61D2AE"
                  strokeWidth="12"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="92.4 100"
                />
              </svg>

              {/* Center Content */}
              <div className="absolute top-[90px] inset-0 flex flex-col items-center justify-center">
                <div className="text-[28px] font-bold leading-none text-[#1E293B]">
                  92.4%
                </div>

                <div className="mt-1 text-[14px] font-medium text-[#64748B]">
                  SLA Met
                </div>

                <div
                  className="
                    mt-1
                    rounded-xl
                    border
                    border-[#D9E1EA]
                    bg-[#F8FAFC]
                    px-4
                    py-2
                    text-[12px]
                    font-semibold
                    text-[#10B981]
                    shadow-sm
                  "
                >
                  Target: ≥90%
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* HIGH RISK */}
          <div className={cardClass}>
            {/* your existing High Risk Vendor code */}
            <div className="text-[10px] font-bold text-slate-500">
            HIGH-RISK VENDOR TRENDS
          </div>

          <div className="mt-1 flex items-center gap-2">
            <div className="text-[20px] font-bold text-red-500">
              {dashboardSummary.highRiskVendors}
            </div>

            <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-500">
              ↗ {dashboardSummary.highRiskGrowth}
            </span>
          </div>

          <div className="text-[10px] text-slate-400">
            vs May 7 – May 13, 2025
          </div>

          <div className="mt-3 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vendorTrendData} margin={{ top: 5, right: 10, left: -30, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorVendor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E57373" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E57373" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" hide={true} />
                <YAxis hide={true} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                  formatter={(value) => `${value} Vendors`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#E57373"
                  strokeWidth={2}
                  fill="url(#colorVendor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}