export interface frequency {
  id: number;
  label: string;
}

export interface formSubmission {
  plan: paymentPlan;
  prePlan: prePaymentPlan;
}

export interface paymentPlan {
  amortizationPeriod: number;
  interestRate: string;
  mortgageAmt: string;
  paymentFrequency: number;
  term: number;
}

export interface prePaymentPlan {
  paymentAmt: string;
}

export interface CalculationSummary {
  descr: string;
  termPeriod: string;
  mortgagePeriod: string;
}
