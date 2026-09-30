"use client";
import React, { useEffect, useState } from "react";
import  VendorTable  from '@/components/vendor/VendorTable';
import { VendorHeader } from '@/components/vendor/VendorHeader';
import  VendorInsight  from '@/components/vendor/VendorInsight';
import { VendorKpiCard }  from '@/components/vendor/VendorKpiCard';
import VendorRiskControls from '@/components/vendor/VendorRiskControls';
import VendorExposureAnalytics from '@/components/vendor/VendorExposureAnalytics';
import VendorFindingsActions from '@/components/vendor/VendorFindingsActions';
import { LoadingState } from "@/components/common/LoadingState";
import { getVendors } from "@/app/lib/api";

export default function Vendor() {
  const [vendorData, setVendorData] = useState(null);

  const vendorRecords = [
  { vendorId: "7034512", vendorName: "ABC Solutions", status: "Active", risk: "High Risk", totalAmount: "$96.24K", issues: 8, summary: { invoices: 48, exceptions: 8, totalAmount: "$96,240", exceptionAmount: "$96,240" }, deviations: [{ type: "currency", title: "Currency Deviations", count: 5 }, { type: "invoice", title: "Invoice No. Deviations", count: 3 }, { type: "recurring", title: "Recurring Payment Deviations", count: 2 }], invoices: [{ id: "abc-1", posted: "2026-05-12", invoiceNo: "INV-2026-Q1-1001", docNo: "DOC-10265", invDate: "2026-05-12", amount: "$13,200", category: "High Corr.", risk: "High", deviation: "currency" }, { id: "abc-2", posted: "2026-05-12", invoiceNo: "INV-2026-Q1-1002", docNo: "DOC-11118", invDate: "2026-05-12", amount: "$13,200", category: "High Corr.", risk: "High", deviation: "currency" }, { id: "abc-3", posted: "2026-02-23", invoiceNo: "INV-2026-Q1-1003", docNo: "DOC-10497", invDate: "2026-02-23", amount: "$4,320", category: "High Corr.", risk: "High", deviation: "invoice" }, { id: "abc-4", posted: "2026-02-07", invoiceNo: "INV-4402", docNo: "DOC-10224", invDate: "2026-02-07", amount: "€6,240", category: "Exact Match", risk: "High", deviation: "recurring" }, { id: "abc-5", posted: "2026-02-19", invoiceNo: "INV-2026-Q1-1005", docNo: "DOC-10283", invDate: "2026-02-19", amount: "$4,320", category: "High Corr.", risk: "High", deviation: "invoice" }] },
  { vendorId: "7056789", vendorName: "Global Supplies Inc.", status: "Active", risk: "High Risk", totalAmount: "$51.35K", issues: 4, summary: { invoices: 21, exceptions: 4, totalAmount: "$51,350", exceptionAmount: "$18,420" }, deviations: [{ type: "currency", title: "Currency Deviations", count: 2 }, { type: "invoice", title: "Invoice No. Deviations", count: 1 }, { type: "recurring", title: "Recurring Payment Deviations", count: 1 }], invoices: [{ id: "global-1", posted: "2026-05-06", invoiceNo: "GS-2026-8991", docNo: "DOC-20941", invDate: "2026-05-05", amount: "$8,760", category: "High Corr.", risk: "High", deviation: "currency" }, { id: "global-2", posted: "2026-04-21", invoiceNo: "GS-2026-8988", docNo: "DOC-20889", invDate: "2026-04-20", amount: "$4,320", category: "High Corr.", risk: "Medium", deviation: "invoice" }] },
  { vendorId: "7600044", vendorName: "Alpha Traders", status: "Under Review", risk: "Medium Risk", totalAmount: "$18.0K", issues: 4, summary: { invoices: 12, exceptions: 4, totalAmount: "$18,000", exceptionAmount: "$9,500" }, deviations: [{ type: "currency", title: "Currency Deviations", count: 4 }], invoices: [{ id: "alpha-1", posted: "2026-05-02", invoiceNo: "AT-04281", docNo: "DOC-80921", invDate: "2026-05-01", amount: "$9,500", category: "High Corr.", risk: "Medium", deviation: "currency" }] },
  { vendorId: "7089123", vendorName: "TechWorks LLC", status: "Active", risk: "High Risk", totalAmount: "$80.2K", issues: 4, summary: { invoices: 37, exceptions: 4, totalAmount: "$80,200", exceptionAmount: "$21,400" }, deviations: [{ type: "recurring", title: "Recurring Payment Deviations", count: 4 }], invoices: [{ id: "tech-1", posted: "2026-05-10", invoiceNo: "TW-990122", docNo: "DOC-43902", invDate: "2026-05-09", amount: "$21,400", category: "Exact Match", risk: "High", deviation: "recurring" }] },
];
 const [selectedVendorId, setSelectedVendorId] = useState(vendorRecords[0].vendorId);

  useEffect(() => {
    let isMounted = true;

    getVendors().then((data) => {
      if (isMounted) {
        setVendorData(data?.data ?? data);
      }
    }).catch(() => {
      if (isMounted) {
        setVendorData({});
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!vendorData) {
    return <LoadingState label="Loading vendor data..." />;
  }

  const selectedVendor = vendorRecords.find((vendor) => vendor.vendorId === selectedVendorId) ?? vendorRecords[0];

  return (
    <div>
          {/* HEADER */}
           <VendorHeader/>
          {/* KPI */}
          <VendorKpiCard data={vendorData.vendorKpis} />
          {/* CONTENT */}

          {/* <div className="grid grid-cols-12 gap-4 mt-4 items-stretch">
            <VendorTable data={vendorData.alerts} totalAlerts={vendorData.alertSummary?.totalAlerts} />
            <div className="col-span-12 lg:col-span-4 flex">
              <VendorInsight data={vendorData.alertSummary} />
            </div>
          </div> */}
          <div className="mt-4 grid grid-cols-12 gap-4 items-stretch">
            <VendorTable vendors={vendorRecords} selectedVendorId={selectedVendorId}
            onSelectVendor={setSelectedVendorId} />
            <div className="col-span-12 lg:col-span-4">
              <VendorInsight vendor={selectedVendor} />
            </div>
          </div>
          <VendorRiskControls data={vendorData.riskDrivers} />
          <VendorExposureAnalytics data={vendorData.vendorOverview} />
          <VendorFindingsActions
            issues={vendorData.vendorIssues}
            findings={vendorData.vendorFindings}
            actions={vendorData.recommendedActions}
          />
        </div>
  );
}