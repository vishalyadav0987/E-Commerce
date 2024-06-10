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

module.exports = {
    AddNewProduct,
}