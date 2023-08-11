const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const User = require('./model/userSchema');
const path = require('path');

// const __dirname = path.resolve();

dotenv.config({ path : './config.env'});

const PORT = process.env.PORT || 8000;

require('./db/conn');

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 
app.use(cookieParser());
app.use(express.json());
app.use(require('./router/auth'));
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function(_, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function(error){
        res.status(500).send(error);
    })
})

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});