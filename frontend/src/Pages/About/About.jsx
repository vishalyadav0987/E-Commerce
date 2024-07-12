import React, { useEffect } from 'react';
import './About.css';
import { IoMdMailUnread } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    })
  return (
    <div className="about-container">
      <div className="profile-photo">
        <img src="1705388450800.jpg" alt="Profile" />
      </div>
      <div className="description">
        <h1>About Us</h1>
        <p>
          Welcome to our eCommerce site! We are dedicated to providing the best products
          and services to our customers. Our mission is to offer high-quality items at 
          competitive prices. Thank you for shopping with us!
        </p>
      </div>
      <div className="social-links">
        <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer">
          <IoMdMailUnread />
        </a>
        <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer">
          <FaSquareInstagram />
        </a>
        <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
          <FaLinkedin/>
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
