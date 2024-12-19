import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OrderStatusChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch data for order status
    fetch("http://localhost:5000/api/order/status-distribution")
      .then((response) => response.json())
      .then((data) => {
        // Sort the data according to the desired order
        const sortedData = [
          { status: "LVR", color: "rgb(32, 243, 28)", count: 0 },
          { status: "RTR", color: "rgba(40, 39, 39, 0.551)", count: 0 },
          { status: "REF", color: "rgb(255, 2, 2)", count: 0 },
          { status: "NTW", color: "rgba(255, 2, 2, 0.663)", count: 0 },
          { status: "CNF", color: "rgba(2, 255, 65, 0.663)", count: 0 },
          { status: "ATT", color: "rgba(69, 168, 255, 0.663)", count: 0 },
        ];
        
        // Fill the counts based on the data received
        data.forEach((entry) => {
          const statusIndex = sortedData.findIndex(
            (item) => item.status === entry.status
          );
          if (statusIndex !== -1) {
            sortedData[statusIndex].count = entry.count;
          }
        });

        // Set the chart data
        setChartData({
          labels: sortedData.map((item) => item.status), // Sorted labels
          datasets: [
            {
              label: "Order Status Distribution",
              data: sortedData.map((item) => item.count), // Sorted counts
              backgroundColor: sortedData.map((item) => item.color), // Colors based on status
              borderColor: "#ffffff",
              borderWidth: 1,
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
        text: "Order Status Distribution",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Order Status",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Orders",
        },
        beginAtZero: true,
      },
    },
  };

  return (
      <Bar data={chartData} options={options} />
  );
};

export default OrderStatusChart;
