import React from 'react'
import ReactStars from 'react-rating-stars-component'
import './Review.css'

const Review = () => {
    const options = {
        edit: false,
        color: "#e5ddd3",
        value: 4.1,
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
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
                            <ReactStars {...options} />
                            <span>({"4.1 out of 5"} Reviews)</span>
                        </div>
                        <div className="review-submit-container">
                            <h2>Review this product</h2>
                            <p>Share your thoughts with other customers</p>
                            <button>Write product review here</button>
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
                                <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                                <img src="https://i.ibb.co/DRST11n/1.webp" alt="" />
                            </div>
                        </div>
                        <div className="all-review-container">
                            <h3>Top reviews from India</h3>
                            <div className="single-review">
                                <div className="header">
                                    <img
                                        src="http://www.pngall.com/wp-content/uploads/5/Profile.png"
                                        alt=""
                                    />
                                    <p className="review-holder-name">Placeholder</p>
                                </div>
                                <div className="review-container">
                                    <ReactStars {...options} />
                                    <span>{"Car Duster Combo"}</span>
                                </div>
                                <p className="review-message">
                                    Looks good. Duster looks very soft,very good for cleaning car windshields mainly to avoid scratches. Duster size is good enough to clean windshields with 2-3 wipes Extendable handle is useful in cleaning Roof. Steel Handle looks sturdy enough. Good buy. Recommendable.
                                </p>
                            </div>
                            <div className="single-review">
                                <div className="header">
                                    <img
                                        src="http://www.pngall.com/wp-content/uploads/5/Profile.png"
                                        alt=""
                                    />
                                    <p className="review-holder-name">Placeholder</p>
                                </div>
                                <div className="review-container">
                                    <ReactStars {...options} />
                                    <span>{"Car Duster Combo"}</span>
                                </div>
                                <p className="review-message">
                                    Looks good. Duster looks very soft,very good for cleaning car windshields mainly to avoid scratches. Duster size is good enough to clean windshields with 2-3 wipes Extendable handle is useful in cleaning Roof. Steel Handle looks sturdy enough. Good buy. Recommendable.
                                </p>
                            </div>
                            <div className="single-review">
                                <div className="header">
                                    <img
                                        src="http://www.pngall.com/wp-content/uploads/5/Profile.png"
                                        alt=""
                                    />
                                    <p className="review-holder-name">Placeholder</p>
                                </div>
                                <div className="review-container">
                                    <ReactStars {...options} />
                                    <span>{"Car Duster Combo"}</span>
                                </div>
                                <p className="review-message">
                                    Looks good. Duster looks very soft,very good for cleaning car windshields mainly to avoid scratches. Duster size is good enough to clean windshields with 2-3 wipes Extendable handle is useful in cleaning Roof. Steel Handle looks sturdy enough. Good buy. Recommendable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review
