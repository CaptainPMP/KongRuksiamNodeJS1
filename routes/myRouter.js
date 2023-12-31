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
    Product.find().then(doc => res.render('index', {products: doc}));
})

router.get('/add-product', (req, res) => {
    if(req.session.login){
        res.render('form'); //* save product to DB
    } else {
        res.render('admin') //* login
    }
})

router.get('/manage', (req, res) => {
    if(req.session.login){
        Product.find().then((doc) => res.render("manage", { products: doc })); //*Product.find is to bring data from MongoDB and response to js
    } else{
        res.render('admin');
    }
})

router.get('/delete/:id', (req, res) => {
        Product.findByIdAndDelete(req.params.id, {useFindAndModify:false}) //* useFindAndModify is to ignore error
            .then(() => res.redirect('/manage'))
            .catch(err => console.error(err));
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => res.redirect("/manage"));
});

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

router.get('/:id', (req, res) => {
    const product_id = req.params.id;
    Product.findOne({_id:product_id})
        .then(doc => res.render('product', {product: doc}))
        .catch(err => console.error(err))
})

router.post("/edit", (req, res) => {
    const edit_id = req.body.edit_id;
    Product.findOne({ _id: edit_id })
      .then((doc) => { 
        //* use old data that we want to edit -> show in form
        res.render('edit', {product:doc})
      })
      .catch((err) => console.error(err));
});

router.post("/update", upload.single("image"), async (req, res) => {
    const update_id = req.body.update_id;
    let data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    };
    Product.findByIdAndUpdate(update_id, data, {useFindAndModify: false}) //* this is update in MongoDB function
        .then(() => {
            res.redirect('/manage');
        })
        .catch(err => console.error(err));
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const timeExpire = 1000 * 30; //30 seconds

    if(username === "admin" && password == "123"){
        //* make session
        req.session.username = username;
        req.session.password = password;
        req.session.login = true;
        req.session.cookie.maxAge = timeExpire;
        res.redirect('/manage')
    } else {
        res.status(404)
        res.render('404');
    }
})

module.exports = router;