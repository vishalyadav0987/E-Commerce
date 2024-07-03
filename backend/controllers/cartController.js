const ProductSchema = require('../modals/ProductSchema');
const UserSchema = require('../modals/UserSchema');

// ADD TO CART 
const addToCart = async (req, res) => {
    try {
        const { id } = req.user;
        const { productId, quantity } = req.body;
        console.log(productId, id);
        let userData = await UserSchema.findOne({ _id: id });
        // console.log(userData);


        let cartData = await userData?.cartData;

        cartData[productId] = quantity;
        await UserSchema.findByIdAndUpdate(id, { cartData });
        res.json({ success: true, message: "Product Added To Cart", cartData: userData?.cartData });

    } catch (error) {
        console.log("Error in addToCart Function->", error);
        res.json({ success: false, message: error.message });
    }
}

//REMOVE ITEM TO USER CART
const removeFromCart = async (req, res) => {
    
}

module.exports = {
    addToCart,
    removeFromCart,
    // getCartData
}