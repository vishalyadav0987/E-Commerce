import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { MdRocketLaunch } from "react-icons/md";
import Loader from '../../Components/Loader/Loder'
import { DataGrid } from '@material-ui/data-grid'
import Typography from '@material-ui/core/Typography'
import { clearError, getMyOrder } from '../../actions/orderAction'
import './MyOrder.css'


const MyOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector(state => state.myOrders);
  const { user } = useSelector(state => state.user);

  const rows = [];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor" : "redColor"
      }
    },
    { field: "itemQty", headerName: "Item Qty", minWidth: 150, type: "number", flex: 0.3 },
    { field: "amount", headerName: "Amount", minWidth: 270, type: "number", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150, type: "number",
      flex: 0.5, sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.getValue(params.id, "id")}`}>
            <MdRocketLaunch />
          </Link>
        )
      }
    },
  ];

  orders && orders.forEach((item, index) => {
    rows.push({
      itemQty: item.OrderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice
    })
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getMyOrder());
  }, [dispatch, alert, error])
  return (
    <>
      {
        loading
          ? <Loader />
          : <div className='my-order-page'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='my-order-table'
              autoHeight
            />
            <Typography id='my-order-heading'>{user.name}'s Orders</Typography>

          </div>
      }
    </>
  )
}

export default MyOrder
