"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AiReviewKpi } from "@/components/aiReview/AiReviewKpi";
import { AiReviewDetails } from "@/components/aiReview/AiReviewDetails";
import { AiReviewHeader } from "@/components/aiReview/AiReviewHeader";
import { AiReviewTable } from "@/components/aiReview/AiReviewTable";
import { LoadingState } from "@/components/common/LoadingState";
import { getAiReview } from "@/app/lib/api";

const firstValue = (record, ...keys) => {
  for (const key of keys) {
    if (record?.[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }
  return undefined;
};

const formatCurrency = (value) => {
  if (value === undefined || value === null || value === "") return "-";
  const amount = Number(String(value).replace(/[$,]/g, ""));
  return Number.isFinite(amount)
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(amount)
    : String(value);
};

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString() : "-";

function getReviewDetailValue(detail, ...keys) {
  const expected = new Set(keys.map((key) => key.toLowerCase()));
  const entry = Object.entries(detail ?? {}).find(([key, value]) => {
    return expected.has(key.toLowerCase()) && value !== undefined && value !== null;
  });
  return entry?.[1];
}

function normalizeReviewDetail(detail) {
  return {
    ...detail,
    field: getReviewDetailValue(detail, "field", "name", "label") ?? "-",
    ocrValue:
      getReviewDetailValue(
        detail,
        "aiOcrExtracted",
        "ocrExtracted",
        "ocrValue",
        "extractedValue",
      ) ?? "-",
    erpValue:
      getReviewDetailValue(
        detail,
        "erpPosting",
        "erpValue",
        "postingValue",
        "systemValue",
      ) ?? "-",
    ocrConfidence:
      getReviewDetailValue(detail, "ocrConfidence", "aiOcrConfidence") ?? "-",
    matchStatus:
      getReviewDetailValue(detail, "matchStatus", "status", "validationStatus") ??
      "-",
  };
}

function normalizeReview(record) {
  if (!record) return null;

  const invoice = firstValue(record, "invoice", "invoiceDetails", "invoice_details") ?? {};
  const reviewDetails = firstValue(record, "ReviewDetails", "reviewDetails", "review_details");
  const detailRows = Array.isArray(reviewDetails)
    ? reviewDetails.map(normalizeReviewDetail)
    : [];
  const invoiceNumberDetail = detailRows.find(
    (detail) => String(detail.field).toLowerCase() === "invoice number",
  );
  const rawAmount = firstValue(
    record,
    "invoiceAmount",
    "invoice_amount",
    "amountValue",
    "amount",
    "amountUsd",
    "amount_usd",
  ) ?? firstValue(invoice, "amount", "invoiceAmount", "invoice_amount");
  const rawExceptionType = firstValue(
    record,
    "exceptionType",
    "exception_type",
    "reviewType",
    "review_type",
    "type",
  );
  const riskScore = firstValue(
    record,
    "riskScore",
    "risk_score",
    "aiRiskScore",
    "ai_risk_score",
    "aiRisk",
  );
  const riskLevel = firstValue(
    record,
    "riskLevel",
    "risk_level",
    "riskCategory",
    "risk_category",
  );
  const confidence = firstValue(
    record,
    "confidence",
    "aiConfidence",
    "ai_confidence",
    "aiConfidenceScore",
    "ai_confidence_score",
  );
  const numericConfidence = Number(confidence);
  const normalizedConfidence =
    Number.isFinite(numericConfidence) && numericConfidence <= 1
      ? numericConfidence * 100
      : confidence;
  const confidenceValue =
    typeof confidence === "string" && confidence.includes("%")
      ? confidence
      : confidence === undefined
        ? "-"
        : `${normalizedConfidence}%`;

  return {
    ...record,
    aiReviewId: firstValue(
      record,
      "aiReviewId",
      "ai_review_id",
      "reviewId",
      "review_id",
      "recoveryId",
      "caseId",
      "case_id",
      "pairId",
      "pair_id",
      "invoiceId",
      "invoice_id",
      "id",
    ),
    invoiceId: firstValue(
      record,
      "invoiceId",
      "invoice_id",
      "invoiceNumber",
      "invoice_number",
    ) ??
      firstValue(invoice, "invoiceId", "invoice_id", "invoiceNumber", "invoice_number") ??
      invoiceNumberDetail?.ocrValue ??
      invoiceNumberDetail?.erpValue ??
      "-",
    supplier: firstValue(
      record,
      "supplier",
      "supplierName",
      "supplier_name",
      "vendor",
      "vendorName",
      "vendor_name",
    ) ?? firstValue(invoice, "supplier", "supplierName", "supplier_name", "vendor_name") ?? "-",
    invoiceAmount: formatCurrency(rawAmount),
    amountValue: Number(String(rawAmount ?? 0).replace(/[$,]/g, "")),
    exceptionType: Array.isArray(rawExceptionType)
      ? rawExceptionType
          .map((item) => item?.code ?? item?.label ?? item)
          .join(", ")
      : rawExceptionType && typeof rawExceptionType === "object"
        ? rawExceptionType.code ?? rawExceptionType.label ?? "-"
        : rawExceptionType ?? "-",
    riskScore: Number.isFinite(Number(riskScore)) ? Number(riskScore) : null,
    riskLevel:
      riskLevel ??
      (Number.isFinite(Number(riskScore))
        ? Number(riskScore) >= 90
          ? "HIGH"
          : Number(riskScore) >= 60
            ? "MEDIUM"
            : "LOW"
        : "-"),
    confidence: confidenceValue,
    humanReviewRequired:
      firstValue(record, "humanReviewRequired", "human_review_required") ??
      undefined,
    humanReviewTrigger: firstValue(
      record,
      "humanReviewTrigger",
      "human_review_trigger",
      "reviewReason",
      "review_reason",
      "trigger",
    ) ?? "-",
    sla: formatDate(firstValue(record, "sla", "slaDue", "sla_due", "dueDate", "due_date")),
    assignedTo: firstValue(
      record,
      "assignedTo",
      "assigned_to",
      "assignedReviewer",
      "assigned_reviewer",
      "reviewer",
    ) ?? "-",
    status: firstValue(record, "status", "reviewStatus", "review_status") ?? "-",
    nextAction: firstValue(record, "nextAction", "next_action", "recommendation") ?? "-",
    sourceSystem: firstValue(record, "sourceSystem", "source_system") ?? "-",
    reviewReason: firstValue(record, "reviewReason", "review_reason", "reason") ?? "-",
    poNumber: firstValue(record, "poNumber", "po_number", "purchaseOrder", "purchase_order") ?? "-",
    aiFindings: firstValue(record, "aiFindings", "ai_findings", "findings") ?? [],
    recommendedSteps: firstValue(record, "recommendedSteps", "recommended_steps") ?? [],
    aiRecommendation:
      firstValue(record, "aiRecommendation", "ai_recommendation", "recommendation") ??
      "-",
    aiExplanation:
      firstValue(record, "aiExplanation", "ai_explanation", "explanation") ?? "-",
    reviewDetails: detailRows,
    invoiceImageUrl: firstValue(record, "invoiceImageUrl", "invoice_image_url") ?? "",
    auditTrail: firstValue(record, "auditTrail", "audit_trail", "auditLog") ?? [],
  };
}

function getReviewRecords(payload) {
  const possibleRecords = [
    ...(Array.isArray(payload) ? [payload] : []),
    payload?.aiReviews,
    payload?.ai_reviews,
    payload?.aiReview,
    payload?.records,
    payload?.results,
    payload?.aiReviewDetails,
    payload?.aiReviewDetail,
    payload?.ai_review_detail,
    payload?.ai_review_details,
    payload?.aiReviewRecords,
    payload?.ai_review_records,
    payload?.reviewDetails,
    payload?.review_details,
    payload?.reviewData,
    payload?.review_data,
    payload?.reviews,
    payload?.items,
    payload?.data,
  ];
  return possibleRecords.find(Array.isArray) ?? [];
}

export default function AiReview() {
  const [aiReviewData, setAiReviewData] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getAiReview()
      .then((response) => {
        if (isMounted) {
          setAiReviewData(response?.data ?? response ?? {});
        }
      })
      .catch((error) => {
        console.error("AI Review API Error:", error);
        if (isMounted) {
          setAiReviewData({});
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const reviews = useMemo(
    () => getReviewRecords(aiReviewData).map(normalizeReview).filter(Boolean),
    [aiReviewData],
  );
  const selectedReview =
    reviews.find(
      (review) => String(review.aiReviewId) === String(selectedReviewId),
    ) ??
    reviews[0] ??
    null;
  const kpis =
    aiReviewData?.aiReviewKpis ??
    aiReviewData?.ai_review_kpis ??
    aiReviewData?.reviewKpis ??
    aiReviewData?.kpis ??
    aiReviewData?.metrics ??
    [];

  if (!aiReviewData) {
    return <LoadingState label="Loading AI reviews..." />;
  }

  return (
    <div>
      <AiReviewHeader data={aiReviewData.meta ?? aiReviewData.metadata} />

      <div className="mt-4">
        <AiReviewKpi data={kpis} reviews={reviews} />
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-12 items-stretch gap-4">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#D9E1EA] bg-white shadow-[0px_2px_8px_rgba(15,23,42,0.05)]">
              <AiReviewTable
                reviews={reviews}
                selectedReview={selectedReview}
                onSelectReview={(review) =>
                  setSelectedReviewId(review?.aiReviewId ?? null)
                }
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <AiReviewDetails review={selectedReview} />
          </div>
        </div>
      </div>
    </div>
  );
}
