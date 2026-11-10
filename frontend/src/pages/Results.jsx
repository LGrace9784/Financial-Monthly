// Purpose: displays the calculated financial summary and lets the user adjust relevant values on the results page.

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryExpensePieChart from "../components/CategoryExpensePieChart";
import ExpensePieChart from "../components/ExpensePieChart";
import RetirementChart from "../components/RetirementChart";
import ResultsCards from "../components/ResultsCards";
import { useFinanceForm } from "../hooks/useFinanceForm";
import { buildFinancePayload } from "../utils/financePayload";
import { calculateFinance } from "../services/api";

// Loads the prior form values, shows the result cards, and re-runs the calculation when the user edits a value.
function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = location.state ?? {};
  const form = useFinanceForm(initialState.form ?? {});
  const [results, setResults] = useState(initialState.results ?? null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Recalculates the summary using the latest entries from the current form state.
  const refreshResults = async () => {
    setIsUpdating(true);

    try {
      const payload = buildFinancePayload({
        income: form.income,
        expenses: form.neededExpenses,
        retirement: form.retirement,
      });

      const updatedResults = await calculateFinance(payload);
      setResults(updatedResults);
      navigate("/results", {
        replace: true,
        state: {
          form: {
            income: form.income,
            neededExpenses: form.neededExpenses,
            retirement: form.retirement,
          },
          results: updatedResults,
        },
      });
    } catch (error) {
      console.error("Calculation failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEditInputs = () => {
    navigate("/", {
      state: {
        form: {
          income: form.income,
          neededExpenses: form.neededExpenses,
          retirement: form.retirement,
        },
      },
    });
  };

  const handleStartClean = () => {
    navigate("/", { state: {} });
  };

  if (!results) {
    return (
      <div className="container mt-5">
        <p>No calculation found.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Back to calculator</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Financial Results</h1>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleEditInputs}
          >
            Edit Inputs
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleStartClean}
          >
            Start Clean
          </button>
        </div>
      </div>

      <ResultsCards results={results} />

      <div className="row g-4 mt-1">
        <div className="col-lg-6">
          <CategoryExpensePieChart expenses={form.neededExpenses} />
        </div>
        <div className="col-lg-6">
          <ExpensePieChart
            expenses={form.neededExpenses}
            retirementContribution={Number(form.retirement?.retirementContribution ?? 0)}
          />
        </div>
      </div>

      <RetirementChart results={results} />
    </div>
  );
}

export default Results;