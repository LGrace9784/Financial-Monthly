// Purpose: charts the retirement growth curve so the user can visualize how the balance changes over time.

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

function RetirementChart({ results }) {
  if (!results) return null;

  const data = {
    labels: results.year_labels,
    datasets: [
      {
        label: "Retirement Growth",
        data: results.growth_data,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Retirement Growth Over Time",
      },
    },
  };

  return (
    <div className="card p-3 mt-4" style={{ minHeight: 360 }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default RetirementChart;