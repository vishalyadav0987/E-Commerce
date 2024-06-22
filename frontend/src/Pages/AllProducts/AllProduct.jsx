import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, clearError } from '../../actions/productAction'
import Loder from '../../Components/Loader/Loder';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import './AllProduct.css'
import Filteration from '../../Components/Filteration/Filteration';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaInfinity } from "react-icons/fa6";

const AllProduct = () => {


    const [price, setPrice] = useState([200, 10000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const { product,
        error,
        loading,
        productsCount,
        resultPerPage,
        filteredProductsCount,
        // ye phle length provide kar de rah hai pagination hone se phle in backend
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
        dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="section-all-product">
                <div className='product-section ok'>
                    <div className="product-container">
                        <div className="heading">
                            <h2>Products</h2>
                        </div>
                        {
                            loading
                                ? <Loder />
                                : <div className="content-2">
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
                        (resultPerPage < filteredProductsCount) && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={<FaAngleRight />}
                                    prevPageText={<FaAngleLeft />}
                                    firstPageText={<FaInfinity />}
                                    lastPageText={<FaInfinity />}
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    activeLinkClass='pageLinkActive'
                                    activeClass='pageItemActive'
                                />
                            </div>
                        )
                    }
                </div>
                <div className="filter">
                    <Filteration
                        price={price} setPrice={setPrice}
                        category={category} setCategory={setCategory}
                        ratings={ratings} setRatings={setRatings}
                    />
                </div>
            </section>
        </>
    )
}

export default AllProduct
