const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 4000 || process.env.PORT;
const connectDB = require('./connectDB/connect');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoute');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const multer = require('multer')
const path = require('path')


// Handled uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server rejection due to uncaughtException`);
    server.close(() => {
        process.exit(1);
    })
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/.env" });
}

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);


if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(frontendPath, "index.html"))
    })

}

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
})

// TEST ENDPOINT
app.get('/test', (req, res) => {
    res.send("This is E-Kart website.");
});



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        const server = app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
        // Unhandled promises rejection
        process.on("unhandledRejection", (err) => {
            console.log(`Error: ${err.message}`);
            console.log(`Shutting down the server rejection due to unhandled Promise rejection`);
            server.close(() => {
                process.exit(1);
            })
        });
    } catch (error) {
        console.log("Something went wrong, Please check the Database");
        process.exit(1);  // Ensure process exits if DB connection fails
    }
}

start();


