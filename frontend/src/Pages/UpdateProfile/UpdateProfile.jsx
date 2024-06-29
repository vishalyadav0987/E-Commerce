import React, { useState, useEffect } from 'react';
import '../LoginSignUp/LoginSignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, register, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert'
import Loader from '../../Components/Loader/Loder';
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("http://www.pngall.com/wp-content/uploads/5/Profile.png");

    const onChangeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };



    const updateProfileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email)
            setAvatarPreview(user?.avatar?.url)
        }
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success("Profile is succesfully updated!");
            dispatch(loadUser());
            navigate('/account');

            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [dispatch, error, alert, isUpdated, navigate, user])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {
                loading
                    ? <Loader />
                    : <div className="login-register-container">
                        <form className="form-container" onSubmit={updateProfileSubmit}>
                            <div className="login-text">
                                <h2>Update Profile</h2>
                                <img src={""} alt="" />
                            </div>
                            <div className="form-controls">

                                <input
                                    onChange={(e)=>setName(e.target.value)}
                                    type="text"
                                    placeholder='Your Name'
                                    name='name'
                                    required
                                    value={name}
                                />

                                <input
                                   onChange={(e)=>setEmail(e.target.value)}
                                    type="email"
                                    name='email'
                                    required
                                    placeholder='Enter Email'
                                    value={email}
                                />

                            </div>

                            <div className="header">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <label htmlFor="file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        id="file"
                                        onChange={onChangeHandler}
                                        accept="image/*"
                                    />
                                    <span>Upload Profile</span>
                                </label>
                            </div>
                            <button type='submit'>Update</button>
                        </form>
                    </div>
            }
        </>

    )
}

export default UpdateProfile
