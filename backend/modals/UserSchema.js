const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 character"],
        minLength: [4, "Name Should have more than 4 character"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minLength: [8, "Password should greater than 8 character"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordDate: Date,
});


UserSchema.pre("save", async function (next) {
    if (!this.isModified()) { // This cond check if password phle se hash toh dubara hash nh karega
        next();
    }
    this.password = bcrypt.hash(this.password, 10);
});


module.exports = mongoose.models.user || mongoose.model("user", UserSchema);