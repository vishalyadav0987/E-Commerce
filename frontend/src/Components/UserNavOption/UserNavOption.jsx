import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
// import Backdrop from '@material-ui/core/Backdrop'
import { MdDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import './UserNavOption.css';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userAction';

const UserNavOption = ({ user }) => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)

    const dashboard = () => {
        navigate('/dashboard');
    }
    const orders = () => {
        navigate('/orders');
    }

    const cart = () => {
        navigate('/cart');
    }
    const account = () => {
        navigate('/account');
    }
    const logoutUser = () => {
        dispatch(logout())
        alert.success("User Successfully logged out!")
    }

    const navOption = [
        { icon: <FaListAlt style={{ fontSize: '16px' }} />, name: "Orders", func: orders },
        {
            icon: <FaCartPlus style={{
                fontSize: '16px',
                color: cartItems.length === 0 ? "" : "#240750"
            }} />, name: `Cart (${cartItems.length})`, func: cart
        },
        { icon: <IoPerson style={{ fontSize: '16px' }} />, name: "Profile", func: account },
        { icon: <MdExitToApp style={{ fontSize: '16px' }} />, name: "Logout", func: logoutUser },
    ]

    if (user?.role === "admin") {
        navOption.unshift({
            icon: <MdDashboard style={{ fontSize: '16px' }} />, name: "Dashboard", func: dashboard
        })
    }


    const [open, setOpen] = useState(false);
    return (
        <>
            {/* <Backdrop open={open} style={{width:"100vh"}}/> */}
            <SpeedDial style={{ background: "transparent" }}
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                icon={<img src={user?.avatar?.url} className='profile-img' />}
                direction='down'
            >
                {
                    navOption.map((navOpt) => {
                        return (
                            <SpeedDialAction key={navOpt.name}
                                icon={navOpt.icon}
                                tooltipTitle={navOpt.name}
                                onClick={navOpt.func}
                            ></SpeedDialAction>
                        )
                    })
                }
            </SpeedDial>
        </>
    )
}

export default UserNavOption
