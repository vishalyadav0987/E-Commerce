import React, { useEffect, useState } from 'react'
import './SingleProductPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getSingleProducts } from '../../actions/productAction'
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import ReactStars from 'react-rating-stars-component'
import Loader from '../../Components/Loader/Loder'
import Review from '../../Components/Review/Review';
import { useAlert } from 'react-alert'
import { addItemToCart } from '../../actions/cartAction';

const SingleProductPage = () => {
    const alert = useAlert();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, error, loading } = useSelector(state => state.singleProduct);

    const options = {
        edit: false,
        color: "#e5ddd3",
        value: product.ratings,
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
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

    const addCartHandler = (Stock) => {
        if (Stock > 0) {
            dispatch(addItemToCart(id, quantity));
            alert.success("Item Added To Cart")
        }
        else{
            alert.error("Product is Out Of Stock") 
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getSingleProducts(id))
    }, [dispatch, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {
                loading
                    ? <Loader />
                    : <div className="single-product-page">
                        <div className="single-product-container">
                            <div className="left-side">
                                <div className="carousel">
                                    <Carousel>
                                        {product.images &&
                                            product.images.map((image, i) => {
                                                return (
                                                    <img
                                                        src={image.url}
                                                        className="carousel-img"
                                                        alt={`${i} Slide`}
                                                        key={image.url}
                                                    />
                                                )
                                            })
                                        }
                                    </Carousel>
                                </div>
                            </div>
                            <div className="rght-side">
                                <div className="id-title">
                                    <p>{product.name}</p>
                                    <p>Product # {product._id}</p>
                                </div>
                                <div className="review-container">
                                    <ReactStars {...options} />
                                    <span>({product.numOfReviews} Reviews)</span>
                                </div>
                                <div className="counter">
                                    <div>
                                        <button className='cnt' onClick={decreaseQunatity}>-</button>
                                        <p>{quantity}</p>
                                        <button className='cnt' onClick={increseQunatity}>+</button>
                                    </div>
                                    <button
                                        className='add-to-cart btn'
                                        onClick={() => addCartHandler(product.Stock)}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                                <div className="status">
                                    <span className='status-text'>Status:
                                        <span
                                            className={`${product.Stock > 0 ? "greenColor" : "redColor"}`}
                                        >
                                            {product.Stock > 0 ? " InStock" : " OutOFStock"}
                                        </span>
                                    </span>
                                </div>
                                <p className="discription">
                                    <span className='discription-text'>discription: </span>
                                    {product.description}
                                </p>
                                <button className='submit-review btn'>Submit Review</button>
                            </div>
                        </div>
                        <div className="id-title ok">
                            <p>Review</p>
                        </div>
                        <Review product={product} />
                    </div>
            }
        </>
    )
}

export default SingleProductPage;
