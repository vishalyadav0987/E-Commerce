import React from 'react'
import './ConfirmOrder.css'
import CheckOutStep from '../../Components/CheckOutStep/CheckOutStep'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user, isAuthenticate } = useSelector(state => state.user);

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    )

    const shippingCharges = subTotal > 500 ? 0 : 20;

    const tax = subTotal * 0.2;

    const Total = tax + shippingCharges + subTotal;

    const address = `${shippingInfo.address}, ` + `${shippingInfo.state}, ` + `${shippingInfo.city} `;

    const proceedPaymentHandler = () => {
        const data = {
            subTotal,
            shippingCharges,
            tax,
            Total
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data))
        if (isAuthenticate === true) {
            navigate('/process/payment');
        }
    }

    return (
        <>
            <CheckOutStep activeStep={1} />
            <section className="cofirm-order">
                <div className="confirm-container">
                    <div className="left">
                        <div className="shipping-info-box">
                            <h1 className="shipping-heading-1">Shipping Info</h1>
                            <div>
                                <div className="box-1 flex-gap">
                                    <span><b>Name</b>:</span>
                                    <span>{user.name}</span>
                                </div>
                                <div className="box-1 flex-gap">
                                    <span><b>Phone</b>:</span>
                                    <span>{shippingInfo.phoneNo}</span>
                                </div>
                                <div className="box-1 flex-gap">
                                    <span><b>Address</b>:</span>
                                    <span>{address}</span>
                                </div>
                            </div>
                        </div>
                        <div className="cart-info-box">
                            <h1 className="shipping-heading-1">Your Cart Items</h1>
                            <div>
                                {
                                    cartItems && cartItems.map((item, index) => (
                                        <div className="item-1" key={index}>
                                            <div className="img-name">
                                                <Link to={`/product/${item.id}`}>
                                                    <img src="https://i.ibb.co/DRST11n/1.webp" alt=""
                                                        style={{ width: "8rem", borderRadius: "4px" }} />
                                                </Link>
                                                <Link to={`/product/${item.id}`}>
                                                    <span style={{ fontSize: "18px" }}>{"Pant"}</span>
                                                </Link>
                                            </div>
                                            <span className="quantity-ruppee">
                                                {item.quantity} x ₹{item.price} = <b>₹
                                                    {item.quantity * item.price}</b>
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <h1 className="shipping-heading">Order Summary</h1>
                        <div>
                            <div className="subtotal-text-p flex-space">
                                <span>SubTotal:</span>
                                <span>₹{subTotal}</span>
                            </div>
                            <div className="subtotal-text-p flex-space">
                                <span>Shipping charges:</span>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div className="subtotal-text-p flex-space">
                                <span>GST:</span>
                                <span>₹{tax}</span>
                            </div>
                            <div className="subtotal-text-p flex-space">
                                <span>Total:</span>
                                <span>₹{Total}</span>
                            </div>
                        </div>
                        <button
                            className='procced-to-pay'
                            onClick={proceedPaymentHandler}
                        >Procced To Pay</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ConfirmOrder
