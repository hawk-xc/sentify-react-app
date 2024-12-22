import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import "chart.js/auto";

const BarChart = ({ graphData, datasetLabel, colors }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const labels = graphData.map((item) => item.tagname);
  const values = graphData.map((item) => item.value);

  const backgroundColor = colors?.background || "rgba(244, 67, 54, 0.7)";
  const borderColor = colors?.border || "rgba(244, 67, 54, 1)";

  const data = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel || "Tag Frequency",
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1,
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ChartJS(chartContainer.current, {
      type: "bar",
      data,
      options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [graphData, datasetLabel, colors]);

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default BarChart;
