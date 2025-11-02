export default function LoanSummary({ amount, years }) {
  const principal = Number(amount);
  const termYears = Number(years);

  if (!principal) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Loan calculation (3.5% p.a.)</h5>
          <p className="mb-0 text-muted">Enter the loan amount to see the calculation.</p>
        </div>
      </div>
    );
  }

  if (!termYears) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Loan calculation (3.5% p.a.)</h5>
          <p className="mb-0 text-muted">
            Amount is filled. Please also enter the repayment period (years).
          </p>
        </div>
      </div>
    );
  }

  const annualRate = 0.035;
  const monthlyRate = annualRate / 12;
  const n = termYears * 12;

  const monthly = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -n)));
  const total = monthly * n;
  const interest = total - principal;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Loan calculation (3.5% p.a.)</h5>
        <p className="mb-1">
          Monthly installment: <strong>{monthly.toFixed(2)} CZK</strong>
        </p>
        <p className="mb-1">
          Total to be repaid: <strong>{total.toFixed(2)} CZK</strong>
        </p>
        <p className="mb-0 text-muted">
          Total interest: {interest.toFixed(2)} CZK
        </p>
      </div>
    </div>
  );
}