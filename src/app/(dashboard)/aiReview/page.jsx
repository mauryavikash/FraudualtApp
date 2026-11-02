"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AiReviewKpi } from "@/components/aiReview/AiReviewKpi";
import { AiReviewDetails } from "@/components/aiReview/AiReviewDetails";
import { AiReviewHeader } from "@/components/aiReview/AiReviewHeader";
import { AiReviewTable } from "@/components/aiReview/AiReviewTable";
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
    riskScore: recovery.riskScore,
    confidence: recovery.confidence,
  };
}

export default function AiReview() {
  const [recoveriesData, setRecoveriesData] = useState(null);
  const [selectedRecovery, setSelectedRecovery] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getRecoveries()
      .then((data) => {
        if (!isMounted) return;

        const payload = data?.data ?? data;

        setRecoveriesData(payload);

        const normalizedData = (
          payload?.recoveryDetails || []
        ).map(normalizeRecovery);

        setSelectedRecovery(
          normalizedData.length > 0
            ? normalizedData[0]
            : null
        );
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

  if (!recoveriesData) {
    return (
      <LoadingState label="Loading recoveries..." />
    );
  }

  return (
    <div>
      <AiReviewHeader data={recoveriesData.meta} />

      <div className="mt-4">
        <AiReviewKpi
          data={recoveriesData.recoveryKpis}
        />
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-12 gap-4 items-stretch">

          {/* Table Section */}

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
              <AiReviewTable
                recoveryData={recoveryData}
                selectedRecovery={selectedRecovery}
                setSelectedRecovery={
                  setSelectedRecovery
                }
              />
            </div>
          </div>

          {/* Details Section */}

          <div className="col-span-12 lg:col-span-4">
            <AiReviewDetails
              recovery={selectedRecovery}
              stages={
                recoveriesData.recoveryProgressStages
              }
              timeline={
                recoveriesData.recoveryTimeline
              }
              tabs={recoveriesData.detailTabs}
            />
          </div>

        </div>
      </div>
    </div>
  );
}