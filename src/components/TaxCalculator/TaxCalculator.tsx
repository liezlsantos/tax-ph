import { FormEvent, useState, type ReactElement } from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";

import { AmountInput } from "./components/AmountInput";
import { BreakdownItem, BreakdownTable } from "./components/BreakdownTable";
import {
  computeIncomeTax,
  computeWithholdingTax,
  getSSSContribution,
  getPagIBIGContribution,
  getPhilHealthContribution,
} from "components/lib";

const initialResult = {
  grossIncome: 0,
  nonTaxableAllowance: 0,
  deductionAfterTax: 0,
  taxableIncome: 0,
  withholdingTax: 0,
  netIncome: 0,
  contributions: {
    sss: 0,
    philhealth: 0,
    pagibig: 0,
  },
  thirteenthMonth: {
    taxableIncome: 0,
    withholdingTax: 0,
    netIncome: 0,
  },
};

export default function TaxCalculator(): ReactElement {
  const [result, setResult] = useState(initialResult);

  const [annualIncomeTax, setAnnualIncomeTax] = useState<number>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const grossIncome = Number.parseFloat(data.grossIncome.toString());
    let nonTaxableAllowance = Number.parseFloat(data.allowance.toString());
    let deductionAfterTax = Number.parseFloat(data.deduction.toString());

    if (isNaN(grossIncome)) {
      return;
    }

    if (isNaN(nonTaxableAllowance)) {
      nonTaxableAllowance = 0;
    }

    if (isNaN(deductionAfterTax)) {
      deductionAfterTax = 0;
    }

    const sssContribution = getSSSContribution(grossIncome);
    const pagIBIGContribution = getPagIBIGContribution(grossIncome);
    const philHealthContribution = getPhilHealthContribution(grossIncome);

    const totalDeduction =
      sssContribution + philHealthContribution + pagIBIGContribution;
    const taxableIncome = grossIncome - totalDeduction;
    const withholdingTax = computeWithholdingTax(taxableIncome);
    const netIncome =
      taxableIncome - withholdingTax - deductionAfterTax + nonTaxableAllowance;

    const annualGrossIncome = grossIncome * 13;
    const annualTaxableIncome =
      annualGrossIncome - totalDeduction * 12 - Math.min(90000, grossIncome);
    const annualIncomeTax = computeIncomeTax(annualTaxableIncome);

    setResult({
      grossIncome,
      nonTaxableAllowance,
      deductionAfterTax,
      taxableIncome,
      withholdingTax,
      netIncome,
      contributions: {
        sss: sssContribution,
        philhealth: philHealthContribution,
        pagibig: pagIBIGContribution,
      },
      thirteenthMonth: {
        taxableIncome: grossIncome > 90000 ? grossIncome - 90000 : 0,
        withholdingTax: annualIncomeTax - withholdingTax * 12,
        netIncome:
          grossIncome * 13 -
          totalDeduction * 12 -
          annualIncomeTax -
          netIncome * 12,
      },
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Form className="card flex flex-col gap-6" onSubmit={handleSubmit}>
        <AmountInput name="grossIncome" label="Monthly Gross Income" isRequired={true} />
        <AmountInput name="allowance" label="Monthly Non-Taxable Allowance" />
        <AmountInput name="deduction" label="Other Deductions (after tax)" />

        <Button color="primary" type="submit">
          Compute
        </Button>
      </Form>

      <div className="card grid gap-4">
        <BreakdownTable
          title="Monthly Contributions"
          items={[
            {
              label: "SSS",
              amount: result.contributions.sss,
            },
            {
              label: "Philhealth",
              amount: result.contributions.philhealth,
            },
            {
              label: "PAGIBIG",
              amount: result.contributions.pagibig,
            },
          ]}
        />
        <BreakdownTable
          title="Monthly Tax & Income"
          items={[
            {
              label: "Gross Income",
              amount: result.grossIncome,
            },
            {
              label: "Taxable Income",
              amount: result.taxableIncome,
            },
            {
              label: "Withholding Tax",
              amount: result.withholdingTax,
            },
            {
              label: "Non-taxable allowance",
              amount: result.nonTaxableAllowance,
            },
            {
              label: "Deductions After Tax",
              amount: result.deductionAfterTax,
            },
            {
              label: "Net Income",
              amount: result.netIncome,
            },
          ]}
        />
        <BreakdownTable
          title="13th Month"
          items={[
            {
              label: "Taxable Income (Monthly Gross Income - Php 90,000)",
              amount: result.thirteenthMonth.taxableIncome,
            },
            {
              label: "Withholding Tax",
              amount: result.thirteenthMonth.withholdingTax,
            },
            {
              label: "Net Income",
              amount: result.thirteenthMonth.netIncome,
            },
          ]}
        />
      </div>
    </div>
  );
}
