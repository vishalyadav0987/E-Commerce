import React, { useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import './DashBoard.css';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement, // Import ArcElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

const DashBoard = () => {
  // Register the necessary components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement, // Register ArcElement
    Title,
    Tooltip,
    Legend
  );

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const lineOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
      },
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [2, 100],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };

  useEffect(()=>{
    window.scrollTo(0,0);
  })

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-container">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{"300"}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{"23"}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{"23"}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{"19"}</p>
            </Link>
          </div>
        </div>
        <div className="line-chart">
          <Line data={lineState} options={lineOptions} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
