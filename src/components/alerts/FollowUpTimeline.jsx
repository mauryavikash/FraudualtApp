import React from 'react';

const steps = [
  { label: 'Submission', meta: '12 May 2026', time: '02:30 PM', active: false, done: true },
  { label: 'Pending Review', meta: 'Current Step', time: '', active: true, done: false },
  { label: 'Under Review', meta: 'Pending', time: '', active: false, done: false },
  { label: 'Decision', meta: 'Pending', time: '', active: false, done: false },
  { label: 'Completed', meta: 'Pending', time: '', active: false, done: false },
];

export function FollowUpTimeline() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-slate-900 text-xs mb-4">Follow-up Timeline</h3>
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 px-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex md:flex-col items-center md:text-center flex-1 w-full relative group">
            {/* Step Line Linker */}
            {idx !== steps.length - 1 && (
              <div className="absolute left-3.5 top-7 w-0.5 h-10 md:left-1/2 md:top-3.5 md:w-full md:h-0.5 bg-slate-100 -z-0" />
            )}
            
            {/* Dynamic Status Pin Node */}
            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
              step.active ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
              step.done ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
            }`}>
              {step.done ? '✓' : idx + 1}
            </div>

            {/* Label Metadata Stack */}
            <div className="ml-4 md:ml-0 md:mt-2 text-left md:text-center min-w-0">
              <p className={`text-xs font-bold truncate ${step.active ? 'text-blue-600' : 'text-slate-800'}`}>
                {step.label}
              </p>
              <p className={`text-[10px] truncate ${step.active ? 'text-blue-500 font-semibold' : 'text-slate-400'}`}>
                {step.meta} {step.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
