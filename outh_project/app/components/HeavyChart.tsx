"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HeavyChart() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold">📈 Chart Component</h3>
      <p className="text-gray-500">This is lazy-loaded for performance.</p>
    </div>
  );
}
