const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const PORT = 4000 || process.env.PORT;
const connectDB = require('./connectDB/connect');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')


// Handled uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server rejection due to uncaughtException`);
    server.close(() => {
        process.exit(1);
    })
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/order', orderRoutes);

// TEST ENDPOINT
app.get('/test', (req, res) => {
    res.send("This is E-Kart website.");
});

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

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


