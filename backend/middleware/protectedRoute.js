const jwt = require('jsonwebtoken');
const UserSchema = require('../modals/UserSchema')

const protecteRoute = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        if (!token) {
            return res.json({ success: false, message: "User is -Unauthorized!" });
        }
        const decode_token = jwt.verify(token, process.env.JWT_SECERET);
        // req.userId = await decode_token._id;
        req.user = await UserSchema.findById(decode_token._id);
        // save the all info in req.user
        // console.log(decode_token);

        next();
    } catch (error) {
        console.log("Error in protecteRoute function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again",
            error: error.message
        });
    }
}

module.exports = protecteRoute;