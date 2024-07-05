import React from 'react'
import './ConfirmOrder.css'
import CheckOutStep from '../../Components/CheckOutStep/CheckOutStep'

const ConfirmOrder = () => {
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
                                    <span>vishal</span>
                                </div>
                                <div className="box-1 flex-gap">
                                    <span><b>Phone</b>:</span>
                                    <span>+91-9834-567-675</span>
                                </div>
                                <div className="box-1 flex-gap">
                                    <span><b>Address</b>:</span>
                                    <span>B-3/31 Venna Enclave</span>
                                </div>
                            </div>
                        </div>
                        <div className="cart-info-box">
                            <h1 className="shipping-heading-1">Your Cart Items</h1>
                            <div>
                                <div className="item-1">
                                    <div className="img-name">
                                        <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                        <span>{"Pant"}</span>
                                    </div>
                                    <span className="quantity-ruppee">
                                        4 x 10000 = <b>40000</b>
                                    </span>
                                </div>
                                <div className="item-1">
                                    <div className="img-name">
                                        <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                        <span>{"Pant"}</span>
                                    </div>
                                    <span className="quantity-ruppee">
                                        4 x 10000 = <b>40000</b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <h1 className="shipping-heading">Order Summary</h1>
                        <div>
                            <div className="subtotal-text-p flex-space">
                                <span>SubTotal:</span>
                                <span>13600</span>
                            </div>
                            <div className="subtotal-text-p flex-space">
                                <span>Shipping charges:</span>
                                <span>600</span>
                            </div>
                            <div className="subtotal-text-p flex-space">
                                <span>GST:</span>
                                <span>345</span>
                            </div>
                            <div className="subtotal-text-p flex-space">
                                <span>Total:</span>
                                <span>345</span>
                            </div>
                        </div>
                        <button className='procced-to-pay'>Procced To Pay</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ConfirmOrder
