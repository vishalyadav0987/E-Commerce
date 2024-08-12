import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import SideBar from '../SideBar/SideBar';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import { clearError, deleteProductReviews, getAllProductReviews } from '../../actions/productAction';
import SearchReview from '../SearchReview/SearchReview';

const ProductReviews = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { reviews, error } = useSelector(state => state.allProductReview);
    const { isDeleted, message: deleteMessage, error: DeleteError } = useSelector(state => state.deleteProductReview);
    var product = "6666aae3b9e6401b30f5244e";
    const [productId,setProductId] = useState(product)
    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteProductReviews(reviewId, productId))
    }

    const [searchReviewOpen, setSearchReviewOpen] = useState(false);
    const clickHandler = () => {
        searchReviewOpen === false ? setSearchReviewOpen(true) : setSearchReviewOpen(false)
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (DeleteError) {
            alert.error(DeleteError);
            dispatch(clearError());
        }
        if (isDeleted) {
            alert.success(deleteMessage);
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
        dispatch(getAllProductReviews(productId));
    }, [dispatch, error, DeleteError, isDeleted, navigate]);


    const getReviewSubmitHandler = ()=>{
        dispatch(getAllProductReviews(productId));
        setSearchReviewOpen(false)
    }

    const columns = [
        {
            field: 'id', headerName: 'Review ID', minWidth: 100,
            flex: 0.5
        },
        {
            field: 'name', headerName: 'Name', minWidth: 150,
            flex: 0.5,

        },
        {
            field: 'comment', headerName: 'Comment', minWidth: 270,
            flex: 1
        },
        {
            field: 'rating', headerName: 'Rating', type: 'number', minWidth: 50,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor"
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => {
                            deleteReviewHandler(params.getValue(params.id, 'id'))
                        }}><DeleteIcon /></Button>
                    </>
                );
            }
        }
    ];

    const rows = [];

    reviews && reviews.forEach((review) => {
        rows.push({
            id: review._id,
            name: review.name,
            rating: review.rating,
            comment: review.comment,
        })
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    })
    
    return (
        <div className="dashboard dashboard-ok">
            <SideBar searchReviewOpen={searchReviewOpen} clickHandler={clickHandler}/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL PRODUCT REVIEWS</h1>
                {/* { */}
                {/* loading */}
                {/* ? <Loader /> */}
                {/* : */}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />


                {
                    searchReviewOpen === true 
                    ? <SearchReview 
                    productId={productId}
                    setProductId={setProductId}
                    getReviewSubmitHandler={getReviewSubmitHandler}
                    clickHandler={clickHandler}
                    /> : ""
                }

            </div>
        </div>
    )
}

export default ProductReviews
