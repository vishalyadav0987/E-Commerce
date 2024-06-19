import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, clearError } from '../../actions/productAction'
import Loder from '../../Components/Loader/Loder';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom';

const AllProduct = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { product, error, loading } = useSelector(state => state.products);

    const { keyword } = useParams();

    console.log(keyword)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError());
        }
        dispatch(getAllProducts(keyword));
    }, [dispatch, keyword]);


    return (
        <div className='product-section'>
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
        </div>
    )
}

export default AllProduct
