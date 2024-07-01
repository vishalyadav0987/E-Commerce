import React, { useState, useEffect } from 'react';
import './LoginSignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError, register } from '../../actions/userAction';
import { useAlert } from 'react-alert'
import Loader from '../../Components/Loader/Loder';
import { useNavigate, useLocation } from 'react-router-dom'

const LoginSignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, isAuthenticate } = useSelector((state) => state.user)

    const [currState, setCurState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("http://www.pngall.com/wp-content/uploads/5/Profile.png");

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "avatar") {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(data.email, data.password));
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (avatar) {
            formData.append('avatar', avatar);
        } else {
            alert.error("Avatar is required for registration");
            return;
        }

        dispatch(register(formData));
    };
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    console.log(redirect)
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isAuthenticate) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, isAuthenticate, navigate, redirect])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {
                loading
                    ? <Loader />
                    : <div className="login-register-container">
                        <form className="form-container" onSubmit={currState === "Login" ? loginSubmit : registerSubmit}>
                            <div className="login-text">
                                <h2>{currState}</h2>
                                <img src={""} alt="" />
                            </div>
                            <div className="form-controls">
                                {currState === "Register" && (
                                    <input
                                        onChange={onChangeHandler}
                                        type="text"
                                        placeholder='Your Name'
                                        name='name'
                                        required
                                        value={data.name}
                                    />
                                )}
                                <input
                                    onChange={onChangeHandler}
                                    type="email"
                                    name='email'
                                    required
                                    placeholder='Enter Email'
                                    value={data.email}
                                />
                                <input
                                    onChange={onChangeHandler}
                                    type="password"
                                    name='password'
                                    required
                                    placeholder='Password'
                                    value={data.password}
                                />
                            </div>
                            {currState === "Register" && (
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
                            )}
                            {
                                currState === "Login"
                                    ? <p className="forget-password-text">Forget Password</p>
                                    : ""
                            }
                            <button type='submit'>{currState === "Register" ? "Create Account" : "Login"}</button>
                            <div className="terms-condition-text">
                                <div className='terms-condition'>

                                </div>
                                {currState === "Login" ? (
                                    <p>Create a new account? <span onClick={() => setCurState("Register")}>Click here</span></p>
                                ) : (
                                    <p>Already have an account? <span onClick={() => setCurState("Login")}>Click here</span></p>
                                )}
                            </div>
                        </form>
                    </div>
            }
        </>
    );
};

export default LoginSignUp;
