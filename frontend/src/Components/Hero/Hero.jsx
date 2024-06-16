import React from 'react'
import './Hero.css';
import { CgMouse } from "react-icons/cg";

const Hero = () => {
  return (
    <div className='hero-container' id='hero-container'>
      <div className="container">
        <div className="content">
            <p>Welcome to Ecommerce</p>
            <h1>Discover Your Style - Shop the Latest Trends!</h1>
           <a href="#footer">
           <button>
            Scroll <CgMouse />
           </button>
           </a>
        </div>
      </div>
    </div>
  )
}


export default Hero
