import React, { useState, useEffect } from 'react'
import './LoginSignUp.css';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../actions/userAction';

const LoginSignUpCopy = () => {
    const dispatch = useDispatch();
    // const {} = useSelector(state => )
    const [currState, setCurState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [avtar, setAvtar] = useState()
    const [avtarPreview, setAvtarPreview] = useState("http://www.pngall.com/wp-content/uploads/5/Profile.png");

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (e.target.name === "avtar") {
            const filereader = new FileReader();
            filereader.onload = () => {
                if (filereader.readyState === 2) {
                    setAvtarPreview(filereader.result);
                    setAvtar(filereader.result)
                }
            }
            filereader.readAsDataURL(e.target.files[0])
        }
        else {
            setData({ ...data, [name]: value })
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(data.email, data.password))
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    //   const onSubmitHandler = async (e) => {
    //     e.preventDefault();
    //     let newUrl = url;
    //     if(currState==="Login"){
    //       newUrl+='/api/v1/user/login';
    //     }
    //     else{
    //       newUrl+='/api/v1/user/register';
    //     }
    //     const response = await axios.post(newUrl,data);
    //     if(response.data.success){
    //       setToken(response.data.token);
    //       localStorage.setItem("token",response.data.token);
    //       toast.success(response.data.message);
    //       setShowLogin(false);
    //     }
    //     else{
    //       toast.error(response.data.message);
    //     }
    //   }
    return (
        <>
            <div className="login-register-container">
                {/* <form className="form-container" onSubmit={onSubmitHandler}> */}
                <form className="form-container" onSubmit={currState === "Login" ? loginSubmit : ""}>
                    <div className="login-text">
                        <h2>{currState}</h2>
                        {/* <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" /> */}
                        <img src={""} alt="" />
                    </div>
                    <div className="form-controls">
                        {currState === "Login" ? "" : <input
                            onChange={onChangeHandler}
                            type="text"
                            placeholder='your name'
                            name='name'
                            required
                            value={data.name}
                        />}
                        <input
                            onChange={onChangeHandler}
                            type="email"
                            name='email'
                            required
                            placeholder='Enter email '
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
                    {
                        currState === "Login"
                            ? <p className="forget-password-text">Forget Password ?</p>
                            : <div class="header">
                                <img
                                    src={avtarPreview}
                                    alt="" />
                                <label htmlFor="file">
                                    <input
                                        type="file"
                                        name="avtar"
                                        id="file"
                                        onChange={onChangeHandler}
                                        value={avtar} />
                                    <span>Upload Profile</span>
                                </label>
                            </div>
                    }
                    <button type='submit'>{currState === "Register" ? "Create account" : "Login"}</button>
                    <div className="terms-condition-text">
                        <div className='terms-condition'>
                            <input type="checkbox" required />
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, alias.</p>
                        </div>
                        {
                            currState === "Login"
                                ? <p>Create a new account? <span onClick={() => setCurState("Register")}>Click here</span></p>
                                : <p>Already have an account? <span onClick={() => setCurState("Login")}>Click here</span></p>
                        }
                    </div>

                </form>
            </div>
        </>
    )
}

export default LoginSignUpCopy