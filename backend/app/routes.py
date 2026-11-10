# Purpose: defines the API endpoints that receive form data and return the calculated financial summary.

from fastapi import APIRouter

from app.schemas import FinanceInput

# Pulls in the finance logic used to calculate monthly, yearly, and retirement metrics.
from app.services.calculator import (
    monthly_disposable_income,
    annual_savings,
    emergency_fund,
    peace_fund,
    retirement_future_value,
    retirement_growth_data
)

router = APIRouter()

# Receives the user inputs, calculates the results, and sends the summary back to the frontend.
@router.post("/api/calculate")
def calculate(data: FinanceInput):

    # Monthly disposable income is based on net income minus both needed and non-needed expenses.
    # Retirement contribution is intentionally excluded here because it is treated as savings,
    # not as a monthly expense line item.
    total_needed_expenses = sum(
        item.amount for item in data.needed_expenses if item.is_needed
        )
    total_other_expenses = sum(
        item.amount for item in data.needed_expenses if not item.is_needed
        )

    monthly_disposable = monthly_disposable_income(
        data.income,
        total_needed_expenses + total_other_expenses,
        )

    annual_save = annual_savings(monthly_disposable)

    ef = emergency_fund(total_needed_expenses)
    emergency_min = ef.get("min")
    emergency_max = ef.get("max")

    pf = peace_fund(total_needed_expenses)


# Retirement Section

    retirement_value = retirement_future_value(
        data.retirement_amount,
        data.retirement_contribution,
        data.annual_return_rate,
        data.current_age,
        data.retirement_age
    )

    growth_data = retirement_growth_data(
        data.retirement_amount,
        data.retirement_contribution,
        data.annual_return_rate,
        data.current_age,
        data.retirement_age
    )

    start_age = int(data.current_age)
    year_labels = [start_age + i for i in range(len(growth_data))]




# Financial Health Status

    free_cash_flow = monthly_disposable + data.retirement_contribution

    if free_cash_flow > .49 * data.income:
        status = "Excellent"
        status_color = "#22c55e"
    elif free_cash_flow > .3 * data.income:
        status = "Great"
        status_color = "#3b82f6"
    elif free_cash_flow > .25 * data.income:
        status = "Okay"
        status_color = "#f59e0b"
    elif free_cash_flow > .15 * data.income:
        status = "Caution: Cut Spending"
        status_color = "#facc15"
    else:
        status = "Overspending"
        status_color = "#ef4444"




# Housing Ratio
    housing_expense = next(
        (item.amount for item in data.needed_expenses if item.category.lower() == "rent/mortgage"),
        0.0,
    )
    housing_ratio = (housing_expense / data.income * 100) if data.income else 0.0

    if housing_ratio == 0:
        housing_status = "No House Expense!"
        housing_status_color = "#22c5bd"
    elif housing_ratio <= 25:
        housing_status = "Excellent"
        housing_status_color = "#22c55e"
    elif housing_ratio <= 30:
        housing_status = "Great"
        housing_status_color = "#3b82f6"
    elif housing_ratio <= 35:
        housing_status = "Manageable"
        housing_status_color = "#f59e0b"
    elif housing_ratio <= 40:
        housing_status = "Over Recommended Threshold"
        housing_status_color = "#facc15"
    else:
        housing_status = "Too Much House"
        housing_status_color = "#ef4444"

    housing_expense_ratio = f"{housing_status} ({housing_ratio:.0f}%)"

# Make sure to add the return values here after you insert them above in the calculate section.
    return {
        "monthly_disposable_income": monthly_disposable,
        "annual_savings": annual_save,
        "emergency_min": emergency_min,
        "emergency_max": emergency_max,
        "peace_fund": pf,
        "retirement_value": retirement_value,
        "status": status,
        "status_color": status_color,
        "housing_expense_ratio": housing_expense_ratio,
        "housing_expense_ratio_color": housing_status_color,
        "growth_data": growth_data,
        "year_labels": year_labels
    }