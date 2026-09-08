"use client";
import React from 'react';
import { AlertTable } from '@/components/alerts/AlertTable';
import { AlertHeader } from '@/components/alerts/AlertHeader';
import { AlertInsight } from '@/components/alerts/AlertInsight';
import { AlertCardDetails } from '@/components/alerts/AlertCardDetails';
import { AlertKpiCard }  from '@/components/alerts/AlertKpiCard';

export default function Alerts() {
  return (
    <div>
          {/* HEADER */}
           <AlertHeader/>
          {/* KPI */}
          <AlertKpiCard />
          {/* CONTENT */}

          <div className="grid grid-cols-12 gap-4 mt-4 items-stretch">
    
            {/* TABLE */}
            <AlertTable/>
            {/* RIGHT PANEL */}
            <div className="col-span-12 xl:col-span-4 flex">
              <AlertInsight />
            </div>
    
          </div>
          <AlertCardDetails/>
        </div>
  );
}