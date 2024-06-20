import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, clearError } from '../../actions/productAction'
import Loder from '../../Components/Loader/Loder';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import './AllProduct.css'

const AllProduct = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const { product,
        error,
        loading,
        productsCount,
        resultPerPage
    } = useSelector(state => state.products);

    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    console.log(keyword)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError());
        }
        dispatch(getAllProducts(keyword, currentPage));
    }, [dispatch, keyword, currentPage]);


    return (
        <div className='product-section ok'>
            <div className="product-container">
                <div className="heading">
                    <h2>Products</h2>
                </div>
                {
                    loading
                        ? <Loder />
                        : <div className="content">
                            {
                                product && product.map((item) => {
                                    return (
                                        <ProductCard item={item} key={item._id} />
                                    )
                                })
                            }

                        </div>
                }
            </div>
            {
                resultPerPage < productsCount && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={"Next"}
                            prevPageText={"Prev"}
                            firstPageText={"1st"}
                            lastPageText={"Last"}
                            itemClass='page-item'
                            linkClass='page-link'
                            activeLinkClass='pageLinkActive'
                            activeClass='pageItemActive'
                        />
                    </div>
                )
            }
        </div>
    )
}

export default AllProduct
