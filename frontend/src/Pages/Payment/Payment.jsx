import React, { useRef } from 'react';
import './Payment.css'
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsCalendarEventFill } from "react-icons/bs";
import { MdVpnKeyOff } from "react-icons/md";
import CheckOutStep from '../../Components/CheckOutStep/CheckOutStep';
import { Typography } from '@mui/material';
import { CardExpiryElement, CardCvcElement, CardNumberElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Payment = ({ stripeApiKey }) => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const payBtn = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <>
            <Elements stripe={loadStripe(stripeApiKey)}>
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
                            value={`Pay - ${orderInfo && orderInfo.Total}`}
                            ref={payBtn}
                            className="paymentBtn"
                        />
                    </form>
                </div>
            </Elements>
        </>
    );
};

export default Payment;
