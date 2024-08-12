require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECERET_KEY);

const processPayment = async (req, res) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "E-Commerce"
            },

        });

        res.json({ success: true, client_secret: myPayment.client_secret })
    } catch (error) {
        console.log("Erroror in processPayment",error.message);
        res.json({ success: false, message: error.message })
    }
}

const sendStripeApiKey = async(req,res)=>{
    res.json({ success: true, stripeApiKey:process.env.STRIPE_API_KEY })
}
module.exports = {
    processPayment,
    sendStripeApiKey
}