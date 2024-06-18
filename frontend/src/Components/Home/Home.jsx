import React, { useEffect } from 'react'
import Hero from '../Hero/Hero';
import ProductDisplay from '../ProductDispaly/ProductDisplay';
import { getAllProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch();
    const {loading,error,product} = useSelector(state=>state.products)


    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch]);

    return (
        <div>
            <Hero />
            <ProductDisplay loading={loading} error={error} product={product}/>
        </div>
    )
}

export default Home
