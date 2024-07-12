import React, { useEffect } from 'react';
import '../ProductList/ProductList.css'
import { DataGrid } from '@material-ui/data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import SideBar from '../SideBar/SideBar';
import { clearError, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrderList = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { orders, error } = useSelector(state => state.allOrder);
    const { isDeleted, message: deleteMessage, error: DeleteError } = useSelector(state => state.updateAndDeleteOrder);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (DeleteError) {
            alert.error(DeleteError);
            dispatch(clearError());
        }
        if (isDeleted) {
            alert.success(deleteMessage);
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, DeleteError, isDeleted, navigate]);




    const columns = [
        {
            field: 'id', headerName: 'Order ID', minWidth: 300,
            flex: 1
        },
        {
            field: 'status', headerName: 'Status', minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor"
            }
        },
        {
            field: 'itemsQty', headerName: 'Items Oty', type: 'number', minWidth: 150,
            flex: 0.3
        },
        {
            field: 'amount', headerName: 'Amount', type: 'number', minWidth: 100,
            flex: 0.3
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => {
                            deleteOrderHandler(params.getValue(params.id, 'id'))
                        }}><DeleteIcon /></Button>
                    </>
                );
            }
        }
    ];

    const rows = [];

    orders && orders.forEach((order) => {
        rows.push({
            id: order._id,
            itemsQty: order.OrderItems.length,
            amount: order.totalPrice,
            status: order.orderStatus,
        })
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className="dashboard dashboard-ok">
            <SideBar />
            <div className="productListContainer">
                <h1 id="productListHeading">ALL ORDERS</h1>
                {/* { */}
                {/* loading */}
                {/* ? <Loader /> */}
                {/* : */}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
                {/* } */}
            </div>
        </div>
    )
}

export default OrderList
