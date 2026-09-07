import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/70 bg-white px-4 py-3 text-center text-[0.75rem] font-medium text-slate-500">
      © {new Date().getFullYear()} Capgemini. All rights reserved.
    </footer>
  );
}