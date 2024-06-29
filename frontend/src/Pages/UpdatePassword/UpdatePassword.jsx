import React, { useEffect, useState } from 'react'
import '../LoginSignUp/LoginSignUp.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, loadUser, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Loder from '../../Components/Loader/Loder';

const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isUpdated } = useSelector(state => state.profile);
    const [oldPassword, setOldPassowrd] = useState("");
    const [newPassword, setNewPassowrd] = useState("");
    const [confirmPassword, setConfirmPassowrd] = useState("");

    const updatePasswordHandle = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("oldPassword", oldPassword)
        formData.set("newPassword", newPassword)
        formData.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(formData))
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success("Password is succesfully updated!");
            dispatch(loadUser());
            navigate('/account');

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [dispatch, error, alert, isUpdated, navigate]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {
                loading
                    ? <Loder />
                    : <div className="login-register-container" >
                        <form className="form-container"
                            style={{ width: "320px", padding: "40px 20px" }}
                            onSubmit={updatePasswordHandle}
                        >
                            <div className="login-text">
                                <h2>Update Password</h2>
                                <img src={""} alt="" />
                            </div>
                            <div className="form-controls">
                                <input
                                    onChange={(e) => setOldPassowrd(e.target.value)}
                                    type="text"
                                    name='Old password'
                                    required
                                    placeholder='Old password'
                                    value={oldPassword}
                                />
                                <input
                                    onChange={(e) => setNewPassowrd(e.target.value)}
                                    type="password"
                                    name='New password'
                                    required
                                    placeholder='New password'
                                    value={newPassword}
                                />
                                <input
                                    onChange={(e) => setConfirmPassowrd(e.target.value)}
                                    type="password"
                                    name='Confirm password'
                                    required
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                />
                            </div>
                            <button type='submit'>Update</button>
                        </form>
                    </div>
            }
        </>
    )
}

export default UpdatePassword;
