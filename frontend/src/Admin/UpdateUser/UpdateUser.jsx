import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Button } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom';
import { clearError, getSingleUserDetails, updateUser } from '../../actions/userAction';
import { UPDATE_USER_RESET } from '../../constants/userConstants';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, user } = useSelector(state => state.singleUserDetail);
    const { error: updateError, message: updateMessage, isUpdated } = useSelector(state => state.updateAndDeleteUser);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")



    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getSingleUserDetails(id));
          } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
          }
        if (error) {
            alert.error(error)
            dispatch(clearError());
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearError());
        }
        if (isUpdated) {
            alert.success(updateMessage);
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [alert, dispatch, error, isUpdated, updateError,user])


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myFormData = new FormData();

        myFormData.set("name", name);
        myFormData.set("email", email);
        myFormData.set("role", role);



        dispatch(updateUser(id, myFormData));
    }

    return (
        <>
            <div className="dashboard dashboard-userUpdate">
                <SideBar />
                <div className="newProductContainer">
                    <form
                    style={{height:"auto",gap:"24px"}}
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>UPDATE USER -- ADMIN</h1>

                        <div>
                            <PersonIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <VerifiedUserIcon />
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <Button
                        style={{background:"#240750"}}
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateUser
