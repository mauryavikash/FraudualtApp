"use client";

import React, { useEffect, useMemo, useState } from "react";
import CasesTable, { CASE_TABS } from "@/components/cases/CasesTable";
import { CasesKpiCards } from "@/components/cases/CasesKpiCards";
import { CasesDetails } from "@/components/cases/CasesDetails";
import { CasesHeader } from "@/components/cases/CasesHeader";
import { LoadingState } from "@/components/common/LoadingState";
import { getCases } from "@/app/lib/api";

export default function CasesPage() {
  const loggedInUser = useMemo(() => {
    if (typeof window === "undefined") return null;

    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);

  const userName = loggedInUser?.first_name || loggedInUser?.userName || "User";
  const [activeTab, setActiveTab] = useState(CASE_TABS[0]);
  const [casesData, setCasesData] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getCases()
      .then((data) => {
        if (isMounted) {
          setCasesData(data?.data ?? data);
        }
      })
      .catch((error) => {
        console.error("Cases API Error:", error);
        if (isMounted) {
          setCasesData({ caseDetails: [], caseKpis: [], casesOverview: {} });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!casesData) {
    return <LoadingState label="Loading cases..." />;
  }

  const tableData = Array.isArray(casesData.caseDetails)
    ? casesData.caseDetails
    : [];
  const selectedCaseData =
    selectedCase ?? tableData[0] ?? null;

  return (
    <div>
      <CasesHeader data={casesData.meta} />
      <CasesKpiCards data={casesData.caseKpis} />
      <div className="mt-4 grid grid-cols-12 items-stretch gap-4">
        <div className="col-span-12 flex lg:col-span-8">
          <CasesTable
            cases={tableData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedCaseId={selectedCase?.pair_id}
            onSelectCase={setSelectedCase}
          />
        </div>
        <div className="col-span-12 flex lg:col-span-4">
          <CasesDetails caseData={selectedCaseData} userName={userName} />
        </div>
      </div>
    </div>
  );
}
