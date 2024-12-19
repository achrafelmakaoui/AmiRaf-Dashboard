import React, { useEffect, useState } from "react";

const TotalSalesRevenue = () => {
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);

  useEffect(() => {
    // Fetch total sales revenue from the backend
    fetch("http://localhost:5000/api/order/total-sales-revenue")
      .then((response) => response.json())
      .then((data) => {
        setTotalSalesRevenue(data.totalSalesRevenue);
      })
      .catch((error) => console.error("Error fetching total sales revenue:", error));
  }, []);

  return (
    <>
      <span className="totalSalesRevenueSpan">Total Sales Revenue</span>
      <h1 className="totalSalesRevenueH1">{totalSalesRevenue.toFixed(2)} DH</h1>
    </>
  );
};

export default TotalSalesRevenue;
