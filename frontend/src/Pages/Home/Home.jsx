import React, { useEffect } from 'react'
import Hero from '../../Components/Hero/Hero';
import ProductDisplay from '../../Components/ProductDispaly/ProductDisplay';
import { getAllProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getAllProducts())
    }, [dispatch, error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Hero />
            <ProductDisplay loading={loading} error={error} product={product} />
        </div>
    )
}

export default Home
