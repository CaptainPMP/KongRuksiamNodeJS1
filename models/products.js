//* Use Mongoose
const mongoose = require('mongoose');

//* Connect to MongoDB
const dbUrl = "mongodb://0.0.0.0:27017/productDB"; //* "/productDB" is Database name, it create if not exist in mongoDB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error(err))

//* Design Schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

//* Create model
let Product = mongoose.model("products", productSchema) //* products is a collection name (table)

//* Export model
module.exports = Product