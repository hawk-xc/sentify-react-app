import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data }) => {
  // Data untuk Doughnut Chart
  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [data.positive, data.neutral, data.negative],
        backgroundColor: [
          "rgba(76, 175, 80, 0.7)", // Hijau lembut
          "rgba(158, 158, 158, 0.7)", // Abu-abu lembut
          "rgba(244, 67, 54, 0.7)", // Merah lembut
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
        position: "top",
      },
    },
  };

  return (
    <div className="md:w-[400px] md:h-[400px] max-sm:w-[250px] max-sm:h-[250px]">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
