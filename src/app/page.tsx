"use client";

import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

export default function Home() {

  const [monthlyGross, setMonthlyGross] = useState<number>(0);
  const [sss, setSSS] = useState<number>(0);
  const [pagibig, setPagibig] = useState<number>(0);
  const [philhealth, setPhilhealth] = useState<number>(0);

  const [withholdingTax, setWithholdingTax] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);

  const handleIncomeChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setMonthlyGross(parseFloat(e.target.value));
    }
  }, 1000);

  const computeTax = useCallback(async () => {
    setSSS(0);
    setPagibig(0);
    setPhilhealth(0);
    setNetIncome(0);
    setWithholdingTax(0);

    const response = await fetch("/api/tax", {
      method: "POST",
      body: JSON.stringify({
        monthlyGross,
        sss,
        pagibig,
        philhealth
      })
    });
    const data = await response.json();

    setSSS(data.sss);
    setPagibig(data.pagibig);
    setPhilhealth(data.philhealth);
    setWithholdingTax(data.withholdingTax);
    setNetIncome(data.netIncome);
  }, [monthlyGross]);

  useEffect(() => {
    if (monthlyGross === 0) {
      return;
    }
    computeTax();
  }, [computeTax]);

  const formatAmount = (amount: number): string => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2
    });
  };

  return (
    <main className="flex min-h-screen flex-col p-12">
      <div><h1>PH Income Tax Calculator (2024)</h1></div>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div>
          <div className="card mb-6 md:mt-0">
            <label className="font-bold">Monthly Gross Income</label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">₱</span>
              </div>
              <input
                type="number"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                onChange={handleIncomeChange}>
              </input>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm">PHP</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:my-6">
            <div className="card">
              <div className="py-2 font-bold">Monthly Contributions</div>
              <div className="flex w-full py-1">
                <div className="flex-grow">SSS</div>
                <div>₱ {formatAmount(sss)}</div>
              </div>
              <div className="flex w-full py-1">
                <div className="flex-grow">PhilHealth</div>
                <div>₱ {formatAmount(philhealth)}</div>
              </div>
              <div className="flex w-full py-1">
                <div className="flex-grow">Pag-IBIG</div>
                <div>₱ {formatAmount(pagibig)}</div>
              </div>
              <div className="flex w-full py-1">
                <div className="flex-grow">Total Deductions</div>
                <div className="font-bold">₱ {formatAmount((sss + pagibig + philhealth))}</div>
              </div>
            </div>
            <div className="card">
              <div className="py-2 font-bold">Tax & Income</div>
              <div className="flex w-full py-1">
                <div className="flex-grow">Gross Income</div>
                <div>₱ {formatAmount(monthlyGross)}</div>
              </div>
              <div className="flex w-full py-1">
                <div className="flex-grow">Taxable Income</div>
                <div>₱ {formatAmount(monthlyGross - sss - pagibig - philhealth)}</div>
              </div>
              <div className="flex w-full py-1">
                <div className="flex-grow">Withholding Tax</div>
                <div>₱ {formatAmount(withholdingTax)}</div>
              </div>
              <div className="flex w-full py-1">
                <div className="flex-grow">Net Income</div>
                <div className="font-bold">₱ {formatAmount(netIncome)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-6">
          <div className="card h-full">
            <div className="py-2 font-bold">About</div>
            <div className="py-2">
              PH Income Tax Calculator (2024) is up-to-date based on the following references:
            </div>
            <ul className="list-disc pl-4">
              <li>
                <a href="https://www.sss.gov.ph/sss/DownloadContent?fileName=2023-Schedule-of-Contributions.pdf">
                  SSS Employee Contribution
                </a>
              </li>
              <li>
                <a href="https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf">
                  PhilHealth Contribution Table as per PhilHealth Circular No. 2019-0009
                </a>
              </li>
              <li>
                <a href="https://mpm.ph/hdmf-pag-ibig-table-2024/">
                  HDMF/Pag-IBIG Contribution Table for 2024
                </a>
              </li>
            </ul>
            <div className="py-2">
              Code is available on <a href="https://github.com/liezlsantos/tax-ph">GitHub</a>.
              If you noticed a bug, feel free to open a PR for a fix.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
