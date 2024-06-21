import React from 'react'
import './Filteration.css'

const Filteration = () => {
  return (
    <div className='filteration-section' style={{minHeight:"40vh"}}>
      <div className="container">
        <div className="price-filter flex">
            <span className='top-text'>Price</span>
            <input type="range" />
        </div>
        <div className="category-filter flex">
        <span className='top-text'>Category</span>
        <ul className='category-list'>
            <li>Laptop</li>
            <li>Footwear</li>
            <li>Bottom</li>
            <li>Top</li>
            <li>Pant</li>
            <li>T-Shirt</li>
            <li>A.C</li>
            <li>Refrigrator</li>
            <li>Camera</li>
            <li>Cooler</li>
        </ul>
        </div>
        <div className="review-filter flex">
        <span className='top-text'>Customer Reviews</span>
        <input type="range" />
        </div>
        <div className="discount-filter flex">
        <span className='top-text'>Discount</span>
        <ul className='category-list'>
            <li>10% Off or more</li>
            <li>25% Off or more</li>
            <li>30% Off or more</li>
            <li>35% Off or more</li>
            <li>50% Off or more</li>
            <li>60% Off or more</li>
            <li>70% Off or more</li>
            <li>80% Off or more</li>
            <li>90% Off or more</li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Filteration
