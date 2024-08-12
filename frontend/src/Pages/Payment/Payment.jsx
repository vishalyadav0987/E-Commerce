import React, { useEffect, useRef } from 'react';
import './Payment.css'
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsCalendarEventFill } from "react-icons/bs";
import { MdVpnKeyOff } from "react-icons/md";
import CheckOutStep from '../../Components/CheckOutStep/CheckOutStep';
import Typography from "@mui/material/Typography";
import { CardExpiryElement, CardCvcElement, CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAlert } from 'react-alert'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { clearError, createOrder } from '../../actions/orderAction';

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const payBtn = useRef(null);
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useSelector(state => state.user);
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.Total) * 100
    }

    const orderDetails = {
        shippingInfo,
        OrderItems: cartItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.Total,
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post('/api/v1/payment/process', paymentData, config);

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    orderDetails.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(orderDetails))
                    navigate('/success');
                }
                else {
                    alert.error("There's some while processing the payment");
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message)
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
    }, [dispatch, alert, error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <>
            <CheckOutStep activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={submitHandler}>
                    <Typography>Card Info</Typography>
                    <div>
                        <BsFillCreditCardFill />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <BsCalendarEventFill />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <MdVpnKeyOff />
                        <CardCvcElement className="paymentInput" />
                    </div>
                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && Math.round(orderInfo.Total)}`}
                        ref={payBtn}
                        className="paymentBtn"
                    />
                </form>
            </div>
        </>
    );
};

export default Payment;
