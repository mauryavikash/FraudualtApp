
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AiRecommendationKpi } from "@/components/aiRecommendation/AiRecommendationKpi";
import { AiRecommendationDetails } from "@/components/aiRecommendation/AiRecommendationDetails";
import { AiRecommendationHeader } from "@/components/aiRecommendation/AiRecommendationHeader";
import { AiRecommendationTable } from "@/components/aiRecommendation/AiRecommendationTable";
import { LoadingState } from "@/components/common/LoadingState";
import { getRecoveries } from "@/app/lib/api";

const TABS = [
  "All Reviews (5)",
  "High Risk (6)",
//   "Human Review Required (4)",
  "Duplicate Risk (3)",
//   "OCR / Posting Mismatch (2)",
  "Audit & Compliance (3)",
  "SLA At Risk (4)",
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0));

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString() : "-";

function normalizeRecovery(recovery) {
  if (!recovery) return null;

  return {
    recoveryId: recovery.recoveryId,
    caseId: recovery.caseId,
    type: recovery.type?.replaceAll("_", " "),
    status: recovery.status?.replaceAll("_", " "),
    vendor: recovery.vendor || "-",
    amount: formatCurrency(recovery.amount),
    recoveryDate: formatDate(recovery.paymentDate),
    slaDue: formatDate(recovery.slaDue),
    investigator: recovery.investigator || "-",
    sourceSystem: recovery.sourceSystem || "-",
    recoveryMethod: recovery.recoveryMethod || "-",
    originalPaymentId: recovery.originalPaymentId || "-",
    paymentDate: formatDate(recovery.paymentDate),
    recoveredOn: formatDate(recovery.recoveredOn),
    notes: recovery.notes || "-",
    invoiceImageUrl: recovery.invoice_image_url || "",
  };
}

function FilterSelect({ label, children, ...props }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#475569] mb-2">{label}</p>
      <select
        {...props}
        className="w-full h-9 rounded-xl border border-[#D9E1EA] px-3 text-[13px] text-[#334155] bg-white"
      >
        {children}
      </select>
    </div>
  );
}

export default function AiReview() {
  const [activeTab, setActiveTab] = useState("All Recoveries");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [investigatorFilter, setInvestigatorFilter] = useState("All");
  const [recoveriesData, setRecoveriesData] = useState(null);
  const [selectedRecovery, setSelectedRecovery] = useState(null);
  const pageSize = 8;

  useEffect(() => {
    let isMounted = true;

    getRecoveries()
      .then((data) => {
        if (isMounted) {
          const payload = data?.data ?? data;
          setRecoveriesData(payload);
          // setSelectedRecovery(normalizeRecovery(payload.recoveryDetails));
          const normalizedRecoveries = (payload.recoveryDetails || []).map(
            normalizeRecovery,
          );
          setSelectedRecovery(
            normalizedRecoveries.length > 0 ? normalizedRecoveries[0] : null,
          );
        }
      })
      .catch(() => {
        if (isMounted) {
          setRecoveriesData({});
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const recoveryData = useMemo(() => {
    return (recoveriesData?.recoveryDetails || [])
      .map(normalizeRecovery)
      .filter(Boolean);
  }, [recoveriesData]);

  const filteredData = useMemo(() => {
    return recoveryData.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All Recoveries" || item.status === activeTab;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesInvestigator =
        investigatorFilter === "All" ||
        item.investigator === investigatorFilter;

      return (
        matchesSearch &&
        matchesTab &&
        matchesStatus &&
        matchesType &&
        (sourceFilter === "All" || item.sourceSystem === sourceFilter) &&
        matchesInvestigator
      );
    });
  }, [
    search,
    activeTab,
    statusFilter,
    typeFilter,
    sourceFilter,
    investigatorFilter,
    recoveryData,
  ]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  if (!recoveriesData) {
    return <LoadingState label="Loading recoveries..." />;
  }

  return (
    <div>
      {/* HEADER */}
      <AiRecommendationHeader data={recoveriesData.meta} />
      {/* KPI */}
      <div className="mt-4">
        <AiRecommendationKpi data={recoveriesData.recoveryKpis} />
      </div>

      <div className="mt-4">
        <div className="mt-4 grid grid-cols-12 gap-4 items-stretch">
          <div className="col-span-12 lg:col-span-8">
            <div
              className="
                h-full
                flex
                flex-col
                bg-white
                rounded-[16px]
                border
                border-[#D9E1EA]
                shadow-[0px_2px_8px_rgba(15,23,42,0.05)]
                overflow-hidden
              "
            >
              {/* Tabs */}
              <div className="px-5 pt-4 border-b border-[#E2E8F0] overflow-x-auto">
                <div className="flex gap-5 whitespace-nowrap">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setPage(1);
                      }}
                      className={`pb-3 text-[12px] font-medium transition-all ${
                        activeTab === tab
                          ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                          : "text-[#475569]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="px-5 py-4 border-b border-[#E2E8F0] bg-white">
                <div className="grid grid-cols-6 gap-3">
                  <FilterSelect label="Risk Level">
                    <option>All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </FilterSelect>

                  <FilterSelect label="Exception Type">
                    <option>All</option>
                    <option>Duplicate</option>
                    <option>OCR</option>
                    <option>Bank</option>
                    <option>Tax</option>
                  </FilterSelect>

                  <FilterSelect label="Human Review Reason">
                    <option>All</option>
                    <option>Duplicate Risk</option>
                    <option>Bank Mismatch</option>
                    <option>OCR Confidence</option>
                  </FilterSelect>

                  <FilterSelect label="Supplier">
                    <option>All</option>
                  </FilterSelect>

                  <div>
                    <p className="text-[11px] font-semibold text-[#475569] mb-2">
                      Amount Range
                    </p>

                    <div className="flex gap-2">
                      <input
                        placeholder="Min"
                        className="w-full h-9 rounded-md border border-[#D9E1EA] px-3 text-[12px]"
                      />

                      <input
                        placeholder="Max"
                        className="w-full h-9 rounded-md border border-[#D9E1EA] px-3 text-[12px]"
                      />
                    </div>
                  </div>

                  <div />

                  <FilterSelect label="Assigned Reviewer">
                    <option>All</option>
                  </FilterSelect>

                  <FilterSelect label="SLA Status">
                    <option>All</option>
                  </FilterSelect>

                  <FilterSelect label="Source System">
                    <option>All</option>
                    <option>SAP</option>
                    <option>Oracle</option>
                  </FilterSelect>

                  <FilterSelect label="AI Confidence">
                    <option>All</option>
                    <option>90% +</option>
                    <option>80% +</option>
                    <option>70% +</option>
                  </FilterSelect>

                  <FilterSelect label="Business Rule">
                    <option>All</option>
                  </FilterSelect>

                  {/* <div className="flex items-end gap-3">
                    <button className="h-9 px-4 text-[#2563EB] text-sm font-medium">
                      More Filters
                    </button>

                    <button className="h-9 px-4 text-[#2563EB] text-sm font-medium">
                      Reset
                    </button>

                    <button className="h-9 px-6 rounded-md bg-[#2563EB] text-white font-semibold">
                      Search
                    </button>
                  </div> */}
                </div>
              </div>
              <AiRecommendationTable
                paginatedData={paginatedData}
                selectedRecovery={selectedRecovery}
                setSelectedRecovery={setSelectedRecovery}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                filteredData={filteredData}
                pageSize={pageSize}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <AiRecommendationDetails
              recovery={selectedRecovery}
              stages={recoveriesData.recoveryProgressStages}
              timeline={recoveriesData.recoveryTimeline}
              tabs={recoveriesData.detailTabs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
