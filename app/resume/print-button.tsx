"use client";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50 print:hidden">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95"
      >
        <Printer className="size-4" />
        Print / Save PDF
      </button>
    </div>
  );
}
