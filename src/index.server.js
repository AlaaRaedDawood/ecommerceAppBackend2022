const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
//calling env constant 
const env = require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./routes/users')
const adminRouter = require('./routes/adminroutes')

//conect to mongoose 
mongoose.connect(`mongodb+srv://${process.env.MONGODB_ADMIN}:${process.env.MONGODB_PASSWORD}@cluster0.p5lio.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`).then(
    () => {
        console.log('successfully connected to DB')
    }
);

//use bodyparse as middleware so we can read the data coming through api
app.use(bodyParser.json());

app.use('/api' , userRouter);
app.use('/api/admin' , adminRouter);

//mongodb+srv://${process.env.MONGODB_ADMIN}:${process.env.MONGODB_PASSWORD}@cluster0.p5lio.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority
app.get('/' , (req,res,next)=>{
    res.status(200).json({
        message : "hello darling"
    })
})

app.post('/data' , (req,res,next)=>{
    res.status(200).json({
        message : "hello darling " ,
        body : req.body
    })
})

app.listen(process.env.PORT , ()=> {
    console.log(`Server running on ${process.env.PORT}`)
})