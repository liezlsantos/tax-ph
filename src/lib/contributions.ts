/**
 * Monthly income x SSS EE (employee) contribution
 * Ref: https://www.sss.gov.ph/wp-content/uploads/2024/12/Cir-2024-006-Employers-scaled.jpg
 */
export function getSSSContribution(monthlyIncome: number): number {
  const base = 500;
  if (monthlyIncome < 5250) {
    return base;
  }
  if (monthlyIncome >= 34750) {
    return 1350;
  }
  return base + (Math.floor((monthlyIncome - 5250) / 500) + 1) * 25;
}

export function getPagIBIGContribution(monthlyIncome: number): number {
  if (monthlyIncome <= 1500) {
    return monthlyIncome * 0.01;
  }
  return Math.min(monthlyIncome, 10000) * 0.02;
}

export function getPhilHealthContribution(monthlyIncome: number): number {
  return (
    ((monthlyIncome < 10000 ? 10000 : Math.min(monthlyIncome, 100000)) * 0.05) /
    2
  );
}
