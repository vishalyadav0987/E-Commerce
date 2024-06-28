import React, { useEffect } from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { useSelector } from 'react-redux'

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
                        <span className='edit-profile'>
                            <span><FaCamera /></span>
                            <span className='text'>Edit</span>
                        </span>
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
                                    28-07-2024
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
                            <button className="myorder btn">My Orders</button>
                            <button className="change-pass btn">Change Password</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile
