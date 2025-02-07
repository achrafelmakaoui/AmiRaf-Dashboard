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
import { userRequest } from "../../../RequestMethod"; // Import authenticated request instance

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesOverTimeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userRequest.get("/order/sales-over-time"); // Use userRequest
        const data = response.data;

        const dates = data.map((entry) => entry.date);
        const sales = data.map((entry) => entry.totalSales);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Total Sales",
              data: sales,
              borderColor: "#2d2e32",
              backgroundColor: "#2d2e32",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        if (error.response?.status === 403) {
          console.error("Access denied: Admin privileges required.");
          // Handle unauthorized access (e.g., show a message, redirect, etc.)
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
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

  return <Line data={chartData} options={options} />;
};

export default SalesOverTimeChart;
