"use client";
import React from 'react';
import { VendorTable } from '@/components/vendor/VendorTable';
import { VendorHeader } from '@/components/vendor/VendorHeader';
import { VendorInsight } from '@/components/vendor/VendorInsight';
import { VendorKpiCard }  from '@/components/vendor/VendorKpiCard';

export default function Vendor() {
  return (
    <div>
          {/* HEADER */}
           <VendorHeader/>
          {/* KPI */}
          <VendorKpiCard />
          {/* CONTENT */}

          <div className="grid grid-cols-12 gap-4 mt-4 items-stretch">
    
            {/* TABLE */}
            <VendorTable/>
            {/* RIGHT PANEL */}
            <div className="col-span-12 xl:col-span-4 flex">
              <VendorInsight />
            </div>
    
          </div>
        </div>
  );
}