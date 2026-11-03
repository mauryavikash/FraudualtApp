"use client";

import React, { useEffect, useMemo, useState } from "react";
import { RecoveriesKpiCards } from "@/components/recoveries/RecoveriesKpiCards";
import { RecoveriesDetails } from "@/components/recoveries/RecoveriesDetails";
import { RecoveriesHeader } from "@/components/recoveries/RecoveriesHeader";
import RecoveriesCharts from "@/components/recoveries/RecoveriesCharts";
import RecoveryPipelineOverview from "@/components/recoveries/RecoveryPipelineOverview";
import RecoveriesTable from "@/components/recoveries/RecoveriesTable";
import { LoadingState } from "@/components/common/LoadingState";
import { getRecoveries } from "@/app/lib/api";

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

  const amountValue = Number(recovery.amount ?? 0);
  return {
    recoveryId: recovery.recoveryId,
    caseId: recovery.caseId,
    type: recovery.type?.replaceAll("_", " "),
    status: recovery.status?.replaceAll("_", " "),
    vendor: recovery.vendor || "-",
    amount: formatCurrency(amountValue),
    amountValue: Number.isFinite(amountValue) ? amountValue : 0,
    recoveryDate: formatDate(recovery.paymentDate),
    slaDue: formatDate(recovery.slaDue),
    investigator: recovery.investigator || "-",
    sourceSystem: recovery.sourceSystem || "-",
    recoveryMethod: recovery.recoveryMethod || "-",
    originalPaymentId: recovery.originalPaymentId || "-",
    paymentDate: formatDate(recovery.paymentDate),
    recoveredOn: formatDate(recovery.recoveredOn),
    notes: recovery.notes || "-",
    auditRemarks: recovery.auditRemarks ?? recovery.audit_remarks ?? "-",
    invoiceImageUrl: recovery.invoice_image_url || "",
  };
}

export default function Recoveries() {
  const [recoveriesData, setRecoveriesData] = useState(null);
  const [selectedRecoveryId, setSelectedRecoveryId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getRecoveries()
      .then((data) => {
        if (isMounted) {
          setRecoveriesData(data?.data ?? data);
        }
      })
      .catch((error) => {
        console.error("Recoveries API Error:", error);
        if (isMounted) {
          setRecoveriesData({});
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const recoveryData = useMemo(
    () =>
      (recoveriesData?.recoveryDetails ?? [])
        .map(normalizeRecovery)
        .filter(Boolean),
    [recoveriesData],
  );

  const selectedRecovery =
    recoveryData.find(
      (recovery) =>
        String(recovery.recoveryId) === String(selectedRecoveryId),
    ) ??
    recoveryData[0] ??
    null;

  if (!recoveriesData) {
    return <LoadingState label="Loading recoveries..." />;
  }

  return (
    <div>
      <RecoveriesHeader data={recoveriesData.meta} />
      <div className="mt-4">
        <RecoveriesKpiCards data={recoveriesData.recoveryKpis} />
      </div>

      <div className="mt-4">
        <RecoveryPipelineOverview
          pipeline={recoveriesData.recoveryPipeline}
          aging={recoveriesData.recoveryAging}
          priorities={recoveriesData.recoveriesByPriority}
          metrics={recoveriesData.recoveryMetrics}
        />
        <div className="mt-4 grid grid-cols-12 items-stretch gap-4">
          <div className="col-span-12 lg:col-span-8">
            <RecoveriesTable
              recoveries={recoveryData}
              selectedRecoveryId={selectedRecovery?.recoveryId}
              onSelectRecovery={(recovery) =>
                setSelectedRecoveryId(recovery?.recoveryId ?? null)
              }
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <RecoveriesDetails
              recovery={selectedRecovery}
              stages={recoveriesData.recoveryProgressStages}
              timeline={recoveriesData.recoveryTimeline}
              tabs={recoveriesData.detailTabs}
            />
          </div>
        </div>

        <div className="mt-4">
          <RecoveriesCharts
            summary={recoveriesData.recoverySummary}
            trend={recoveriesData.recoveryTrend}
            vendors={recoveriesData.vendorRecoveries}
          />
        </div>
      </div>
    </div>
  );
}
