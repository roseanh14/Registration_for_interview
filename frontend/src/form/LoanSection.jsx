import FormField from "../components/FormField.jsx";

export default function LoanSection({ form, onChange }) {
  return (
    <>
      <h2 className="h5 mt-3 mb-3">Loan details</h2>

      <div className="row">
        <div className="col-md-6">
          <FormField
            label="Requested amount (CZK)"
            name="requestedAmount"
            type="number"
            value={form.requestedAmount}
            onChange={onChange}
            required
            placeholder="200000"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="loanTermYears" className="form-label">
            Repayment period (years) <span className="text-danger">*</span>
          </label>
          <input
            id="loanTermYears"
            name="loanTermYears"
            type="number"
            min="1"
            className="form-control"
            value={form.loanTermYears}
            onChange={onChange}
            placeholder="5"
            required
          />
        </div>
      </div>

      <div className="mb-3 mt-3">
        <label htmlFor="loanPurpose" className="form-label">
          Loan purpose
        </label>
        <select
            id="loanPurpose"
            name="loanPurpose"
            className="form-select"
            value={form.loanPurpose}
            onChange={onChange}
        >
          <option value="">-- select --</option>
          <option value="housing">Housing / reconstruction</option>
          <option value="car">Car</option>
          <option value="education">Education</option>
          <option value="consolidation">Consolidation</option>
          <option value="other">Other</option>
        </select>
      </div>

      {form.loanPurpose === "other" && (
        <div className="mb-3">
          <label htmlFor="customPurpose" className="form-label">
            Describe the purpose
          </label>
          <textarea
            id="customPurpose"
            name="customPurpose"
            rows={2}
            className="form-control"
            value={form.customPurpose}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
}