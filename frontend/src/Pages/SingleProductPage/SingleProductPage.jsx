import React, { useEffect, useState } from 'react'
import './SingleProductPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getSingleProducts, newReview } from '../../actions/productAction'
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import ReactStars from 'react-rating-stars-component'
import Loader from '../../Components/Loader/Loder'
import Review from '../../Components/Review/Review';
import { useAlert } from 'react-alert'
import { addItemToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core'
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const SingleProductPage = () => {
    const alert = useAlert();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, error, loading } = useSelector(state => state.singleProduct);

    const options = {
        value: product.ratings,
        size: "large",
        readOnly:true,
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

    const { success, error: reviewError } = useSelector(state => state.newReview)

    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState("")
    const [open, setOpen] = useState(false)

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        const formData = new FormData();

        formData.set("comment", comments);
        formData.set("rating", rating);
        formData.set("productId", id);

        dispatch(newReview(formData));
        setOpen(false)
    }

    const addCartHandler = (Stock) => {
        if (Stock > 0) {
            dispatch(addItemToCart(id, quantity));
            alert.success("Item Added To Cart")
        }
        else {
            alert.error("Product is Out Of Stock")
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError());
        }
        if (success) {
            alert.success("Review Submitted Successfully.");
            dispatch({ type: NEW_REVIEW_RESET })
        }
        dispatch(getSingleProducts(id))
    }, [dispatch, id, reviewError, alert, success]);

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
                                    <Rating {...options} />
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
                                <button
                                    onClick={submitReviewToggle}
                                    className='submit-review btn'>Submit Review</button>


                                <Dialog
                                    aria-labelledby='simple-dialog-title'
                                    open={open}
                                    onClose={submitReviewToggle}
                                >
                                    <DialogTitle
                                        style={{
                                            background: "white"
                                        }}
                                    >Submit Review</DialogTitle>
                                    <DialogContent className='submitDialog'
                                        style={{ background: "white" }}>
                                        <Rating
                                            onChange={(e) => setRating(e.target.value)}
                                            value={rating}
                                            size='large'
                                        />
                                        <textarea
                                            required
                                            className='submitDialogTextArea'
                                            cols={30}
                                            rows={5}
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        ></textarea>
                                    </DialogContent>
                                    <DialogActions style={{ background: "white" }}>
                                        <Button
                                            color='secondary'
                                            style={{ fontSize: "13px", fontWeight: "bold" }}
                                            onClick={submitReviewToggle}
                                        >Cancel</Button>
                                        <Button
                                            color='primary'
                                            style={{ fontSize: "13px", fontWeight: "bold" }}
                                            onClick={reviewSubmitHandler}
                                        >Submit</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div className="id-title ok">
                            <p>Review</p>
                        </div>
                        <Review product={product} submitReviewToggle={submitReviewToggle} />
                    </div>
            }
        </>
    )
}

export default SingleProductPage;
