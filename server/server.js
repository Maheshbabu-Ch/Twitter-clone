const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const tweets = require('./routes/tweets');
const user = require('./routes/user');
const { User }  = require('./model/Schema');


//initilze express.js
const app = express();
//to receive json data
app.use(express.json());
//initilze cors 
app.use(cors({
    origin: '*'
}));

//connect mongobd
mongoose.connect('mongodb+srv://mahesh:mahesh12@cluster0.9g80yjd.mongodb.net/firstdb?retryWrites=true&w=majority')
.then(
    console.log("Db is connected")
)

//auth api's
app.use('/api/auth', auth);
//users api's
app.use('/api/user', user);
//tweets api's
app.use('/api/tweets', tweets);

// app.get("/retrieve",(req,res)=>{ User.find() 
//     .then(found => res.json(found) )})
//run server
app.listen(5000, () => console.log('server is running'));