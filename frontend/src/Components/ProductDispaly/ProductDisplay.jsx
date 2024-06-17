import React from 'react'
import './ProductDispaly.css'
import ProductCard from '../ProductCard/ProductCard'

const product = {
    name:"Blue T-Shirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:200,
    _id:"vishalyadav"
}

const ProductDisplay = () => {
  return (
    <div className='product-section' id='product-section'>
        <div className="product-container">
            <div className="heading">
            <h2>Featured Products</h2>
            </div>
            <div className="content">
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
                <ProductCard product={product}/>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay
