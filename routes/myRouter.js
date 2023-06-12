const express = require('express');
const router = express.Router();
//* use product model
const Product = require('../models/products')
//* upload file
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/products') //* file location
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+".jpg") //* change file name, prevent redundant
    }
})

//* start upload
const upload = multer({
    storage: storage
})

router.get('/', (req, res) => {
    const products = [
        { name: "โน๊ตบุ๊ค", price: 25000, image: "images/products/product1.png" },
        { name: "เสื้อผ้า", price: 2000, image: "images/products/product2.png" },
        { name: "หูฟัง", price: 30000, image: "images/products/product3.png" },
        { name: "โน๊ตบุ๊ค", price: 25000, image: "images/products/product1.png" },
        { name: "เสื้อผ้า", price: 2000, image: "images/products/product2.png" },
        { name: "หูฟัง", price: 30000, image: "images/products/product3.png" }
    ];
    res.render('index', {products: products});
})

router.get('/addForm', (req, res) => {
    res.render('form');
})

router.get('/manage', (req, res) => {
    res.render('manage');
})

router.post('/insert', upload.single("image"), async (req, res) => { //* .post() is to recieve GET method, "image" is from image field in form.ejs
    // console.log(req.body); //* req.body is where we contain sended data
    let data = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description
    })
    try {
        Product.saveProduct(data); //* no longer callback function accept
        res.redirect('/')
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;