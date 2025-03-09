export function computeWithholdingTax(taxableIncome: number): number {
  if (taxableIncome <= 20833) {
    return 0;
  }
  if (taxableIncome <= 33332) {
    return (taxableIncome - 20833) * 0.15;
  }
  if (taxableIncome <= 66666) {
    return 1875 + (taxableIncome - 33333) * 0.2;
  }
  if (taxableIncome <= 166666) {
    return 8541.8 + (taxableIncome - 66667) * 0.25;
  }
  if (taxableIncome <= 666666) {
    return 33541.8 + (taxableIncome - 166667) * 0.3;
  }
  return 183541.8 + (taxableIncome - 666667) * 0.35;
}

export function computeIncomeTax(annualTaxableIncome: number): number {
  if (annualTaxableIncome <= 250000) {
    return 0;
  }
  if (annualTaxableIncome <= 400000) {
    return (annualTaxableIncome - 250000) * 0.15;
  }
  if (annualTaxableIncome <= 800000) {
    return 22500 + (annualTaxableIncome - 400000) * 0.2;
  }
  if (annualTaxableIncome <= 2000000) {
    return 102500 + (annualTaxableIncome - 800000) * 0.25;
  }
  if (annualTaxableIncome <= 8000000) {
    return 402500 + (annualTaxableIncome - 2000000) * 0.3;
  }
  return 2202500 + (annualTaxableIncome - 8000000) * 0.35;
}
