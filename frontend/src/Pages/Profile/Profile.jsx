import React, { useEffect } from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { loading, user, isAuthenticate } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticate == false) {
            navigate('/login');
        }
    }, [isAuthenticate, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <section className="profile-section">
                <div className="card-container-box">
                    <div className="profile-box">
                        <img src={user?.avatar?.url} alt="" />
                        <Link to={'/me/update'} className='edit-profile'>
                            <span><FaCamera /></span>
                            <span className='text'>Edit</span>
                        </Link>
                    </div>
                    <div className="info-box">
                        <div className="name-create">
                            <div className="name-box flex-col">
                                <label className='labeled-text'><b>Full name</b></label>
                                <span className='name box'>
                                    {user?.name}
                                </span>
                            </div>
                            <div className="create-box flex-col">
                                <label className='labeled-text'><b>Joined On</b></label>
                                <span className="create box">
                                    {user?.createdAt.substring(0, 10)}
                                </span>
                            </div>
                        </div>
                        <div className="email-box flex-col">
                            <label className='labeled-text'><b>Email</b></label>
                            <span className="email box">
                                {user?.email}
                            </span>
                        </div>
                        <div className="button-box">
                            <Link className='myorder' to={'/orders'} style={{ display: "grid" }}>
                                <button className="btn">My Orders</button>
                            </Link>
                            <Link to={'/me/password'} className='change-pass' style={{ display: "grid" }}>
                                <button className="btn">Change Password</button>
                            </Link>
                        </div>
                        <Link to={'/me/update'} style={{ display: "grid" }}>
                            <button className="profile-edit btn">Edit Profile</button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile
