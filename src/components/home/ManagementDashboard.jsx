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
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

function formatPercent(value) {
  return `${Number(value ?? 0).toFixed(1)}%`;
}

export default function ManagementDashboard({ data }) {
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

  const openClosedColors = ["#6886d1", "#5ed3af"];
  const priorityColors = {
    HIGH: "#e28282",
    MEDIUM: "#ebbc62",
    LOW: "#5ed3af",
  };
  const recoveryTrendData = data?.recoveryTrend || [];
  const investigationCycleData = data?.investigationCycleTrend || [];
  const categoryBreakdownData = data?.categoryBreakdown ?? [];
  const timelineScatterData = data?.timelineScatter || [];
  // const timelineChartData = [...(timelineScatterData || [])]
  //   .sort((a, b) => new Date(a.date) - new Date(b.date))
  //   .slice(-12);
  const monthOrder = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const timelineChartData = [...(timelineScatterData || [])]
    .filter((item) => Number(item.amount) > 0)
    .map((item) => ({
      ...item,
      monthName: item.month || item.date,
      monthIndex: monthOrder[item.month || item.date],
    }))
    .sort((a, b) => a.monthIndex - b.monthIndex);
  const vendorConcentrationData = data?.vendorConcentration || [];
  const maxGroups = Math.max(
    ...categoryBreakdownData.map((item) => Number(item.groups || 0)),
    1,
  );
  const getDateRange = (trendData = []) => {
    if (!trendData.length) return "";
    const startDate = trendData[0]?.name;
    const endDate = trendData[trendData.length - 1]?.name;
    return `${startDate} – ${endDate}`;
  };
  const dashboardDateRange = getDateRange(recoveryTrendData);
  const summary = data?.dashboardSummary || {};
  const dashboardSummary = {
    totalCases: Number(summary.totalCases || 0).toLocaleString(),
    recoveryValue: formatCurrency(summary.recoveryValue || 0),
    recoveryGrowth: `${
      Number(summary.recoveryGrowth || 0) >= 0 ? "+" : ""
    }${summary.recoveryGrowth || 0}%`,
    cycleTime: `${summary.cycleTimeDays || 0} Days`,
    cycleImprovement: `${summary.cycleImprovementDays || 0} Days`,
    slaCompliance: formatPercent(summary.slaCompliance || 0),
    automationRate: formatPercent(summary.automationRate || 0),
    automationGrowth: `${
      Number(summary.automationGrowth || 0) >= 0 ? "+" : ""
    }${summary.automationGrowth || 0}%`,
    highRiskVendors: Number(summary.highRiskVendors || 0).toLocaleString(),
    highRiskGrowth: `${
      Number(summary.highRiskVendorGrowth || 0) >= 0 ? "+" : ""
    }${summary.highRiskVendorGrowth || 0}%`,
  };

  const openClosedData = (data?.openClosedData || []).map((item, index) => ({
    name: item.status,
    value: Number(item.count || 0),
    percent: `${item.percentage || 0}%`,
    color: openClosedColors[index] || "#6886d1",
  }));

  return (
    <>
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
          <div className="col-span-12 lg:col-span-8 h-full">
            <div className="grid grid-cols-12 gap-4 h-full">
              {/* OPEN VS CLOSED */}
              <div className={`col-span-12 md:col-span-6 ${cardClass}`}>
                <h3 className="mb-4 text-[13px] font-bold text-slate-800">
                  OPEN VS CLOSED CASES
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <div className="relative h-[200px] w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={openClosedData}
                          dataKey="value"
                          innerRadius={60}
                          outerRadius={82}
                          stroke="none"
                        >
                          {openClosedData.map((item, index) => (
                            <Cell key={index} fill={item.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-[22px] font-bold text-slate-800">
                        {dashboardSummary.totalCases}
                      </div>

                      <div className="text-[14px] font-semibold text-slate-400">
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
                  <h3 className="mb-5 text-[13px] font-bold text-slate-800">
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
                  {dashboardDateRange}
                </div>

                <div className="mt-4 h-[90px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={recoveryTrendData}
                      margin={{ top: 5, right: 10, left: -30, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRecovery"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#5ED3AF"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#5ED3AF"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="0"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis dataKey="name" hide={true} />
                      <YAxis hide={true} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        // formatter={(value) => `$${value.toFixed(2)}M`}
                        formatter={(value) => [
                          `$${Number(value).toFixed(2)}M`,
                          "Recovery",
                        ]}
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
              {/* CATEGORY BREAKDOWN */}
              <div className={`col-span-12 md:col-span-6 ${cardClass}`}>
                <h3 className="mb-5 text-[13px] font-bold text-slate-800">
                  CATEGORY BREAKDOWN
                </h3>

                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {categoryBreakdownData.map((item, index) => {
                    const widthPercent = (item.groups / maxGroups) * 100;

                    return (
                      <div key={`${item.name}-${index}`} className="mb-5">
                        <div className="flex items-start justify-between gap-2">
                          {/* Left Section */}
                          <div className="flex items-center gap-1.5 min-w-[140px]">
                            <span
                              className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: item.color,
                              }}
                            />

                            <span className="text-xs font-medium text-slate-800 truncate">
                              {item.name}
                            </span>
                          </div>

                          {/* Right Section */}
                          <div className="flex items-center gap-1 text-[10px] text-slate-600 text-right flex-wrap justify-end">
                            <span className="font-medium text-slate-800">
                              {item.groups}{" "}
                              {item.groups === 1 ? "group" : "groups"}
                            </span>

                            <span>
                              ({item.records}{" "}
                              {item.records === 1 ? "record" : "records"})
                            </span>

                            <span>|</span>

                            <span className="font-normal text-slate-700">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              }).format(item.amount)}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                          <div
                            className="h-2 rounded-full transition-all duration-700"
                            style={{
                              width: `${widthPercent}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TIMELINE SCATTER */}
              <div className={`col-span-12 md:col-span-6 ${cardClass}`}>
                <div className="">
                  <h3 className="mb-5 text-[13px] font-bold text-slate-800">
                    Timeline: Date vs Amount
                  </h3>

                  <div className="flex items-center mt-3 mb-3 gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      <span>High</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-amber-500" />
                      <span>Medium</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Low</span>
                    </div>
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 5,
                        left: 0,
                        bottom: 25,
                      }}
                    >
                      <CartesianGrid
                        stroke="#E5E7EB"
                        strokeDasharray="4 4"
                        vertical={true}
                        horizontal={true}
                      />
                      <XAxis
                        type="number"
                        dataKey="monthIndex"
                        domain={[5, 10]}
                        ticks={[5, 6, 7, 8, 9, 10]}
                        tickFormatter={(value) => {
                          const months = {
                            5: "May",
                            6: "Jun",
                            7: "Jul",
                            8: "Aug",
                            9: "Sep",
                            10: "Oct",
                          };
                          return months[value] || "";
                        }}
                        tickLine={false}
                        axisLine={{ stroke: "#CBD5E1" }}
                      />

                      <YAxis
                        type="number"
                        dataKey="amount"
                        tick={{
                          fontSize: 11,
                          fill: "#64748B",
                        }}
                        tickLine={false}
                        axisLine={{ stroke: "#CBD5E1" }}
                        tickFormatter={(value) =>
                          `${Math.round(value / 1000)}k`
                        }
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;

                          const row = payload[0].payload;

                          return (
                            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                              <div className="font-semibold">
                                {row.monthName}
                              </div>

                              <div>Risk: {row.risk}</div>

                              <div>
                                Amount: ${Number(row.amount).toLocaleString()}
                              </div>

                              <div>Records: {row.records}</div>
                            </div>
                          );
                        }}
                      />
                      <Scatter
                        name="High"
                        data={timelineChartData.filter(
                          (item) => item.risk === "High",
                        )}
                        fill="#EF4444"
                      />

                      <Scatter
                        name="Medium"
                        data={timelineChartData.filter(
                          (item) => item.risk === "Medium",
                        )}
                        fill="#F59E0B"
                      />

                      <Scatter
                        name="Low"
                        data={timelineChartData.filter(
                          (item) => item.risk === "Low",
                        )}
                        fill="#22C55E"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 h-full">
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
                {dashboardDateRange}
              </div>

              <div className="mt-3 h-[70px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={investigationCycleData}
                    margin={{ top: 5, right: 10, left: -30, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorInvestigation"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6886D1"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6886D1"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="0"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis dataKey="name" hide={true} />
                    <YAxis hide={true} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
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
                  <svg viewBox="0 0 220 140" className="w-full h-full">
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
                      // strokeDasharray={`${parseFloat(dashboardSummary.slaCompliance) || 0} 100`}
                      strokeDasharray={`${parseFloat(dashboardSummary.slaCompliance) || 0} 100`}
                    />
                  </svg>

                  {/* Center Content */}
                  <div className="absolute top-[90px] inset-0 flex flex-col items-center justify-center">
                    <div className="text-[28px] font-bold leading-none text-[#1E293B]">
                      {dashboardSummary.slaCompliance}
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

            {/* VENDOR CONCENTRATION */}
            {/* VENDOR CONCENTRATION */}
            <div className={cardClass}>
              <div className="">
                <h3 className="text-[14px] font-bold text-slate-700">
                  Vendor Concentration (Top 10 by $ at Risk)
                </h3>

                <div className="mt-3 mb-3 flex gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-orange-500" />
                    <span>High</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span>Medium</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-slate-500" />
                    <span>Low</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {vendorConcentrationData.slice(0, 10).map((item, index) => {
                  const percentage = Number(item.percentage || 0);
                  const cardWidth =
                    percentage >= 25
                      ? "calc(66.666% - 8px)"
                      : percentage >= 10
                        ? "calc(33.333% - 8px)"
                        : "calc(33.333% - 8px)";

                  const bgColor =
                    item.risk === "High"
                      ? "bg-orange-600"
                      : item.risk === "Medium"
                        ? "bg-yellow-500"
                        : "bg-slate-500";

                  return (
                    <div
                      key={`${item.vendor}-${index}`}
                      style={{
                        width: cardWidth,
                        minHeight: "90px",
                      }}
                      className={`
                        ${bgColor}
                        rounded-2xl
                        p-2
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                      `}
                    >
                      <div className="text-[12px] font-medium opacity-90 truncate">
                        {item.vendor}
                      </div>

                      <div className="mt-2 text-[16px] leading-none break-words font-semibold">
                        ${Number(item.amount || 0).toLocaleString()}
                      </div>

                      <div className="mt-2 flex items-end justify-between">
                        <div className="text-[12px] opacity-90">
                          {item.records} rec
                        </div>

                        <div className="text-[12px]  opacity-90">
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
