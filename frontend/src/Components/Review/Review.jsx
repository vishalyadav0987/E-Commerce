import React from 'react'
import ReactStars from 'react-rating-stars-component'
import './Review.css'
import { useSelector } from 'react-redux'
import { Rating } from '@mui/material'

const Review = ({ product, submitReviewToggle }) => {
    const { user } = useSelector(state => state.user);
    let rate = product.ratings;
    let rates = Math.round(rate)
    const options = {
        value: rates,
        size: "large",
        readOnly:true
    }

    return (
        <div className='review-container'>
            <div className="container">
                <div className="top-box">
                    <h2>Looking for specific info?</h2>
                    <input type="text" name="" id="" placeholder='Search in review, Q&A....' />
                </div>
                <div className="bottom-box">
                    <div className="left-box">
                        <h2>Customer reviews</h2>
                        <div className="review-container">
                            <Rating {...options} />
                            <span>({`${rates} out of 5`} Reviews)</span>
                        </div>
                        <div className="review-submit-container">
                            <h2>Review this product</h2>
                            <p>Share your thoughts with other customers</p>
                            <button onClick={submitReviewToggle}>Write product review here</button>
                        </div>
                    </div>
                    <div className="right-box">
                        <div className="ai-generated">
                            <h3>Customers say</h3>
                            <p className='ai-generated-text'>
                                Customers like the extendable long handle of the car duster. They say it's really useful and handy. They also appreciate the ease of installation, saying it'll be easy to approach every area of the vehicle. Customers like that the product is a fantastic tool for keeping your vehicle clean. They like that it feels very soft.
                            </p>
                            <span className='dummy-ai-text'>
                                AI-generated from the text of customer reviews
                            </span>
                        </div>
                        <div className="product-img">
                            <h2>Reviews with images</h2>
                            <div className="product-img-container">
                                {product.images &&
                                    product.images.map((image, i) => {
                                        return (
                                            <img
                                                src={image.url}
                                                alt={`${i} Slide`}
                                                key={image.url}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="all-review-container">
                            <h3>Top reviews from India</h3>
                            {
                                product.reviews && product.reviews[0]
                                    ? product.reviews && product.reviews.map((review) => {
                                        return (
                                            <div className="single-review" key={review._id}>
                                                <div className="header">
                                                    <img
                                                        src="http://www.pngall.com/wp-content/uploads/5/Profile.png"
                                                        alt=""
                                                    />
                                                    <p className="review-holder-name">{review.name}</p>
                                                </div>
                                                <div className="review-container">
                                                    <Rating {...options} value={review.rating} />
                                                    <span style={{ color: "#c5c5c5" }}>{`UserId # ${review.userRevId}`}</span>
                                                </div>
                                                <p className="review-message">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        )
                                    })
                                    : <p style={{ fontSize: "24px", color: "#323232" }}>Add your review here</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review
