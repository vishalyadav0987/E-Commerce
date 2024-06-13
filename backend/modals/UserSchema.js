const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


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
    resetPasswordExpire: Date,
});

// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
    if (!this.isModified()) { // This cond check if password phle se hash toh dubara hash nh karega
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


//JWT TOKEN
UserSchema.methods.generateToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECERET,{
        expiresIn:process.env.JWT_LIFETIME,
    })
}

//compare password
UserSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}

// Generating reaset passoword token
UserSchema.methods.getResetPasswordToken =  function(){

    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hasing and add to token to userSchema 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}
module.exports = mongoose.models.user || mongoose.model("user", UserSchema);