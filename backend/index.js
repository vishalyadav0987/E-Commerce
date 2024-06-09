const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3000 || process.env.PORT;
const connectDB = require('./connectDB/connect');

app.use(express.json());

// TEST ENDPOINT
app.get('/test',(req,res)=>{
    res.send("This is E-Kart website.");
});

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Something went wrong, Please check the Database");        
    }
}

start();


