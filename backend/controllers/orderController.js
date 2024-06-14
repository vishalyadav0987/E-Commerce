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

const getSingleOrderDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await OrderSchema.findById(id).populate("userId", "name email");
        if (!order) {
            return res.json({ success: true, message: `Order doesn't found with this id:${id}` });
        }
        res.json({
            success: true,
            data: order,
        })
    } catch (error) {
        console.log("Error in getSingOrderDetail function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not fetched",
            error: error.message
        });
    }
}

const myOrder = async (req, res) => {
    try {
        const myOrders = await OrderSchema.find({ userId: req.user.id });
        res.json({
            success: true,
            data: myOrders,
        })
    } catch (error) {
        console.log("Error in myOrder function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message
        });
    }
}

module.exports = {
    newOrder,
    getSingleOrderDetail,
    myOrder,
}
