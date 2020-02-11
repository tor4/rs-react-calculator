import DelayedPromise from '/src/utils/DelayedPromise.js';

export function calculateLoan({
  msrp, tradeIn, downPayment, terms, creditScore, apr, postCode,
}) {
  return new DelayedPromise((resolve) => {
    const score = getCreditScoreValue(creditScore);
    const monthlyPayment =
      (msrp - tradeIn - downPayment) / terms * score * (apr / 100);

    resolve({
      monthlyPayment: monthlyPayment.toFixed(2),
      taxes: calculateTaxes(postCode),
    });
  }, 500);
};

export function calculateLease({
  msrp, tradeIn, downPayment, terms, creditScore, mileages, postCode,
}) {
  return new DelayedPromise((resolve) => {
    const score = getCreditScoreValue(creditScore);
    const monthlyPayment =
      (msrp - tradeIn - downPayment) * mileages / 10000 / terms * score;
    resolve({
      monthlyPayment: monthlyPayment.toFixed(2),
      taxes: calculateTaxes(postCode),
    });
  }, 500);
}

function calculateTaxes(postCode) {
  return postCode.split('').map((num) => num * 11);
}

function getCreditScoreValue(creditScore) {
  if (creditScore >= 750) {
    return 0.95;
  }

  if (creditScore >= 700) {
    return 1;
  }

  if (creditScore >= 640) {
    return 1.05;
  }

  return 1.2;
}
