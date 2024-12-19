import React, { useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const PieChart = ({ values }) => {
  const chartRef = useRef(null);

  const labels = ["Positive", "Neutral", "Negative"];
  const colors = {
    positive: {
      background: "rgba(102, 187, 106, 0.6)", // Hijau lembut
      border: "rgba(102, 187, 106, 1)",
    },
    neutral: {
      background: "rgba(189, 189, 189, 0.6)", // Abu-abu
      border: "rgba(189, 189, 189, 1)",
    },
    negative: {
      background: "rgba(244, 67, 54, 0.6)", // Merah lembut
      border: "rgba(244, 67, 54, 1)",
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sentiment Analysis",
        backgroundColor: [
          colors.positive.background,
          colors.neutral.background,
          colors.negative.background,
        ],
        borderColor: [
          colors.positive.border,
          colors.neutral.border,
          colors.negative.border,
        ],
        borderWidth: 1,
        data: values,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Pie
        data={data}
        options={options}
        ref={(el) => {
          if (el && el.chartInstance) {
            chartRef.current = el.chartInstance;
          }
        }}
      />
    </div>
  );
};

export default PieChart;
