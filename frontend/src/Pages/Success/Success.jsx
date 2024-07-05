import React from 'react'
import { BsCheckCircleFill } from "react-icons/bs";
import "./Success.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Success = () => {
    return (
        <>
            <div className="orderSuccess">
                <div>
                    <BsCheckCircleFill style={{ fontSize: "60px", color: "#240750" }} className='cir'/>
                </div>
                <Typography>Your Order has been Placed successfully </Typography>
                <Link to="/orders">View Orders</Link>
            </div>
        </>
    );
}

export default Success
