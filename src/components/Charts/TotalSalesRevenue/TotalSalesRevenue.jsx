import React, { useEffect, useState } from "react";
import { userRequest } from "../../../RequestMethod"; // Import authenticated request instance

const TotalSalesRevenue = () => {
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await userRequest.get("/order/total-sales-revenue"); // Authenticated request
        setTotalSalesRevenue(response.data.totalSalesRevenue);
      } catch (error) {
        if (error.response?.status === 403) {
          console.error("Access denied: Admin privileges required.");
        } else {
          console.error("Error fetching total sales revenue:", error);
        }
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <>
      <span className="totalSalesRevenueSpan">Total Sales Revenue</span>
      <h1 className="totalSalesRevenueH1">{totalSalesRevenue.toFixed(2)} DH</h1>
    </>
  );
};

export default TotalSalesRevenue;
