const UserSchema = require('../modals/UserSchema');
const bcrypt = require('bcryptjs');
const sendTokenInCookie = require('../Utils/SetTokenInCookie');
const sendEmail = require('../Utils/sendEmail');
const crypto = require('crypto');

const Register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExsist = await UserSchema.findOne({ email });
        if (userExsist) {
            return res.json({ success: true, message: "User Already exsist!" });
        }

        // 1st way to do
        // const salt = await bcrypt.genSalt(10);
        // const hassedPassword = await bcrypt.hash(password, salt);

        /*
        I am not done the hasspassword through the register function because if update the user details 
        then password again hassed of hasspassword that why not done this place
        */


        const user = await UserSchema.create({
            name,
            email,
            // password: hassedPassword,
            password,
            avatar: {
                public_id: "This is my id",
                url: "vishalyadav.com",
            }
        });

        // 1st way to generate token using create function
        // const token = await generateToken(id);

        // const token = user.generateToken(); 


        // another way to do : this way also store token in cookie
        sendTokenInCookie(user, 201, res, "User Succesfully registered!");

    } catch (error) {
        console.log("Error in Register function: ", error.message);
        let errorMessage = "Validation failed";
        if (error.name === 'ValidationError') {
            errorMessage = Object.values(error.errors).map(val => val.message).join(', ');
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong, User not registered!",
            error: errorMessage
        });
    }
}


const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all the details!" });
        }
        const user = await UserSchema.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        // const token = user.generateToken();

        // another way to do : this way also store token in cookie
        sendTokenInCookie(user, 201, res, "User successfully logged in!");

    } catch (error) {
        console.error("Error in Login function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, user not logged in!",
            error: error.message
        });
    }
}


// LOGOUT FUNCTION
const Logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            message: "User Succesfully logged out",
        });
    } catch (error) {

    }
}



const forgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email);

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    try {
        const user = await UserSchema.findOne({ email: req.body.email });
        console.log(user);

        if (!user) {
            return res.json({ success: true, message: "User doesn't exist!" });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        try {
            await user.save({ validateBeforeSave: false })
            console.log(user);

            res.json({ sucess: true });
        } catch (error) {
            console.log("Erroro here:", error.message);
            res.json({ sucess: false });

        }



        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        console.log(resetPasswordUrl);


        const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it.`;



        try {
            const options =
            {
                email: user.email,
                subject: `E-Commerce password recovery link.`,
                message,
            }

            await sendEmail(options);

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully!`
            });
        } catch (error) {
            console.error("Error sending email: ", error.message);

            // Reset the token and expiration fields if there is an error
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            res.status(500).json({
                success: false,
                message: "Something went wrong while sending the email, try again later!",
                error: error.message
            });
        }
    } catch (error) {
        console.error("Error in forgetPassword function: ", error.message);

        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later!",
            error: error.message
        });
    }
};// not working

const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const user = await UserSchema.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        if (!user) {
            return res.json({ success: true, message: "Reset token has been expired" });
        }
        if (req.body.password != req.body.confirmPassword) {
            return res.json({ success: true, message: "Password doesn't match" });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendTokenInCookie(user, 200, res, "Password succesfully reset");

    } catch (error) {
        console.error("Error in reset function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, user not logged in!",
            error: error.message
        });
    }
}


// getUserOwnDetails - Get user own profile
const getUserOwnDetails = async (req, res) => {
    try {
        const { id } = req.user;
        const userMe = await UserSchema.findById(id);
        res.json({ success: true, data: userMe });
    } catch (error) {
        console.error("Error in getUserOwnDetails function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        });
    }
}


const updatePassword = async (req, res) => {
    try {
        const userMe = await UserSchema.findById(req.user.id).select("+password");
        if (!userMe) {
            return res.json({ success: false, messgae: "User not found!" });
        }

        const isMatch = await userMe.comparePassword(req.body.oldPassword);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Old password is incorrect!" });
        }

        if (req.body.newPassword != req.body.confirmPassword) {
            return res.status(401).json({ success: false, message: "password doesn't match" });
        }

        userMe.password = req.body.newPassword;
        await userMe.save();
        sendTokenInCookie(userMe, 200, res, "Password successfully updated!");

    } catch (error) {
        console.error("Error in updatePassword function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        });
    }
}


const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newData = {
            name,
            email,
        }

        // add cloudnary later
        const user = await UserSchema.findByIdAndUpdate(req.user.id, newData, {
            runValidators: true,
            new: true,
        });

        res.json({ success: true, message: "Profile succesfully updated!" });
    } catch (error) {
        console.error("Error in updateProfile function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        });
    }
}


// Fetch all user for admin panel --- ADMIN rights
const fetchAllUser = async (req, res) => {
    try {
        const users = await UserSchema.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.error("Error in fetchAllUser function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        });
    }
}




module.exports = {
    Register,
    Login,
    Logout,
    forgetPassword,
    resetPassword,
    getUserOwnDetails,
    updatePassword,
    updateProfile,
    fetchAllUser,
}