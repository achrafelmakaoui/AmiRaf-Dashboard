import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { userRequest } from "../../../RequestMethod"; // Import authenticated request instance

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopSellingProductsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userRequest.get("/order/top-selling-products"); // Use authenticated request
        const data = response.data;

        const productTitles = data.map((item) => item.productTitle);
        const quantities = data.map((item) => item.totalQuantity);

        setChartData({
          labels: productTitles,
          datasets: [
            {
              label: "Quantity Sold",
              data: quantities,
              backgroundColor: "#2d2e32",
              borderColor: "#2d2e32",
              borderWidth: 1,
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
        text: "Top-Selling Products",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TopSellingProductsChart;
