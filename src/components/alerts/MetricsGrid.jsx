import React from 'react';

const metrics = [
  { label: 'Pending Approvals', value: '8', amount: '$ 1,257,540.00', color: 'border-blue-500 text-blue-600 bg-blue-50' },
  { label: 'Due Today', value: '2', amount: '$ 245,780.00', color: 'border-amber-500 text-amber-600 bg-amber-50' },
  { label: 'Overdue', value: '2', amount: '$ 98,450.00', color: 'border-red-500 text-red-600 bg-red-50' },
  { label: 'Approved (This Month)', value: '24', amount: '$ 4,852,310.00', color: 'border-emerald-500 text-emerald-600 bg-emerald-50' },
  { label: 'Rejected (This Month)', value: '3', amount: '$ 56,230.00', color: 'border-purple-500 text-purple-600 bg-purple-50' },
  { label: 'Avg. Approval Time', value: '18.6 hrs', amount: 'Target: 24 hrs', color: 'border-sky-400 text-sky-600 bg-sky-50' },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((card, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-w-0">
          <span className="text-xs font-semibold text-slate-500 truncate">{card.label}</span>
          <div className="my-2.5">
            <span className={`inline-block text-xl font-bold px-2 py-0.5 rounded-lg border ${card.color}`}>
              {card.value}
            </span>
          </div>
          <span className="text-sm font-bold text-slate-900 truncate">{card.amount}</span>
        </div>
      ))}
    </div>
  );
}
