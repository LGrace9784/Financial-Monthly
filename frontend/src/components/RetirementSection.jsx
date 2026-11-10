// Purpose: renders the retirement inputs for current amount, contribution, return rate, and age targets.

import { formatCurrencyValue, parseCurrencyValue } from "../utils/currency";

const fields = [
  ["retirementAmount", "Current Retirement Amount", "currency"],
  ["retirementContribution", "Retirement Contribution", "currency"],
  ["annualReturnRate", "Annual ROI (%)", "percent"],
  ["currentAge", "Current Age", "number"],
  ["retirementAge", "Estimated Retirement Age", "number"],
];

// Builds the retirement form fields and pushes each value change into the shared form state.
function RetirementSection({ values, onChange }) {
  return (
    <section className="card mb-3 p-3">
      <h2 className="h5 mb-3">Retirement</h2>
      {fields.map(([field, label, type]) => (
        <div className="mb-3" key={field}>
          <label className="form-label" htmlFor={field}>{label}</label>
          <input
            id={field}
            type={type === "number" || type === "percent" ? "number" : "text"}
            className="form-control"
            value={
              type === "currency"
                ? formatCurrencyValue(values[field])
                : values[field]
            }
            onChange={(event) => {
              const nextValue = type === "currency"
                ? parseCurrencyValue(event.target.value)
                : event.target.value;
              onChange(field, nextValue);
            }}
            placeholder={type === "currency" ? "$0.00" : undefined}
          />
        </div>
      ))}
    </section>
  );
}

export default RetirementSection;