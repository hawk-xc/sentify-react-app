import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS modules
ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ data }) => {
  // Data untuk Gauge Chart
  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [data.positive, data.neutral, data.negative],
        backgroundColor: [
          "rgba(144, 238, 144, 0.7)", // Hijau lembut
          "rgba(200, 200, 200, 0.7)", // Abu-abu lembut
          "rgba(255, 182, 193, 1)", // Merah lembut
        ],
        borderColor: [
          "rgba(76, 175, 80, 0.2)",
          "rgba(158, 158, 158, 0.2)",
          "rgba(244, 67, 54, 0.2)",
        ],
        borderWidth: 1,
        cutout: "75%", // Membuat area tengah kosong
      },
    ],
  };

  // Opsi chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  // Menentukan key dominan
  const getDominantLabel = () => {
    const values = [data.positive, data.neutral, data.negative];
    const labels = ["Positive", "Neutral", "Negative"];
    const maxIndex = values.indexOf(Math.max(...values));
    return { label: labels[maxIndex], value: values[maxIndex] };
  };

  const dominant = getDominantLabel();

  return (
    <div style={{ position: "relative", width: "400px", height: "400px" }}>
      <Doughnut data={chartData} options={options} />
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <span className="text-5xl font-semibold">{dominant.label}</span>
        <br />
        <span className="text-xl text-gray-600">({dominant.value})</span>
      </div>
    </div>
  );
};

export default GaugeChart;
