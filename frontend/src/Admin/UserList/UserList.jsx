import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import SideBar from '../SideBar/SideBar';
import { clearError, deleteUser, getAllUsers } from '../../actions/userAction';
import './UserList.css'
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UserList = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { users, error } = useSelector(state => state.allUser);
  const { isDeleted, message: deleteMessage, error: DeleteError } = useSelector(state => state.updateAndDeleteUser);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (DeleteError) {
      alert.error(DeleteError);
      dispatch(clearError());
    }
    if (isDeleted) {
      alert.success(deleteMessage);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, DeleteError, navigate, isDeleted]);




  const columns = [
    {
      field: 'id', headerName: 'User ID', minWidth: 100,
      flex: 0.5
    },
    {
      field: 'name', headerName: 'Name', minWidth: 150,
      flex: 0.4,
    },
    {
      field: 'email', headerName: 'Email ID', minWidth: 250,
      flex: 0.8
    },
    {
      field: 'role', headerName: 'Role', minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor"
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 100,
      flex: 0.5,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => {
              deleteUserHandler(params.getValue(params.id, 'id'))
            }}><DeleteIcon /></Button>
          </>
        );
      }
    }
  ];

  const rows = [];

  users && users.forEach((user) => {
    rows.push({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div>
      <div className="dashboard dashboard-ok dashboard-userList">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          {/* { */}
          {/* loading */}
          {/* ? <Loader /> */}
          {/* : */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
          {/* } */}
        </div>
      </div>
    </div>
  )
}

export default UserList
