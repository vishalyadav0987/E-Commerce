import React from 'react'
import './Footer.css'
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div id="footer" className="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img src="vite.svg" alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique natus fuga quidem ullam fugiat hic voluptate molestiae odit, recusandae possimus omnis veritatis reprehenderit explicabo nihil in eaque molestias obcaecati? Repellendus?</p>
                        <div className="footer-social-icon">
                            <FaLinkedin />
                            <FaInstagramSquare />
                            <FaSquareWhatsapp />
                        </div>
                    </div>
                    <div className="footer-content-center">
                        <h2>COMPANY</h2>
                        <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+91-966722xxxx</li>
                            <li>viahalyadav@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="divider"></div>
                <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Rights Reserved</p>
            </div>
        </>
    )
}

export default Footer
