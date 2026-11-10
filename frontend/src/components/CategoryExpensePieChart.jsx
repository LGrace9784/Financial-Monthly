// Purpose: shows how much each expense category contributes in dollar value.

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const palette = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
];

function CategoryExpensePieChart({ expenses }) {
  const totals = {};

  (expenses ?? []).forEach((expense) => {
    const category = expense?.category ?? "Misc";
    const amount = Number(expense?.amount ?? 0);

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    totals[category] = (totals[category] ?? 0) + amount;
  });

  const entries = Object.entries(totals).map(([label, value], index) => ({
    label,
    value,
    color: palette[index % palette.length],
  }));

  if (entries.length === 0) {
    return (
      <div
        className="text-center text-muted small border rounded bg-light d-flex align-items-center justify-content-center"
        style={{ minHeight: 220, width: "100%" }}
      >
        Add expense amounts to view category totals
      </div>
    );
  }

  const data = {
    labels: entries.map((entry) => entry.label),
    datasets: [
      {
        data: entries.map((entry) => entry.value),
        backgroundColor: entries.map((entry) => entry.color),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Spending by Category",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = Number(context.parsed || 0);
            const totalValue = data.datasets[0].data.reduce((sum, amount) => sum + Number(amount || 0), 0);
            const percent = totalValue ? Math.floor((value / totalValue) * 100) : 0;
            return `${context.label}: $${value.toLocaleString()} (${percent}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ minHeight: 280 }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CategoryExpensePieChart;
