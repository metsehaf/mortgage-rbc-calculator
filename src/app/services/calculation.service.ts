import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import {
  CalculationSummary,
  formSubmission,
} from '../model/mortgage.interface';

@Injectable({
  providedIn: 'root',
})
export class MortgageCalculationService {
  constructor() {}

  /*totalAmtofLoan = 80000
	Annual interest rate = 5% = 0.05 = 5/100
	Monthly interest rate = .05/12 = .00417
	Amortization period/ or the year the bank has given you to pay off your loan = 10yrs --->
	convert this to month which is 120 months (yr * 12)

	Mortgage calculation --> M = 80,000 [.00417(1+.00417)^120]/[(1+.00417)^120-1]

  if there is a down payment let's say 16000

  Mortgage calculation ---> M= 80,000-16,000 [.00417(1+.00417)^119]/[(1+.00417)^119-1].
  consider Changing values and fixed value

  */
  public CalculateMortgage(
    mortgageData: formSubmission
  ): Observable<CalculationSummary[]> {
    const interestRatePercentage =
      parseInt(mortgageData.plan.interestRate) / 100;
    const monthlyInterestRate = interestRatePercentage / 12;
    const roundInterstRate = Number(monthlyInterestRate.toFixed(5));
    const totalLoan = parseInt(mortgageData.plan.mortgageAmt);
    const amortizationPeriod = mortgageData.plan.amortizationPeriod * 12;
    const caclulatemonthly = 1 + roundInterstRate;
    console.log(mortgageData.plan.term);
    const term = mortgageData.plan.term * 12;
    const prePayment =
      mortgageData.prePlan.paymentAmt === ''
        ? 0
        : parseInt(mortgageData.prePlan.paymentAmt);

    let calcResult;
    let totalMonthlyPayment = 0;
    if (prePayment !== 0) {
      const amortizationplusInterest = Number(
        Math.pow(caclulatemonthly, amortizationPeriod - 1).toFixed(5)
      );
      const amortizationminusInterest = Math.pow(
        caclulatemonthly,
        amortizationPeriod - 2
      );

      calcResult =
        (totalLoan - prePayment) *
        (roundInterstRate * amortizationplusInterest);
      totalMonthlyPayment = calcResult / (amortizationminusInterest - 1);
    } else {
      const amortizationplusInterest = Math.pow(
        caclulatemonthly,
        amortizationPeriod
      );
      const amortizationminusInterest = Math.pow(
        caclulatemonthly,
        amortizationPeriod - 1
      );
      calcResult = totalLoan * (roundInterstRate * amortizationplusInterest);
      totalMonthlyPayment = calcResult / (amortizationminusInterest - 1);
    }
    return of(
      this.mapMortgageResults(
        prePayment,
        Number(totalMonthlyPayment.toFixed(2)),
        totalLoan,
        term,
        amortizationPeriod
      )
    );
  }

  mapMortgageResults(
    prepayment: number,
    monthlyPayment: number,
    totalLoan: number,
    term: number,
    period: number
  ): CalculationSummary[] {
    return [
      {
        descr: 'Number of Payments',
        termPeriod: term.toString(),
        mortgagePeriod: period.toString(),
      },
      {
        descr: 'Mortgage Payment',
        termPeriod: `$${monthlyPayment}`,
        mortgagePeriod: `$${monthlyPayment}`,
      },
      {
        descr: 'Prepayment',
        termPeriod: `$${prepayment}`,
        mortgagePeriod: `$${prepayment}`,
      },
      {
        descr: 'Principal Payments',
        termPeriod: `$${((totalLoan * term) / period).toFixed(2)}`,
        mortgagePeriod: `$${totalLoan}`,
      },
      {
        descr: 'Interest Payments',
        termPeriod: `$${(
          monthlyPayment * term -
          (totalLoan * term) / period
        ).toFixed(2)}`,
        mortgagePeriod: `$${(monthlyPayment * period - totalLoan).toFixed(2)}`,
      },
      {
        descr: 'Total Cost',
        termPeriod: `$${(monthlyPayment * term).toFixed(2)}`,
        mortgagePeriod: `$${(monthlyPayment * period).toFixed(2)}`,
      },
    ];
  }

  calculateInterestPayment(
    prepayment: number,
    loan: number,
    rate: number,
    period: number
  ) {
    if (prepayment === 0) {
      for (let i = 0; i <= period; i++) {
        console.log(rate * loan);
      }
    }
    return 5;
  }

  // Round up decimal places
  public roundUpDecimal(value: number, place: number) {
    return Math.ceil(value * Math.pow(10, place)) / Math.pow(10, place);
  }
}
