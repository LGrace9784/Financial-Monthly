# Purpose: holds the core financial calculations for disposable income, annual savings, emergency funding, and retirement projections.

# Calculates how much money remains after the user's required monthly expenses are covered.
def monthly_disposable_income(
    income: float,
    needed_expenses: float,
):

 return income - needed_expenses

# Converts monthly disposable income into an annual savings estimate, flagging negative value cases.
def annual_savings(monthly_disposable_income: float):
    if monthly_disposable_income < 0:
        return "Cannot Save Money"
    else:
        return round(monthly_disposable_income * 12, 2)

# Estimates the emergency fund range using a 3x to 6x monthly expense target band.
def emergency_fund(needed_expenses: float):
    min_emergency_fund = needed_expenses * 3
    max_emergency_fund = needed_expenses * 6

    return {
        "min": round(min_emergency_fund, 2),
        "max": round(max_emergency_fund, 2),
    }

# Projects a larger cash reserve target based on a 36-month expense buffer rule of thumb.
def peace_fund(needed_expenses: float):
    peace_fund_amount = needed_expenses * 36
    return round(peace_fund_amount, 2)

# Uses compound growth math to estimate the future retirement balance at the selected retirement age.
def retirement_future_value(
    retirement_amount: float,
    monthly_contribution: float,
    annual_return_rate: float,
    current_age: float,
    retirement_age: float,
):

    n = int((retirement_age - current_age) * 12)
    r = (annual_return_rate / 100) / 12

    if n <= 0:
        return retirement_amount

    if r == 0.0:
        return retirement_amount + monthly_contribution * n

    pfv = retirement_amount * ((1 + r) ** n)
    cfv = monthly_contribution * (((1 + r) ** n - 1) / r)

    retirement_value = round(pfv + cfv, 0)

    return retirement_value

# Builds a year-by-year growth timeline showing the retirement balance from current age to retirement age.
def retirement_growth_data(
    retirement_amount: float,
    monthly_contribution: float,
    annual_return_rate: float,
    current_age: float,
    retirement_age: float
):

    data = []
    years = int(retirement_age - current_age)
    r = (annual_return_rate / 100) / 12

    if years < 0:
        return data

    for year in range(0, years + 1):
        n = year * 12

        if r == 0:
            pfv = retirement_amount
            cfv = monthly_contribution * n
        else:
            pfv = retirement_amount * ((1 + r) ** n)
            cfv = monthly_contribution * (((1 + r) ** n - 1) / r)

        data.append(round(pfv + cfv, 0))

    return data