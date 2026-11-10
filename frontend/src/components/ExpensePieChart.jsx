// Purpose: shows the split between needs, wants, and savings based on the user’s expense and retirement inputs.

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const percentageLabelsPlugin = {
  id: "percentageLabels",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const total = dataset.data.reduce((sum, value) => sum + Number(value || 0), 0);

    if (!total) {
      return;
    }

    chart.getDatasetMeta(0).data.forEach((arc, index) => {
      const value = Number(dataset.data[index] || 0);
      const percentage = Math.floor((value / total) * 100);

      if (!value) {
        return;
      }

      const { x, y } = arc.tooltipPosition();
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${percentage}%`, x, y);
      ctx.restore();
    });
  },
};

const palette = {
  needs: "#0d6efd",
  wants: "#fd7e14",
  savings: "#198754",
};

function ExpensePieChart({ expenses, retirementContribution = 0 }) {
  const totals = {
    needs: 0,
    wants: 0,
    savings: Number(retirementContribution || 0),
  };

  (expenses ?? []).forEach((expense) => {
    const amount = Number(expense?.amount ?? 0);

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    if (expense?.isNeeded === true) {
      totals.needs += amount;
      return;
    }

    if (expense?.category === "Savings") {
      totals.savings += amount;
      return;
    }

    totals.wants += amount;
  });

  const labels = ["Needs", "Wants", "Savings"];
  const values = [totals.needs, totals.wants, totals.savings];
  const total = values.reduce((sum, value) => sum + Number(value || 0), 0);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [palette.needs, palette.wants, palette.savings],
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
        labels: {
          generateLabels(chart) {
            const dataset = chart.data.datasets[0];
            const totalValue = dataset.data.reduce((sum, value) => sum + Number(value || 0), 0);

            return chart.data.labels.map((label, index) => {
              const value = Number(dataset.data[index] || 0);
              const percent = totalValue ? Math.floor((value / totalValue) * 100) : 0;

              return {
                text: `${label} ${percent}%`,
                fillStyle: dataset.backgroundColor[index],
                strokeStyle: dataset.backgroundColor[index],
                lineWidth: 0,
                hidden: value <= 0,
              };
            });
          },
        },
      },
      title: {
        display: true,
        text: "Needs vs Wants vs Savings",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = Number(context.parsed || 0);
            const percent = total ? Math.floor((value / total) * 100) : 0;
            return `${context.label}: ${percent}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ minHeight: 280 }}>
      <Pie data={data} options={options} plugins={[percentageLabelsPlugin]} />
    </div>
  );
}

export default ExpensePieChart;
