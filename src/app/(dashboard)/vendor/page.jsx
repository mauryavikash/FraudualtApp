
"use client";

import React, { useEffect, useState } from "react";
import VendorTable from "@/components/vendor/VendorTable";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import VendorInsight from "@/components/vendor/VendorInsight";
import { VendorKpiCard } from "@/components/vendor/VendorKpiCard";
import VendorRiskControls from "@/components/vendor/VendorRiskControls";
import VendorExposureAnalytics from "@/components/vendor/VendorExposureAnalytics";
import VendorFindingsActions from "@/components/vendor/VendorFindingsActions";
import { LoadingState } from "@/components/common/LoadingState";
import { getVendors } from "@/app/lib/api";

export default function Vendor() {
  const [vendorData, setVendorData] = useState(null);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setLoadError(null);
      setVendorData(null);

      try {
        const response = await getVendors();

        if (isMounted) {
          setVendorData(response?.data ?? response ?? {});
        }
      } catch (error) {
        console.error("Vendor API Error:", error);

        if (isMounted) {
          setLoadError(
            error?.response?.data?.message ??
              error?.message ??
              "Unable to load vendor data.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  const vendorRecords = Array.isArray(vendorData?.vendorRecords)
    ? vendorData.vendorRecords
    : [];

  if (loading) {
    return <LoadingState label="Loading vendor data..." />;
  }

  if (loadError) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-white p-6 text-center"
      >
        <p className="text-sm text-red-700">{loadError}</p>
        <button
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const selectedVendor =
    vendorRecords.find(
      (vendor) => String(vendor.vendorId) === String(selectedVendorId),
    ) ?? null;

  return (
    <div>
      {/* HEADER */}
      <VendorHeader data={vendorData?.meta} />

      {/* KPI */}
      <VendorKpiCard data={vendorData?.vendorKpis} />

      {/* CONTENT */}
      <div className="mt-4 grid grid-cols-12 gap-4 items-stretch">
        <VendorTable
          vendors={vendorRecords}
          selectedVendorId={selectedVendorId}
          onSelectVendor={setSelectedVendorId}
        />

        <div className="col-span-12 lg:col-span-4">
          <VendorInsight vendor={selectedVendor} />
        </div>
      </div>

      {/* <VendorRiskControls data={vendorData?.riskDrivers} /> */}

      <VendorRiskControls
  data={vendorData?.riskDrivers}
  exposureData={vendorData?.vendorOverview}
/>

      {/* <VendorExposureAnalytics
        data={vendorData?.vendorOverview}
      /> */}

      {/* <VendorFindingsActions
        issues={vendorData?.vendorIssues}
        findings={vendorData?.vendorFindings}
        actions={vendorData?.recommendedActions}
      /> */}
    </div>
  );
}