const mongoose = require('mongoose');

const connectDB = (URI) =>{
    return mongoose.connect(URI).then(()=>{
        console.log("Database connected succesfully!");
    }).catch((error)=>{
        console.log("Error in connectDB function: ",error.message);
    });
}

module.exports=connectDB;