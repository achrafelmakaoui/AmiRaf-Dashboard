import React from 'react';
import './DashLandingPage.css';
import TopSellingProductsChart from '../Charts/TopSellingProductsChart/TopSellingProductsChart';
import SalesOverTimeChart from '../Charts/SalesOverTimeChart/SalesOverTimeChart';
import OrderStatusChart from '../Charts/OrderStatusChart/OrderStatusChart';
import TotalSalesRevenue from '../Charts/TotalSalesRevenue/TotalSalesRevenue';

const DashLandingPage = () => {

    return (
        <div className='reportDiv'>
            <div className='box'><TotalSalesRevenue/></div>
            <div className='box'><TopSellingProductsChart/></div>
            <div className='box'><SalesOverTimeChart/></div>
            <div className='box'><OrderStatusChart/></div>
        </div>
    );
}

export default DashLandingPage;
