export function calcPayment({ autoAmount, deposit, leaseTerm }) {
  const p = autoAmount - deposit;
  const i = 0.05;
  const n = leaseTerm;
  let monthlyPayment = p * (i * Math.pow((1 + i), n)) / (Math.pow((1 + i), n) - 1);
  monthlyPayment = Math.round(monthlyPayment);
  const totalPaid = monthlyPayment * leaseTerm + deposit;

  return {
    totalMonthlyPayment: monthlyPayment,
    totalPayment : totalPaid
  };
};
