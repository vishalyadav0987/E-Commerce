const ProductSchema = require('../modals/ProductSchema');


// ADMIN --- Controller --- Admin Rights
const AddNewProduct = async (req, res) => {
    try {
        const newProduct = await ProductSchema.create(req.body);
        res.status(200).json({ success: true, data: newProduct, message: "Product succesfully Added!" });
    } catch (error) {
        console.log("Error in AddNewProduct function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product not added!",
            error: error.message
        });
    }
}

// Get All the data --- USER --- ADMIN 
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductSchema.find({});
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.log("Error in getAllProducts function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not fetched",
            error: error.message
        });
    }
}
module.exports = {
    AddNewProduct,
    getAllProducts
}