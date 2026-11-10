// // Purpose: keeps the main finance form state in one place and updates income, expenses, and retirement fields cleanly.

import { useState } from "react";

// Creates a blank expense row with default values when the user adds a new expense line.
const createExpense = (expense = {}) => ({
  name: expense.name ?? "",
  category: expense.category ?? "Housing",
  amount: expense.amount ?? "",
  isNeeded: expense.isNeeded ?? false,
});

const initialRetirementValues = {
  retirementAmount: "",
  retirementContribution: "",
  annualReturnRate: "",
  currentAge: "",
  retirementAge: "",
};

// Stores the current values from the form so they can be reused for recalculations and result editing.
export function useFinanceForm(initialValues = {}) {
  const [income, setIncome] = useState(initialValues.income ?? "");
  const [neededExpenses, setNeededExpenses] = useState(
    Array.isArray(initialValues.neededExpenses) && initialValues.neededExpenses.length > 0
      ? initialValues.neededExpenses.map((expense) => createExpense(expense))
      : Array.from({ length: 5 }, () => createExpense())
  );
  const [retirement, setRetirement] = useState({
    ...initialRetirementValues,
    ...(initialValues.retirement ?? {}),
  });

  const addExpense = () => {
    setNeededExpenses((expenses) => [...expenses, createExpense()]);
  };

  const updateExpense = (index, field, value) => {
    setNeededExpenses((expenses) => expenses.map((expense, expenseIndex) =>
      expenseIndex === index ? { ...expense, [field]: value } : expense
    ));
  };

  const removeExpense = (index) => {
    setNeededExpenses((expenses) => expenses.filter((_, expenseIndex) => expenseIndex !== index));
  };

  const updateRetirement = (field, value) => {
    setRetirement((values) => ({ ...values, [field]: value }));
  };

  return {
    income,
    setIncome,
    neededExpenses,
    retirement,
    addExpense,
    updateExpense,
    removeExpense,
    updateRetirement,
  };
}