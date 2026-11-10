// Purpose: shows each financial result as a compact summary card without inline editing.

function ResultsCards({ results }) {
  if (!results) return null;

  const formatCurrency = (value) => `$${Number(value).toLocaleString()}`;

  const cards = [
    {
      key: "monthly_disposable_income",
      label: "Monthly Disposable Income",
      value: results.monthly_disposable_income,
      description: "This is the amount of money that you have available after all the needed expenses have been accounted for. This amount includes Retirement contribution.",
    },
    {
      key: "annual_savings",
      label: "Annual Savings",
      value: results.annual_savings,
      description: "This is the amount you can save per year based off your monthly disposable income",
    },
    {
      key: "emergency_fund",
      label: "Emergency Fund",
      value: `${formatCurrency(results.emergency_min)} - ${formatCurrency(results.emergency_max)}`,
      description: "This is 3 - 6 months of your needed expenses that is recommended to have in case of an emergency",
    },
    {
      key: "peace_fund",
      label: "Peace Fund",
      value: results.peace_fund,
      description: "This represents 3 years of needed expenses that allows you to have extrodinary peace",
    },
    {
      key: "retirement_value",
      label: "Retirement Value",
      value: results.retirement_value,
      description: "This is the projected value of your retirement savings at the time of retirement",
    },
    {
      key: "financial_health",
      label: "Financial Health",
      value: results.status,
      color: results.status_color,
      description: "The looks at your monthly expenses to determine your financial health",
    },
    {
      key: "housing_expense_ratio",
      label: "Housing Expense Ratio",
      value: results.housing_expense_ratio,
      color: results.housing_expense_ratio_color,
      description: "The percentage of your take-home pay going to rent or mortgage. A healthy target is 25% or less.",
    },
  ];

  const formatValue = (value) => {
    if (typeof value === "string") return value;
    return formatCurrency(value);
  };

  return (
    <div className="row mt-3 g-3">
      {cards.map(({ key, label, value, color, description }) => (
        <div className="col-md-4" key={key}>
          <div
            className="card shadow h-100 compact-result-card"
            tabIndex="0"
            aria-describedby={`${key}-description`}
          >
            <div className="card-body compact-card-body position-relative">
              <div className="d-flex justify-content-center align-items-center mb-1 compact-header-row">
                <h5 className="mb-0 text-center compact-label px-4">{label}</h5>
              </div>

              <h4
                className="text-center compact-value"
                style={key === "financial_health" || key === "housing_expense_ratio" ? { color } : undefined}
              >
                {formatValue(value)}
              </h4>

              <p id={`${key}-description`} className="compact-description">
                {description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsCards;