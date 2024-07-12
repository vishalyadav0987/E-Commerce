import React, { useEffect } from 'react';
import './ProductList.css';
import { DataGrid } from '@material-ui/data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import SideBar from '../SideBar/SideBar';
import { clearError, deleteProduct, productForAdminPanel } from '../../actions/productAction';
import Loader from '../../Components/Loader/Loder'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, products, loading } = useSelector(state => state.products);
    const { error: delterError, isDeleted, loading: deleteLoad } = useSelector(state => state.deleteUpdateProduct);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (delterError) {
            alert.error(delterError);
            dispatch(clearError());
        }
        if (isDeleted) {
            alert.success("Product is successfully removed.");
            navigate('/admin/dashboard');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(productForAdminPanel());
    }, [error, dispatch, alert, isDeleted, delterError, navigate]);

    const columns = [
        {
            field: 'id', headerName: 'Product ID', minWidth: 200,
            flex: 0.5
        },
        {
            field: 'name', headerName: 'Name', minWidth: 350,
            flex: 0.8
        },
        {
            field: 'stock', headerName: 'Stock', type: 'number', minWidth: 150,
            flex: 0.3
        },
        {
            field: 'price', headerName: 'Price', type: 'number', minWidth: 270,
            flex: 0.5
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => {
                            deleteProductHandler(params.getValue(params.id, 'id'))
                        }}><DeleteIcon /></Button>
                    </>
                );
            }
        }
    ];

    const rows = [];

    products && products.forEach((product) => {
        rows.push({
            id: product._id,
            name: product.name,
            stock: product.Stock, // Make sure the field name matches your product schema
            price: `₹${product.price}`
        });
    });



    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <div className="dashboard dashboard-ok">
            <SideBar />
            <div className="productListContainer">
                <h1 id="productListHeading">ALL PRODUCTS</h1>
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
    );
};

export default ProductList;
