import React, { useState } from 'react'
import './Filteration.css'
import Slider from '@mui/material/Slider';

const Filteration = ({ price, setPrice, category, setCategory }) => {

  const handlePriceChange = (e, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <div className='filteration-section' style={{ minHeight: "40vh" }}>
      <div className="container">
        <div className="price-filter flex">
          <span className='top-text'>Price</span>
          <span className='top-text'>&#8377;{price[0]} - &#8377;{price[1]}</span>
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={200}
            max={10000}
            aria-labelledby='range-slider'
          />
        </div>
        <div className="category-filter flex">
          <span className='top-text'>Category</span>
          <ul className='category-list'>
            <li
              className={category === "Laptop" ? "bold" : ""}
              onClick={() => setCategory("Laptop")}
            >Laptop</li>
            <li
              className={category === "Footwear" ? "bold" : ""}
              onClick={() => setCategory("Footwear")}
            >Footwear</li>
            <li

              className={category === "Bottom" ? "bold" : ""}
              onClick={() => setCategory("Bottom")}
            >Bottom</li>
            <li
              className={category === "Top" ? "bold" : ""}
              onClick={() => setCategory("Top")}
            >Top</li>
            <li
              className={category === "Pant" ? "bold" : ""}
              onClick={() => setCategory("Pant")}
            >Pant</li>
            <li
              className={category === "T-Shirt" ? "bold" : ""}
              onClick={() => setCategory("T-Shirt")}
            >T-Shirt</li>
            <li
              className={category === "A.C" ? "bold" : ""}
              onClick={() => setCategory("A.C")}
            >A.C</li>
            <li
              className={category === "Refrigrator" ? "bold" : ""}
              onClick={() => setCategory("Refrigrator")}
            >Refrigrator</li>
            <li
              className={category === "Camera" ? "bold" : ""}
              onClick={() => setCategory("Camera")}
            >Camera</li>
            <li
              className={category === "Cooler" ? "bold" : ""}
              onClick={() => setCategory("Cooler")}
            >Cooler</li>
          </ul>
        </div>
        <div className="review-filter flex">
          <span className='top-text'>Customer Reviews</span>
          <span className='top-text'>&#8377;{price[0]} - &#8377;{price[1]}</span>
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={200}
            max={10000}
            aria-labelledby='range-slider'
          />
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
