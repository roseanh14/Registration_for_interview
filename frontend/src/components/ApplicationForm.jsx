import { useState } from "react";
import PersonalSection from "../form/PersonalSection.jsx";
import LoanSection from "../form/LoanSection.jsx";
import LoanSummary from "./LoanSummary.jsx";

const API_URL = "http://localhost:5000";

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  requestedAmount: "",
  loanTermYears: "",
  loanPurpose: "",
  customPurpose: "",
  gdprConsent: false,
};

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.requestedAmount ||
      !form.loanTermYears ||
      Number(form.loanTermYears) <= 0 ||
      !form.gdprConsent
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields (years must be > 0).",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      const resp = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Failed to submit application");
      }

      const data = await resp.json();

      setStatus({
        type: "success",
        message: `Application saved (id: ${data.id})`,
      });

      setForm(initialForm);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card p-3 mb-3">
        <PersonalSection form={form} onChange={handleChange} />
        <LoanSection form={form} onChange={handleChange} />

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="gdprConsent"
            name="gdprConsent"
            checked={form.gdprConsent}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="gdprConsent">
            I agree with processing of my personal data for the purpose of loan
            application evaluation. *
          </label>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Submit application"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Clear form
          </button>
        </div>

        {status && (
          <p
            className={`mt-3 ${
              status.type === "error" ? "text-danger" : "text-success"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>

      <LoanSummary amount={form.requestedAmount} years={form.loanTermYears} />
    </>
  );
}
