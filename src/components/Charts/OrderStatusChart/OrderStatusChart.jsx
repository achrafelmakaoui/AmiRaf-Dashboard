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
import { userRequest } from "../../../RequestMethod";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OrderStatusChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userRequest.get("/order/status-distribution");
        const data = response.data;

        const sortedData = [
          { status: "LVR", color: "#2d2e32", count: 0 },
          { status: "RTR", color: "#2d2e32", count: 0 },
          { status: "REF", color: "#2d2e32", count: 0 },
          { status: "NTW", color: "#2d2e32", count: 0 },
          { status: "CNF", color: "#2d2e32", count: 0 },
          { status: "ATT", color: "#2d2e32", count: 0 },
        ];

        data.forEach((entry) => {
          const statusIndex = sortedData.findIndex(
            (item) => item.status === entry.status
          );
          if (statusIndex !== -1) {
            sortedData[statusIndex].count = entry.count;
          }
        });

        setChartData({
          labels: sortedData.map((item) => item.status),
          datasets: [
            {
              label: "Order Status Distribution",
              data: sortedData.map((item) => item.count),
              backgroundColor: sortedData.map((item) => item.color),
              borderColor: "#ffffff",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return <Bar data={chartData} options={options} />;
};

export default OrderStatusChart;
