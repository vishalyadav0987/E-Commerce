const ProductSchema = require('../modals/ProductSchema');
const OrderSchema = require('../modals/OrderSchema');
const UserSchema = require('../modals/UserSchema');


const newOrder = async (req, res) => {
    const {
        shippingInfo,
        OrderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    try {
        const order = await OrderSchema.create({
            shippingInfo,
            OrderItems,
            paymentInfo,
            paidAt: Date.now(),
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            userId: req.user.id
        });
        res.json({ success: true, message: "Order Successfully placed!", data: order });
    } catch (error) {
        console.log("Error in newOrder function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not fetched",
            error: error.message
        });
    }
}

module.exports = {
    newOrder,
}
