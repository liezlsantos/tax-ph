export function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2
  });
};

export function getSSSContribution(monthlyIncome: number): number {
  /**
   * Monthly income x SSS EE (employee) contribution
   * Ref: https://www.sss.gov.ph/sss/DownloadContent?fileName=2023-Schedule-of-Contributions.pdf
   */
  // const SSSContributionTable = [
  //   [0, 180],
  //   [4250, 202.5],
  //   [4750, 225],
  //   [5250, 247.5],
  //   [5750, 270],
  //   [6250, 292.5],
  //   [6750, 315],
  //   [7250, 337.5],
  //   [7750, 360],
  //   [8250, 382.5],
  //   [8750, 405],
  //   [9250, 427.5],
  //   [9750, 450],
  //   [10250, 472.5],
  //   [10750, 495],
  //   // Encoding this is testing my patience T.T (should have scraped the PDF instead)
  //   [11250, 517.5],
  //   [11750, 540],
  //   [12250, 562.5],
  //   [12750, 585],
  //   [13250, 607.5],
  //   [13750, 630],
  //   [14250, 652.5],
  //   [14750, 675],
  //   [15250, 697.5],
  //   [15750, 720],
  //   [16250, 742.5],
  //   [16750, 765],
  //   [17250, 787.5],
  //   [17750, 810],
  //   [18250, 832.5],
  //   [18750, 855],
  //   [19250, 887.5],
  //   [19750, 900],
  //   [20250, 922.5],
  //   [20500, 945],
  //   [21250, 967.5],
  //   [21750, 990],
  //   // Okay, kinda figured out the pattern at this point (in every 500 increase in income, there's a 22.5 increase in contri)
  //   // so formula should be something like:
  //   //   if income < 4250, sss = 180;
  //   //   else if income >= 29750, sss = 1350;
  //   //   else sss = 202.5 + (income - 4250) / 500) * 22.5;
  //   // Pretty sure this is right but I'm almost done so let's just complete this table.
  //   [22250, 1012.5],
  //   [22750, 1035],
  //   [23250, 1057.5],
  //   [23750, 1080],
  //   [24250, 1102.5],
  //   [24750, 1125],
  //   [25250, 1147.5],
  //   [25750, 1170],
  //   [26250, 1192.5],
  //   [26750, 1215],
  //   [27250, 1237.5],
  //   [27750, 1260],
  //   [28250, 1282.5],
  //   [28750, 1305],
  //   [29250, 1327.5],
  //   [29750, 1350]
  // ];
  // return getValueInRange(SSSContributionTable, monthlyIncome);

  // as this is faster (O(1)) than getValueInRange() which uses binary search (O(log n)):
  const base = 180;
  if (monthlyIncome < 4250) {
    return base;
  }
  if (monthlyIncome >= 29750) {
    return 1350;
  }
  return base + (Math.floor((monthlyIncome - 4250) / 500) + 1) * 22.5;
}

export function getPagIBIGContribution(monthlyIncome: number): number {
  if (monthlyIncome <= 1500) {
    return monthlyIncome * .01;
  }
  return Math.min(monthlyIncome, 10000) * 0.02;
}

export function getPhilHealthContribution(monthlyIncome: number): number {
  return ((monthlyIncome < 10000 ? 10000 : (Math.min(monthlyIncome, 100000))) * 0.05) / 2;
}

export function computeWithHoldingTax(taxableIncome: number): number {
  if (taxableIncome <= 20833) {
    return 0;
  }
  if (taxableIncome <= 33332) {
    return (taxableIncome - 20833) * .15;
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

/**
 * Use binary search to search for a given value (n) in a sorted array of [x, y] mappings.
 * If n is not present, should return the y mapped to the greatest x that is less than n
 * (i.e. the n within the range)
 *
 * @param arr array containing the [x, y] mapping sorted by x in ascending order
 * @param n value to find within the array
 * @returns y - the correspoding value of n
 */
function getValueInRange(arr: Array<Array<number>>, n: number) {
  const from = 0;
  const to = arr.length;
  return (function search(from, to) {
    if (from >= to) {
      return 0;
    }
    const mid = Math.floor((from + to) / 2);
    if (arr[mid][0] > n) {
      return search(from, mid);
    }
    if (arr[mid][0] < n && mid > from) {
      return search(mid, to);
    }
    return arr[mid][1];
  })(from, to);
}
