import React, { useState, useEffect } from 'react'
import { ReactNavbar } from "overlay-navbar"
import './Navbar.css'
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserNavOption from '../UserNavOption/UserNavOption';




const Navbar = () => {
    const { isAuthenticate, user } = useSelector(state => state.user);

    const [navColor, setNavColor] = useState('white');

    const handleScroll = () => {
        if (window.scrollY > 500) {
            setNavColor('black');
        }
        else {
            setNavColor('white');
        }
        console.log(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const options = {
        burgerColorHover: "#57A6A1",
        burgerColor: navColor,
        logo: "https://clipground.com/images/ecommerce-logo-png-19.png",
        logoWidth: "15vmax",
        // navColor1: "#240750",
        // navColor2: "#344C64",
        // navColor3: "#577B8D",
        // navColor4: "#57A6A1",
        navColor1:"#323232",
        logoHoverSize: "10px",
        logoHoverColor: "#57A6A1",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Contact",
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/contact",
        link4Url: "/about",
        link1Size: "1.4vmax",
        link1Color: "#fff",
        link1ColorHover: "#577B8D",
        link2ColorHover: "#577B8D",
        link3ColorHover: "#344C64",
        link4ColorHover: "#344C64",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1Margin: "1vmax",
        profileIconUrl: "/login",
        profileIconColor: "#fff",
        searchIconColor: "#fff",
        cartIconColor: "#fff",
        profileIconColorHover: "#240750",
        searchIconColorHover: "#240750",
        cartIconColorHover: "#240750",
        cartIconMargin: "1vmax",

    };

    return (
        <div className='navbar-section'>
            <ReactNavbar {...options} />
            <div className="nav-links-icons" style={{ color: navColor }}>
                <Link to='/search'><FaSearch /></Link>
                <Link to={"/cart"}><FaCartPlus /></Link>
                {isAuthenticate ?
                    <UserNavOption user={user} /> :
                    <Link to={"/login"}>


                        <FaUserCircle />

                    </Link>
                }
            </div>
        </div>
    )
}

export default Navbar
