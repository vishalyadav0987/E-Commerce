import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'


const ProductCard = ({ item }) => {
    const options = {
        size: "large",
        value: item.ratings,
        readOnly: true,
    }
    console.log(item)
    return (
        <Link to={`/product/${item._id}`} className='card-container' key={item._id}>
            <div className="img">
                <img src={item.images[0].url} alt="" />
            </div>
            <p>{item.name}</p>
            <div className="rating-container">
                <div className="rating">
                    <Rating {...options} />
                </div>
                <div className="rating-count">
                    ({item.numOfReviews} Reviews)
                </div>
            </div>
            <p className="price">&#8377;{item.price}</p>
        </Link>
    )
}

export default ProductCard