import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi elemen dasar
ChartJS.register(ArcElement, Tooltip, Legend);

// Plugin khusus untuk teks di tengah
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    if (chart.config.type === "doughnut" && chart.config.options.plugins.centerText?.enabled) {
      const { width, height, ctx } = chart;
      const total = chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);

      ctx.save();
      ctx.font = "24px Arial";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${total}`, width / 2, height / 2.5);
      ctx.restore();
    }
  },
};

ChartJS.register(centerTextPlugin);

const DoughnutChart = ({ data }) => {
  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment",
        data: [data.positive, data.neutral, data.negative],
        backgroundColor: [
          "rgba(76, 175, 80, 0.7)",
          "rgba(158, 158, 158, 0.7)",
          "rgba(244, 67, 54, 0.7)",
        ],
        borderColor: [
          "rgba(76, 175, 80, 1)",
          "rgba(158, 158, 158, 1)",
          "rgba(244, 67, 54, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
      centerText: {
        enabled: true, // Aktifkan plugin khusus hanya untuk chart ini
      },
    },
  };

  return (
    <div style={{ width: "230px", height: "230px" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
