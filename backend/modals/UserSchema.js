const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 character"],
        minLength:[4,"Name Should have more than 4 character"],
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        minLength:[8,"Password should greater than 8 character"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordDate:Date,
});



module.exports=mongoose.models.user || mongoose.model("user",UserSchema);