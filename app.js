require('dotenv').config()
const express = require('express')
const cors = require('cors'); // Add this line to import cors
const app = express()
const connectDB = require('./db/connect')
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors()); // Use this to allow all origins

app.get('/', (req, res)=>{
    res.send('Hii, I am Live')
})

const product_routes = require('./routes/products')

app.use('/api/products',product_routes)

const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, ()=>{
            console.log(`We are connected to Port ${PORT} `);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

start()