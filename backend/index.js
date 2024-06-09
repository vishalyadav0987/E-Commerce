const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

// TEST ENDPOINT
app.get('/test',(req,res)=>{
    res.send("This is E-Kart website.");
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})


