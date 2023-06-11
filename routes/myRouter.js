const express = require('express');
const router = express.Router();

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

router.get('/insert', (req, res) => { //* .get() is to recieve GET method
    console.log(req.query); //* req.query is where we contain sended data 
    res.render('form');
})

module.exports = router;