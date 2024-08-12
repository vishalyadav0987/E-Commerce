import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import AccountTree from '@mui/icons-material/AccountTree';
import Description from '@mui/icons-material/Description';
import Storage from '@mui/icons-material/Storage';
import Spellcheck from '@mui/icons-material/Spellcheck';
import AttachMoney from '@mui/icons-material/AttachMoney';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { clearError, getSingleProducts, updateProduct } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductUpdate = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { product, error } = useSelector(state => state.singleProduct)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.deleteUpdateProduct);
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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
        if (product && product._id !== id) {
            dispatch(getSingleProducts(id))
        }
        else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images)
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearError())
        }
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success("Product is successfully updated.");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [alert, dispatch, error, navigate, isUpdated, updateError, id, product])


    const updateProductSubmitHandler = (e) => {
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

        dispatch(updateProduct(id, myFormData));
    }

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([])

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
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>UPDATE PRODUCT</h1>

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
                                value={price}
                            />
                        </div>

                        <div>
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                                value={description}
                            ></textarea>
                        </div>

                        <div>
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value={category}>Choose Category</option>
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
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="old Product Preview" />
                            ))}
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
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductUpdate
