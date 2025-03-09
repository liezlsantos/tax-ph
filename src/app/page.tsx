"use client";

import TaxCalculator from "../components/TaxCalculator/TaxCalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12">
      <div>
        <h1>PH Income Tax Calculator</h1>
      </div>

      <div className="py-2">
        <TaxCalculator />
      </div>
    </main>
  );
}
