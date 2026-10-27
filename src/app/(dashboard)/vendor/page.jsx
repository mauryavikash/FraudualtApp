
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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await getVendors();

        if (isMounted) {
          setVendorData(response?.data ?? response);
        }
      } catch (error) {
        console.error("Vendor API Error:", error);

        if (isMounted) {
          setVendorData({});
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // CHANGE ONLY THIS PART
  const vendorRecords = vendorData?.vendorRecords || [];

  useEffect(() => {
    if (
      vendorRecords.length > 0 &&
      !selectedVendorId
    ) {
      setSelectedVendorId(vendorRecords[0].vendorId);
    }
  }, [vendorRecords, selectedVendorId]);

  if (!vendorData) {
    return <LoadingState label="Loading vendor data..." />;
  }

  const selectedVendor =
    vendorRecords.find(
      (vendor) => vendor.vendorId === selectedVendorId
    ) ||
    vendorRecords[0] ||
    null;

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

      <VendorRiskControls data={vendorData?.riskDrivers} />

      <VendorExposureAnalytics
        data={vendorData?.vendorOverview}
      />

      <VendorFindingsActions
        issues={vendorData?.vendorIssues}
        findings={vendorData?.vendorFindings}
        actions={vendorData?.recommendedActions}
      />
    </div>
  );
}