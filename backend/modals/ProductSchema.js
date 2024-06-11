const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter product description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter product price"],
        maxLength: [8, "Please cannot exceed 8 character"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        // id jha pe image ko upload karenge
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [8, "Please Enter product category"],
    },
    Stock: {
        type: Number,
        required: [8, "Please Enter product category"],
        maxLength: [4, "Stock cannot exceed 8 character"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.models.product || mongoose.model("product", ProductSchema);