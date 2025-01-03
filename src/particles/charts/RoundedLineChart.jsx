import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrasi elemen Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

// Fungsi untuk membuat efek gradasi
const createGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradient.addColorStop(0, "rgba(135, 206, 250, 0.5)"); // Sky Blue
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // White
  return gradient;
};

const RoundedLineChart = ({ data }) => {
  const chartRef = useRef(null);

  // Ekstraksi label dan data dari dummy data
  const labels = data.map((item) => item.date);
  const values = data.map((item) => item.totalSentiment);

  // Konfigurasi data Chart.js
  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Sentiment",
        data: values,
        borderColor: "rgba(135, 206, 250, 1)",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: chartCtx, chartArea } = chart;
          if (!chartArea) return null; // Tunggu hingga area chart tersedia
          return createGradient(chartCtx, chartArea);
        },
        fill: true,
        tension: 0.4, // Membuat garis lebih halus
        pointRadius: 5,
        pointBackgroundColor: "rgba(135, 206, 250, 1)",
      },
    ],
  };

  // Konfigurasi opsi Chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "rgba(200, 200, 200, 0.3)", // Grid garis y
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.resize();
    }
  }, []);

  return (
    <div className="w-[100%] md:h-[300px] max-sm:h-[200px]">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default RoundedLineChart;
