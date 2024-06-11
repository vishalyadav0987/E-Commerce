const UserSchema = require('../modals/UserSchema');
const bcrypt = require('bcryptjs')

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

        const token = user.generateToken();
        res.json({ success: true, message: "User Succesfully registered!", token });

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

module.exports = {
    Register,
}