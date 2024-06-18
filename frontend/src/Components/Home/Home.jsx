import React, { useEffect } from 'react'
import Hero from '../Hero/Hero';
import ProductDisplay from '../ProductDispaly/ProductDisplay';
import { getAllProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.products)
    console.log(error)

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getAllProducts())
    }, [dispatch, error]);

    return (
        <div>
            <Hero />
            <ProductDisplay loading={loading} error={error} product={product} />
        </div>
    )
}

export default Home
