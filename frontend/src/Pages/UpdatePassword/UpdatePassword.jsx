import React, { useState } from 'react'
import '../LoginSignUp/LoginSignUp.css'

const UpdatePassword = () => {
    const [oldPassword, setOldPassowrd] = useState("");
    const [newPassword, setNewPassowrd] = useState("");
    const [confirmPassword, setConfirmPassowrd] = useState("");
    return (
        <>
            <div className="login-register-container" >
                <form className="form-container" style={{ width: "320px", padding: "40px 20px" }}>
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
        </>
    )
}

export default UpdatePassword;
