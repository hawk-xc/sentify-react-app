import React from "react";
import { Bar } from "react-chartjs-2";

const StackedBarChart = ({ data }) => {
  const chartData = {
    labels: ["Categories"],
    datasets: [
      {
        label: "Positive",
        data: [data.positive],
        backgroundColor: "rgba(76, 175, 80, 0.7)", // Hijau lembut
        borderColor: "rgba(76, 175, 80, 1)",
        borderWidth: 1,
      },
      {
        label: "Neutral",
        data: [data.neutral],
        backgroundColor: "rgba(158, 158, 158, 0.7)", // Abu-abu lembut
        borderColor: "rgba(158, 158, 158, 1)",
        borderWidth: 1,
      },
      {
        label: "Negative",
        data: [data.negative],
        backgroundColor: "rgba(244, 67, 54, 0.7)", // Merah lembut
        borderColor: "rgba(244, 67, 54, 1)",
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
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
