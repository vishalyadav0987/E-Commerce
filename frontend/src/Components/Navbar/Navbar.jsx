import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import './Navbar.css'

const options = {
    burgerColorHover: "#eb4034",
    logo:"vite.svg",
    logoWidth: "7vmax",
    navColor1: "tomato",
    logoHoverSize: "10px",
    logoHoverColor: "#fff",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.6vmax",
    link1Color: "#fff",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    
};


const Navbar = () => {

    return (
        <div>
            <ReactNavbar {...options} />
        </div>
    )
}

export default Navbar
