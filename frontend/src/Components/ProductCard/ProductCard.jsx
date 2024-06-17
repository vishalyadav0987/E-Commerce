import React from 'react'
import './ProductCard.css'
import ReactStars from 'react-rating-stars-component'

const options = {
    edit: false,
    color: "#e5ddd3",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
}

const ProductCard = ({ product }) => {
    return (
        <div className='card-container'>
            <div className="img">
                <img src={product.images[0].url} alt="" />
            </div>
            <p>{product.name}</p>
            <div className="rating-container">
                <div className="rating">
                    <ReactStars {...options} />
                </div>
                <div className="rating-count">
                    (256 Reviews)
                </div>
            </div>
            <p className="price">&#8377;{product.price}</p>
        </div>
    )
}

export default ProductCard