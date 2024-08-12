import React, { useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import './DashBoard.css';
import { Link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
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
import { useDispatch, useSelector } from 'react-redux'
import { productForAdminPanel } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';

const DashBoard = () => {
  // Register the necessary components
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const { totalAmount, orders } = useSelector(state => state.allOrder)
  const { users } = useSelector(state => state.allUser);
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

  useEffect(() => {
    dispatch(productForAdminPanel())
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;

  products && products.forEach((product) => {
    if (product.Stock === 0) {
      outOfStock += 1;
    }
  });

  console.log()

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
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
        data: [outOfStock, products && products.length - outOfStock],
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

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-container">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p style={{ fontSize: "14px" }}>
              Total Amount <br /> ₹{totalAmount && Math.round(totalAmount)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products?.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders?.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users?.length}</p>
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
