require("dotenv").config()
const connectDB = require('./db/connect')
const Product = require('./models/product')
const ProductJson = require('./products.json')


const start = async()=>{
    try {
        await connectDB(process.env.MONGODB_URL)
        // await Product.deleteMany()  this line of code work when we puch data or mudufy our json file and puch data in mongos using {node productDB.js} it puch data and delete previous data 
        await Product.create(ProductJson)
        console.log('success');
        
    } catch (error) {
        console.log("Error of Program",error);
        
    }
}
start()