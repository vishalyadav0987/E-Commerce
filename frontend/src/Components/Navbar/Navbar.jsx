import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import './Navbar.css'

const options = {
    burgerColorHover: "#57A6A1",
    burgerColor: "#323232",
    logo:"https://clipground.com/images/ecommerce-logo-png-19.png",
    logoWidth: "15vmax",
    navColor1: "#240750",
    navColor2: "#344C64",
    navColor3: "#577B8D",
    navColor4: "#57A6A1",
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
    link1ColorHover:"#577B8D",
    link2ColorHover:"#577B8D",
    link3ColorHover:"#344C64",
    link4ColorHover:"#344C64",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
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
