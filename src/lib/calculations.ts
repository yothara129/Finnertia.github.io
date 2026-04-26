export interface CalculationResult {
  totalInvested: number;
  totalReturns: number;
  maturityValue: number;
  yearlyData: {
    year: number;
    invested: number;
    value: number;
  }[];
}

export const calculateSIP = (
  monthlyInvestment: number,
  years: number,
  annualRate: number,
  inflationRate: number = 0
): CalculationResult => {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  
  // M = P × ({[1 + i]^n – 1} / i) × (1 + i)
  const maturityValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  const totalInvested = monthlyInvestment * months;
  
  const yearlyData = [];
  for (let y = 0; y <= years; y++) {
    const m = y * 12;
    const value = m === 0 ? 0 : monthlyInvestment * (((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate));
    const invested = monthlyInvestment * m;
    
    // Inflation adjustment: FV_adjusted = FV / (1 + inflation_rate)^n
    const adjustedValue = value / Math.pow(1 + inflationRate / 100, y);
    
    yearlyData.push({
      year: y,
      invested,
      value: Math.round(value),
      adjustedValue: Math.round(adjustedValue)
    });
  }

  return {
    totalInvested,
    totalReturns: maturityValue - totalInvested,
    maturityValue,
    yearlyData
  } as any;
};

export const calculateLumpsum = (
  amount: number,
  years: number,
  annualRate: number,
  inflationRate: number = 0
): CalculationResult => {
  const rate = annualRate / 100;
  const maturityValue = amount * Math.pow(1 + rate, years);
  const totalInvested = amount;

  const yearlyData = [];
  for (let y = 0; y <= years; y++) {
    const value = amount * Math.pow(1 + rate, y);
    const adjustedValue = value / Math.pow(1 + inflationRate / 100, y);
    yearlyData.push({
      year: y,
      invested: amount,
      value: Math.round(value),
      adjustedValue: Math.round(adjustedValue)
    });
  }

  return {
    totalInvested,
    totalReturns: maturityValue - totalInvested,
    maturityValue,
    yearlyData
  } as any;
};

export const calculateStepUpSIP = (
  initialMonthly: number,
  stepUpRate: number,
  years: number,
  annualRate: number
): CalculationResult => {
  const monthlyRate = annualRate / 100 / 12;
  let totalInvested = 0;
  let totalValue = 0;
  let currentMonthly = initialMonthly;
  const yearlyData = [{ year: 0, invested: 0, value: 0 }];

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      totalInvested += currentMonthly;
      totalValue = (totalValue + currentMonthly) * (1 + monthlyRate);
    }
    yearlyData.push({
      year: y,
      invested: Math.round(totalInvested),
      value: Math.round(totalValue)
    });
    currentMonthly = currentMonthly * (1 + stepUpRate / 100);
  }

  return {
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalValue - totalInvested),
    maturityValue: Math.round(totalValue),
    yearlyData
  };
};

export const calculateGoalSIP = (
  targetGoal: number,
  years: number,
  annualRate: number
): number => {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  // P = M / [({[1 + i]^n – 1} / i) × (1 + i)]
  const monthlySIP = targetGoal / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  return Math.round(monthlySIP);
};

export const calculateFD = (
  principal: number,
  rate: number,
  years: number,
  compoundingFrequency: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly'
) => {
  const n = {
    monthly: 12,
    quarterly: 4,
    'half-yearly': 2,
    yearly: 1
  }[compoundingFrequency];
  
  const r = rate / 100;
  const maturityValue = principal * Math.pow(1 + r / n, n * years);
  return {
    maturityValue,
    totalInterest: maturityValue - principal,
    principal
  };
};

export const calculateEMI = (
  loanAmount: number,
  interestRate: number,
  tenureYears: number
) => {
  const r = interestRate / 100 / 12;
  const n = tenureYears * 12;
  
  // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  const amortization = [];
  let balance = loanAmount;
  for (let i = 1; i <= Math.min(n, 12 * 5); i++) { // Limit to 5 years for visualization logic if needed, but let's just do full or yearly
    const interest = balance * r;
    const principal = emi - interest;
    balance -= principal;
    if (i % 12 === 0) {
      amortization.push({
        year: i / 12,
        interestPaid: Math.round(interest * 12), // rough yearly
        principalPaid: Math.round(principal * 12),
        remainingBalance: Math.round(Math.max(0, balance))
      });
    }
  }

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    amortization
  };
};
