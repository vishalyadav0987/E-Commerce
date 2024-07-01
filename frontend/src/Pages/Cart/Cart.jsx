import React, { useState } from 'react'
import './Cart.css'
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
    const dispatch = useDispatch();
    const product = {
        Stock: 7,
    }

    const [quantity, setQuantity] = useState(1);

    const increseQunatity = () => {
        if (product.Stock <= quantity) return;
        setQuantity(quantity => quantity + 1);
    }
    const decreaseQunatity = () => {
        if (1 >= quantity) return;
        setQuantity(quantity => quantity - 1)
    }
    return (
        <>
            <section className="cart-section">
                <div className="cart-container">
                    <div className="cart-header">
                        <ul>
                            <li>Product</li>
                            <li>Quantity</li>
                            <li>Subtotal</li>
                        </ul>
                    </div>
                    <div className='cart-items'>
                        <div className="cart-content">
                            <div className='product-detail'>
                                <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                <div className="product-info-text">
                                    <span className="product-name">T-shirt</span>
                                    <span className="price-tag center">
                                        <span className="price-text"><b>Price:</b></span>
                                        <span className="price-num">₹300</span>
                                    </span>
                                    <span className="price-tag center">
                                        <span className="price-text"><b>Quantity:</b></span>
                                        <span className="price-num">3</span>
                                    </span>
                                    <span className="remove-product center">
                                        <span className="remove-text">Remove</span>
                                        <FaTrashAlt className='icon' />
                                    </span>
                                </div>
                            </div>
                            <div className="counter">
                                <div>
                                    <button className='cnt' onClick={decreaseQunatity}>-</button>
                                    <p>{quantity}</p>
                                    <button className='cnt cnt-cart' onClick={increseQunatity}>+</button>
                                </div>
                            </div>
                            <div className='subtotal-text'>
                                ₹200
                            </div>
                        </div>
                        <div className="cart-content">
                            <div className='product-detail'>
                                <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                <div className="product-info-text">
                                    <span className="product-name">T-shirt</span>
                                    <span className="price-tag center">
                                        <span className="price-text"><b>Price:</b></span>
                                        <span className="price-num">₹300</span>
                                    </span>
                                    <span className="price-tag center">
                                        <span className="price-text"><b>Quantity:</b></span>
                                        <span className="price-num">3</span>
                                    </span>
                                    <span className="remove-product center">
                                        <span className="remove-text">Remove</span>
                                        <FaTrashAlt className='icon' />
                                    </span>
                                </div>
                            </div>
                            <div className="counter">
                                <div>
                                    <button className='cnt cnt-cart' onClick={decreaseQunatity}>-</button>
                                    <p>{quantity}</p>
                                    <button className='cnt cnt-cart' onClick={increseQunatity}>+</button>
                                </div>
                            </div>
                            <div className='subtotal-text'>
                                ₹200
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
