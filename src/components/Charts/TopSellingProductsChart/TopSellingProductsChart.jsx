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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopSellingProductsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch order data from the backend API
    fetch("https://server.amiraf.shop/api/order/top-selling-products")
      .then((response) => response.json())
      .then((data) => {
        // Transform the data to fit Chart.js format
        const productTitles = data.map((item) => item.productTitle);
        const quantities = data.map((item) => item.totalQuantity);

        setChartData({
          labels: productTitles, // X-axis: Product titles
          datasets: [
            {
              label: "Quantity Sold",
              data: quantities, // Y-axis: Quantity of products with status 'LVR'
              backgroundColor: "#2d2e32",
              borderColor: "#2d2e32",
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
        text: "Top-Selling Products",
      },
    },
  };

  return (
      <Bar data={chartData} options={options} />
  );
};

export default TopSellingProductsChart;
