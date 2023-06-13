const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/myRouter');
const cookieParser = require('cookie-parser');
const session = require('express-session')

app.set('views', path.join(__dirname, 'views')); //* tell expressjs where views folder is
app.set('view engine', 'ejs'); //* this line is if you use ejs

app.use(express.urlencoded({extended: false})); //* encoded POST data and need this line before app.use(router)
app.use(cookieParser())
app.use(session({secret:"mysession", resave: false, saveUninitialized: false}))
app.use(router);
app.use(express.static(path.join(__dirname, 'public'))); //*this is for static file


app.listen(8080, () => {
    console.log("Start server at port 8080");
})