import React from 'react'
import './ProductCard.css'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'


const ProductCard = ({ item }) => {
    const options = {
        edit: false,
        color: "#e5ddd3",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: item.ratings,
        isHalf: true,
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
                    <ReactStars {...options} />
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