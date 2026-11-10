// Purpose: defines a single editable expense row with name, category, amount, and need flag.

import { formatCurrencyValue, parseCurrencyValue } from "../utils/currency";

// Displays one expense item and forwards value changes back to the parent form state.
const expenseCategories = [
  "Rent/Mortgage",
  "Housing",
  "Transportation",
  "Food",
  "Health & Personal",
  "Savings",
  "Fun",
  "Misc",
];
// Subsection in expenses that has the detailes of the expenses
function Expense({
  expense,
  index,
  onChange,
  onRemove,
}) {
  return (
    <div className="expense-row row g-3 align-items-end">
      <div className="col-md-3">
        <label className="form-label small text-muted mb-1" htmlFor={`expense-name-${index}`}>
          Expense Name
        </label>
        <input
          id={`expense-name-${index}`}
          type="text"
          className="form-control expense-field"
          placeholder="e.g. Rent"
          value={expense.name}
          onChange={(event) => onChange(index, "name", event.target.value)}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label small text-muted mb-1" htmlFor={`expense-category-${index}`}>
          Category
        </label>
        <select
          id={`expense-category-${index}`}
          className="form-select expense-field"
          value={expense.category || "Transportation"}
          onChange={(event) => onChange(index, "category", event.target.value)}
        >
          {expenseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label small text-muted mb-1" htmlFor={`expense-amount-${index}`}>
          Amount
        </label>
        <input
          id={`expense-amount-${index}`}
          type="text"
          className="form-control expense-field"
          placeholder="$0.00"
          value={formatCurrencyValue(expense.amount)}
          onChange={(event) => onChange(index, "amount", parseCurrencyValue(event.target.value))}
        />
      </div>

      <div className="col-md-2 d-flex align-items-end">
        <label className="form-check-label small text-muted needed-expense-box" htmlFor={`expense-needed-${index}`}>
          Needed?
        </label>
        <input
          id={`expense-needed-${index}`}
          type="checkbox"
          className="form-check-input needed-expense-checkbox"
          checked={Boolean(expense.isNeeded)}
          onChange={(event) => onChange(index, "isNeeded", event.target.checked)}
        />
      </div>

      <div className="col-md-2 d-flex align-items-end justify-content-md-end">
        <button
          type="button"
          className="btn btn-outline-danger btn-sm remove-expense-btn"
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Expense;