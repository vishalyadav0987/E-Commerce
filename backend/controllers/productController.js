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

// ADMIN --- Controller --- Admin Rights
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productExsist = await ProductSchema.findById(id);
        if(!productExsist){
            return res.status(400).json({
                success: false,
                message: "Product not found!",
            });
        }
        const product = await ProductSchema.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
        });
        res.status(200).json({
            success: true,
            message:"Product is succesfully updated!"
        });
    } catch (error) {
        console.log("Error in updateProduct function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not updated",
            error: error.message
        });
    }
}

// ADMIN --- Controller --- Admin Rights
const removeProduct = async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await ProductSchema.findById(id);
        if(!product){
            return res.status(400).json({
                success: false,
                message: "Product not found!",
            });
        }
        // await ProductSchema.findByIdAndDelete(id);
        await ProductSchema.findByIdAndDelete(id);
        return res.status(400).json({
            success: false,
            message: "Product Succesfully removed!",
        });
    } catch (error) {
        console.log("Error in removeProduct function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not removed!",
            error: error.message
        });
    }
}
module.exports = {
    AddNewProduct,
    getAllProducts,
    updateProduct,
    removeProduct,
}