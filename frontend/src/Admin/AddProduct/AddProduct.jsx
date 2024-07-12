import React, { useEffect, useState } from 'react'
import './AddProduct.css'
import SideBar from '../SideBar/SideBar'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, clearError } from '../../actions/productAction'
import AccountTree from '@material-ui/icons/AccountTree'
import Description from '@material-ui/icons/Description'
import Storage from '@material-ui/icons/Storage'
import Spellcheck from '@material-ui/icons/Spellcheck'
import AttachMoney from '@material-ui/icons/AttachMoney'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { ADD_NEW_PRODUCT_RESET } from '../../constants/productConstants';

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, success } = useSelector(state => state.newProduct);
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError());
        }
        if (success) {
            alert.success("Product is successfully added.");
            navigate("/admin/dashboard");
            dispatch({ type: ADD_NEW_PRODUCT_RESET })
        }
    }, [alert, dispatch, success, error, navigate])


    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myFormData = new FormData();

        myFormData.set("name", name);
        myFormData.set("price", price);
        myFormData.set("description", description);
        myFormData.set("category", category);
        myFormData.set("Stock", Stock);

        images.forEach((image) => {
            myFormData.append("images", image);
        });

        dispatch(addNewProduct(myFormData));
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const render = new FileReader();
            render.onload = () => {
                if (render.readyState === 2) {
                    setImagesPreview((old) => [...old, render.result]);
                    setImages((old) => [...old, render.result])
                }
            }
            render.readAsDataURL(file)
        })
    }

    return (
        <>
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>CREATE PRODUCT</h1>

                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct
