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

// Admin --- rights
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderSchema.find({});
        if (!orders) {
            return res.json({ success: true, message: `Order cart is empty!` });
        }
        let totalAmount = 0;
        orders.forEach((order) => {
            totalAmount += order.totalPrice
        })
        res.json({
            success: true,
            totalAmount,
            data: orders
        })
    } catch (error) {
        console.log("Error in getAllOrders function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message
        });
    }
}

// Admin --- rights
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;
    try {
        const order = await OrderSchema.findById(id);
        if (!order) {
            return res.json({ success: true, message: `Order doesn't found with this id:${id}` });
        }
        if (order.orderStatus === "Delivered") {
            return res.json({ success: true, message: `You have already delivered this order` });
        }

        order.OrderItems.forEach(async (order) => {
            await updateStoke(order.productId, order.quantity);
        });

        order.orderStatus = orderStatus;
        if (orderStatus === "Delivered") {
            order.deliveredAt = Date.now()
        }
        await order.save({ validateBeforeSave: false });
        res.json({
            success: true,
            message: "Status Successfully updated!"
        })
    } catch (error) {
        console.log("Error in updateOrderStatus function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message
        });
    }
}

const updateStoke = async (productId, quantity) => {
    try {
        const product = await ProductSchema.findById(productId);
        if (!product) {
            return res.json({ success: true, message: `product doesn't found with this id:${id}` });
        }
        product.Stock -= quantity;
        await product.save({ validateBeforeSave: false });
    } catch (error) {
        console.log("Error in updateStoke function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message
        });
    }
}

// Admin --- rights
const deleteOrder = async (req, res) => {

    const { id } = req.params;
    try {
        const order = await OrderSchema.findById(id);
        if (!order) {
            return res.json({ success: true, message: `Order doesn't found with this id:${id}` });
        }
        res.json({
            success: true,
            message: "Order succesfully removed!"
        })
        await OrderSchema.findByIdAndDelete(id)

    } catch (error) {
        console.log("Error in deleteOrder function: ", error.message);
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
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
}
