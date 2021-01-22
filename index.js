const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

// connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

let db = mongoose.connection;

// Initiate App
const app = express();

// Body Parser middleware - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

// Home route
app.get('/',(req,res)=>{
    res.render('index');
})
// Routes
// API routes
const shorturl = require('./routes/shorturl');
app.use('/api/shorturl/',shorturl);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server started on PORT: ${PORT}`))
