const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3000 || process.env.PORT;
const connectDB = require('./connectDB/connect');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute')


// Handled uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server rejection due to uncaughtException`);
    server.close(() => {
        process.exit(1);
    })
});

app.use(express.json());


app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user', userRoutes);

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


