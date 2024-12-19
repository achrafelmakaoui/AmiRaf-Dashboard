// SalesOverTimeChart.js
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesOverTimeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch sales data grouped by day
    fetch("http://localhost:5000/api/order/sales-over-time")
      .then((response) => response.json())
      .then((data) => {
        const dates = data.map((entry) => entry.date);
        const sales = data.map((entry) => entry.totalSales);

        setChartData({
          labels: dates, // X-axis: Dates
          datasets: [
            {
              label: "Total Sales",
              data: sales, // Y-axis: Sales amounts
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4, // Smooth curves
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Over Time (Daily)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Sales",
        },
      },
    },
  };

  return (
      <Line data={chartData} options={options} />
  );
};

export default SalesOverTimeChart;
