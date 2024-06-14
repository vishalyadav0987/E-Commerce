const ApiFeatures = require('../Utils/ApiFeatures');
const ProductSchema = require('../modals/ProductSchema');


// ADMIN --- Controller --- Admin Rights
const AddNewProduct = async (req, res) => {
    try {
        req.body.user = req.user.id;
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
        let resultPerPage = 5;
        const productCount = await ProductSchema.countDocuments(); // inbuilt function
        const apiFeatures = new ApiFeatures(ProductSchema.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
        // search  from ApiFeature
        const products = await apiFeatures.query;
        // const products = await ProductSchema.find({});
        res.status(200).json({
            success: true,
            data: products,
            count: productCount,
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
        if (!productExsist) {
            return res.status(400).json({
                success: false,
                message: "Product not found!",
            });
        }
        const product = await ProductSchema.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Product is succesfully updated!"
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
const removeProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductSchema.findById(id);
        if (!product) {
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

// Get All the data --- USER --- ADMIN 
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const singleProduct = await ProductSchema.findById(id);

        if (!singleProduct) {
            return res.json({ success: true, message: "Product not found" });
        }

        res.json({ success: true, data: singleProduct });
    } catch (error) {
        console.log("Error in getSingleProduct function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not fetched",
            error: error.message
        });
    }
}


// Create and update review
const createProductReview = async (req, res) => {
    try {
        const { productId, comment, rating } = req.body;
        const product = await ProductSchema.findById(productId);
        if (!product) {
            return res.json({
                success: false,
                message: `Product doesn't exist with this id:${productId}`
            });
        }
        const review = {
            userRevId: req.user.id,
            name: req.user.name,
            comment,
            rating: +rating
        }

        console.log(review);
        // console.log(product.reviews[0].userRevId.toString(), req.user.id);

        // Iam not use like the bacause [reviews] parameter is array
        // const isReviewed = await ProductSchema.find(
        //     product.reviews.userRevId === req.user.id
        // );

        // this is find method is array wala method
        const isReviewed = await product.reviews.find((rev) =>
            rev.userRevId.toString() === req.user.id
        );
        console.log(isReviewed);

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.userRevId.toString() === req.user.id) {
                    (rev.rating = rating), (rev.comment = comment) // is updating the review
                }
            });
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        let sum = 0;
        product.reviews.forEach((rev) => {
            sum += rev.rating;
        });
        console.log(sum);
        let avg = sum / product.reviews.length;
        console.log(avg);
        product.ratings = avg;
        await product.save({ validateBeforeSave: false });

        res.json({ success: true, message: "Review successfully added!" });
    } catch (error) {
        console.log("Error in createProductReview function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not fetched",
            error: error.message
        });
    }
}




module.exports = {
    AddNewProduct,
    getAllProducts,
    updateProduct,
    removeProduct,
    getSingleProduct,
    createProductReview,
}