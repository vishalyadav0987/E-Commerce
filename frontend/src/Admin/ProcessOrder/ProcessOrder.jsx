import React, { useEffect, useState } from 'react';
import './ProcessOrder.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { clearError, singleOrderDetail, updateOrder } from '../../actions/orderAction';
import Loader from '../../Components/Loader/Loder';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { useAlert } from 'react-alert';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import SideBar from '../SideBar/SideBar';

const ProcessOrder = () => {
    const alert = useAlert();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { order, error, loading } = useSelector((state) => state.singleOrderDetails);
    const { isUpdated, message, error: updateError } = useSelector((state) => state.updateAndDeleteOrder);

    
    const [orderStatus, setOrderStatus] = useState('');
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();
        myForm.set('orderStatus', orderStatus);
        console.log(myForm)
        
        dispatch(updateOrder(id, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }
        if (isUpdated) {
            alert.success(message);
            dispatch({ type: UPDATE_ORDER_RESET });
            navigate('/admin/orders');
        }

        dispatch(singleOrderDetail(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <section className="confirm-order">
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">PROCESS ORDER</h1>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="confirm-container">
                            <div className="left">
                                <div className="shipping-info-box">
                                    <h1 className="shipping-heading-1">Shipping Info</h1>
                                    <div>
                                        <div className="box-1 flex-gap">
                                            <span><b>Name</b>:</span>
                                            <span>{order.userId && order.userId.name}</span>
                                        </div>
                                        <div className="box-1 flex-gap">
                                            <span><b>Phone</b>:</span>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div className="box-1 flex-gap">
                                            <span><b>Address</b>:</span>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="orderDetailsPaymentStatus">
                                    <div className="payment-info">
                                        <h1 className="shipping-heading-1">Payment</h1>
                                        <div className="infoPayment">
                                            <span
                                                style={{ fontWeight: '600' }}
                                                className={
                                                    order.paymentInfo && order.paymentInfo.status === 'succeeded'
                                                        ? 'greenColor'
                                                        : 'redColor'
                                                }
                                            >
                                                {order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                                            </span>
                                            <span>
                                                <span className="amount-text">Amount: </span>
                                                <span>₹{order && order.totalPrice}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="status-info">
                                        <h1 className="shipping-heading-1">Order Info</h1>
                                        <span
                                            className={order && order.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}
                                        >
                                            {order && order.orderStatus}
                                        </span>
                                    </div>
                                </div>
                                <div className="cart-info-box">
                                    <h1 className="shipping-heading-1">Your Cart Items</h1>
                                    <div>
                                        {order.OrderItems &&
                                            order.OrderItems.map((item, index) => (
                                                <div className="item-1" key={index}>
                                                    <div className="img-name">
                                                        <Link to={`/product/${item.productId}`}>
                                                            <img src={item.image} alt="" style={{ width: '8rem', borderRadius: '4px' }} />
                                                        </Link>
                                                        <Link to={`/product/${item.productId}`}>
                                                            <span style={{ fontSize: '18px' }}>{item && item.name}</span>
                                                        </Link>
                                                    </div>
                                                    <span className="quantity-ruppee">
                                                        {item.quantity} x ₹{item.price} = <b>₹{item.quantity * item.price}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className="right" style={{ border: 'none', padding: '0 20px' }}>
                                <div
                                    style={{
                                        display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                                        width: '100%',
                                    }}
                                >
                                    <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler} style={{ padding: '10px' }}>
                                        <h1 className="shipping-heading-1" style={{ marginBottom: '0px', textAlign: 'center', width: '100%' }}>
                                            Process Order
                                        </h1>
                                        <div>
                                            <AccountTreeIcon />
                                            <select onChange={(e) => setOrderStatus(e.target.value)}>
                                                <option value="">Choose Status</option>
                                                {order.orderStatus === 'Processing' && <option value="Shipped">Shipped</option>}
                                                {order.orderStatus === 'Shipped' && <option value="Delivered">Delivered</option>}
                                            </select>
                                        </div>
                                        <Button
                                            id="createProductBtn"
                                            type="submit"
                                        >
                                            Process
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProcessOrder;
