const ApiFeatures = require('../Utils/ApiFeatures');
const ProductSchema = require('../modals/ProductSchema');
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
    // upload.array('images', 10),


// ADMIN --- Controller --- Admin Rights
const AddNewProduct = async (req, res) => {
    try {
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        req.body.images = imagesLinks;
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

// const AddNewProduct = async (req, res) => {
//     try {
//       let images = [];
//       if (req.files && req.files.length > 0) {
//         images = req.files;
//       }

//       let imagesLinks = [];
//       for (let i = 0; i < images.length; i++) {
//         const result = await new Promise((resolve, reject) => {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { folder: "products" },
//             (error, result) => {
//               if (error) reject(error);
//               resolve(result);
//             }
//           );
//           uploadStream.end(images[i].buffer);
//         });

//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });
//       }

//       req.body.images = imagesLinks;
//       req.body.user = req.user.id;
//       const newProduct = await ProductSchema.create(req.body);
//       res.status(200).json({ success: true, data: newProduct, message: "Product successfully added!" });
//     } catch (error) {
//       console.log("Error in AddNewProduct function: ", error.message);
//       res.status(500).json({
//         success: false,
//         message: "Something went wrong, Product not added!",
//         error: error.message,
//       });
//     }
//   };

// Get All the data --- USER --- ADMIN 
const getAllProducts = async (req, res) => {
    try {
        let resultPerPage = 8;
        const productCount = await ProductSchema.countDocuments(); // inbuilt function
        const apiFeatures = new ApiFeatures(ProductSchema.find(), req.query)
            .search()
            .filter()

        // let products = await apiFeatures.query;
        // Clone the query object before executing the first query to get filtered products count
        let queryClone = apiFeatures.query.clone();
        let products = await queryClone;
        let filteredProductsCount = products.length;

        apiFeatures.pagination(resultPerPage);
        // search  from ApiFeature
        products = await apiFeatures.query;
        // const products = await ProductSchema.find({});
        res.status(200).json({
            success: true,
            data: products,
            count: productCount,
            resultPerPage,
            filteredProductsCount
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

// FETCH PRODUCTS FOR ADMIN PANEL
const getProductForAdmin = async (req, res) => {
    try {
        const products = await ProductSchema.find({});
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.log("Error in getProductForAdmin function: ", error.message);
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
        let product = await ProductSchema.findById(id);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found!",
            });
        }

        // Initialize images array
        let images = [];

        // Handle different formats of req.body.images
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else if (Array.isArray(req.body.images)) {
            images = req.body.images;
        }

        // Validate if string is base64 encoded
        const isBase64 = (str) => {
            const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;
            return typeof str === 'string' && base64Regex.test(str);
        };

        // Decode base64 string
        const decodeBase64 = (str) => {
            return Buffer.from(str.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        };

        // Only process if images are provided
        if (images.length > 0) {
            // Remove old images from Cloudinary
            if (product.images && product.images.length > 0) {
                for (let i = 0; i < product.images.length; i++) {
                    await cloudinary.uploader.destroy(product.images[i].public_id);
                }
            }

            // Upload new images to Cloudinary and prepare image links
            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                if (isBase64(images[i])) {
                    const decodedImage = decodeBase64(images[i]);
                    const uploadResult = await new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: "products",
                            },
                            (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result);
                                }
                            }
                        );
                        uploadStream.end(decodedImage);
                    });
                    imagesLinks.push({
                        public_id: uploadResult.public_id,
                        url: uploadResult.secure_url,
                    });
                } else {
                    // Check if it is a valid URL
                    try {
                        // const url = new URL(images[i]);
                        const result = await cloudinary.uploader.upload(images[i], {
                            folder: "products",
                        });

                        imagesLinks.push({
                            public_id: result.public_id,
                            url: result.secure_url,
                        });
                    } catch (err) {
                        return res.status(400).json({
                            success: false,
                            message: "Invalid image format!",
                        });
                    }
                }
            }

            // Update req.body.images with new image links
            req.body.images = imagesLinks;
        }

        // Update the product with new data
        product = await ProductSchema.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Product is successfully updated!",
            product,
        });
    } catch (error) {
        console.log("Error in updateProduct function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not updated",
            error: error.message,
        });
    }
};



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
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id)
        }
        await ProductSchema.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
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
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }
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
            rating: Number(rating),
        }

        // console.log(review);
        // console.log(product.reviews[0].userRevId.toString(), req.user.id);

        // Iam not use like the bacause [reviews] parameter is array
        // const isReviewed = await ProductSchema.find(
        //     product.reviews.userRevId === req.user.id
        // );

        // this is find method is array wala method
        const isReviewed = await product.reviews.find((rev) =>
            rev.userRevId.toString() === req.user.id
        );
        // console.log(isReviewed);

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
        // console.log(sum);
        let avg = sum / product.reviews.length;
        // console.log(avg);
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

// Get All Review of a product
const getReviwesAllProducts = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.query.productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found!" });
        }
        res.json({ success: true, reviews: product.reviews })
    } catch (error) {
        console.log("Error in getAllReviwes function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not fetched",
            error: error.message
        });
    }
}

// Delete the reviews 
const deleteProductReview = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.query.productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found!" });
        }
        const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.reviewId);
        let sum = 0;
        reviews.forEach((rev) => {
            sum += rev.rating;
        });
        let ratings = 0;
        if (reviews.length === 0) {
            ratings = 0;
        }
        else {
            let avg = sum / reviews.length;
            ratings = avg.toFixed(1);
        }

        const numOfReviews = reviews.length;

        await ProductSchema.findByIdAndUpdate(req.query.productId, {
            reviews,
            numOfReviews,
            ratings
        }, { new: true, runValidators: true, useFindAndModify: false })

        res.json({ success: true, message: "Review Succesfully deleted!" });
    } catch (error) {
        console.log("Error in getAllReviwes function: ", error.message);
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
    getProductForAdmin,
    updateProduct,
    removeProduct,
    getSingleProduct,
    createProductReview,
    getReviwesAllProducts,
    deleteProductReview,
    upload,
}