// // Purpose: renders the main finance planner form and sends the completed data to the results page.

import { useLocation, useNavigate } from "react-router-dom";
import { calculateFinance } from "../services/api";
import IncomeSection from "../components/IncomeSection";
import ExpenseSection from "../components/ExpenseSection";
import RetirementSection from "../components/RetirementSection";
import { useFinanceForm } from "../hooks/useFinanceForm";
import { buildFinancePayload } from "../utils/financePayload";
import DebtSection from "../components/DebtSection";

// Shows the input form and handles the submit action that triggers the calculation.
function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useFinanceForm(location.state?.form ?? {});

  const totalNeededExpenses = form.neededExpenses.reduce((sum, expense) => {
    const amount = Number(expense.amount) || 0;
    return sum + (expense.isNeeded ? amount : 0);
  }, 0);

  const totalOtherExpenses = form.neededExpenses.reduce((sum, expense) => {
    const amount = Number(expense.amount) || 0;
    return sum + (!expense.isNeeded ? amount : 0);
  }, 0);

  const remainingIncome = Number(form.income || 0) - totalNeededExpenses - totalOtherExpenses;

  // Sends the current values to the backend, then carries both the form data and results to the results page.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = buildFinancePayload({
      income: form.income,
      expenses: form.neededExpenses,
      retirement: form.retirement,
    });

    try {
      const results = await calculateFinance(payload);
      navigate("/results", {
        state: {
          form: {
            income: form.income,
            neededExpenses: form.neededExpenses,
            retirement: form.retirement,
          },
          results,
        },
      });
    } catch (error) {
      console.error("Calculation failed:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h1 className="mb-4">Finance Planner</h1>
        <p>Input all values below on a <strong>Monthly</strong> basis.</p>

        <form onSubmit={handleSubmit}>
          <IncomeSection
            income={form.income}
            remainingIncome={remainingIncome}
            onChange={form.setIncome}
          />
          <ExpenseSection
            expenses={form.neededExpenses}
            income={form.income}
            onAdd={form.addExpense}
            onChange={form.updateExpense}
            onRemove={form.removeExpense}
          />
          {/* <DebtSection
            expenses={form.neededExpenses}
            income={form.income}
            onAdd={form.addExpense}
            onChange={form.updateExpense}
            onRemove={form.removeExpense}
          /> */}
          <RetirementSection values={form.retirement} onChange={form.updateRetirement} />

          <button type="submit" className="btn btn-primary">
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;