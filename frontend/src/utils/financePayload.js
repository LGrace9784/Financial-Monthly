// Purpose: converts the form state into the exact JSON structure the backend expects for calculation requests.

// Turns empty strings into a numeric 0 so backend calculations stay stable.
const toNumber = (value) => Number(value) || 0;

// Removes blank expense rows and normalizes each remaining expense into a valid payload item.
const normalizeExpenses = (expenses) => expenses
  .filter((expense) => expense.name.trim() || expense.category.trim() || expense.amount !== "")
  .map((expense) => ({
    name: expense.name.trim() || "Expense",
    category: expense.category.trim() || "Transportation",
    amount: toNumber(expense.amount),
    is_needed: Boolean(expense.isNeeded),
  }));

// Merges the current income, expense, and retirement values into the payload expected by the API.
export function buildFinancePayload({ income, expenses, retirement }) {
  const allExpenses = normalizeExpenses(expenses);

  return {
    income: toNumber(income),
    needed_expenses: allExpenses,
    total_expenses: allExpenses.reduce((total, expense) => total + expense.amount, 0),
    retirement_amount: toNumber(retirement.retirementAmount),
    retirement_contribution: toNumber(retirement.retirementContribution),
    annual_return_rate: toNumber(retirement.annualReturnRate),
    current_age: toNumber(retirement.currentAge),
    retirement_age: toNumber(retirement.retirementAge),
  };
}