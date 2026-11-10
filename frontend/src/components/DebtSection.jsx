// Purpose: shows all expense rows and the live remaining income after those costs.

import Expense from "./Expense";

// Renders each expense row and exposes controls for adding or removing expense entries.
function ExpenseSection({ expenses, income, onAdd, onChange, onRemove }) {
  const totalNeededExpenses = expenses.reduce(
    (sum, expense) => sum + (expense.isNeeded ? (Number(expense.amount) || 0) : 0),
    0,
  );
  const totalOtherExpenses = expenses.reduce(
    (sum, expense) => sum + (!expense.isNeeded ? (Number(expense.amount) || 0) : 0),
    0,
  );
  const remaining = (Number(income) || 0) - totalNeededExpenses - totalOtherExpenses;

  return (
    <section className="card mb-3 p-3 expense-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h5 mb-1">Debt</h2>
          <p className="text-muted small mb-0">
            Add as many monthly expense lines as you need.
          </p>
        </div>
      </div>

      <div className="expense-stack">
        {expenses.map((expense, index) => (
          <Expense
            key={index}
            expense={expense}
            index={index}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      <button type="button" className="btn btn-outline-primary btn-sm mt-3 add-expense-btn" onClick={onAdd}>
        + Add Expense
      </button>
        {/* Shows the current income the user put in */}
      <div className="small text-muted mt-3">
        Income: ${((Number(income) || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }))}
      </div>
        {/* Shows the amount they have left after they put in their expenses */}
      <div className="small fw-semibold mt-1" style={{ color: remaining >= 0 ? "#198754" : "#dc3545" }}>
        Remaining after expenses: ${remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
    </section>
  );
}

export default ExpenseSection;