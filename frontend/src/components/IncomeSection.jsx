// Purpose: renders the income entry field used in the form.

import { formatCurrencyValue, parseCurrencyValue } from "../utils/currency";

// Shows the user’s monthly net income input and stores the value in parent state.
function IncomeSection({ income, onChange }) {
  return (
    <section className="card mb-3 p-3">
      <h2 className="h5 mb-3">Income</h2>
      <div className="mb-3">
        <label className="form-label" htmlFor="income">Net Income</label>
        <input
          id="income"
          type="text"
          className="form-control income-input"
          placeholder="$0.00"
          value={formatCurrencyValue(income)}
          onChange={(event) => onChange(parseCurrencyValue(event.target.value))}
        />
      </div>
    </section>
  );
}

export default IncomeSection;