# Purpose: defines the request shape for the calculator so incoming form data is validated consistently.

from pydantic import BaseModel

# Represents one line item in the monthly expense list.
class Expense(BaseModel):
    name: str
    category: str
    amount: float
    is_needed: bool = False

# Represents the full payload sent from the frontend when a user submits their numbers.
class FinanceInput(BaseModel):
    income: float
    needed_expenses: list[Expense]
    total_expenses: float = 0.0
    retirement_contribution: float
    annual_return_rate: float
    current_age: float
    retirement_age: float
    retirement_amount: float = 0.0

