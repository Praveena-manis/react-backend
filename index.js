const express=require('express');
const path = require('path');
const dotenv=require('dotenv');//used dotenv for configuration
const cors=require('cors');//used cors for connecting to frontend
require('./config/connect');
dotenv.config();
global.__basedir=__dirname;
const app=express();
const port=process.env.PORT||5500;
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("get")
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//used middleware for getting images
app.use('/api/v1/user',require('./routes/user_routes'));//used middleware for getting user information and get routes
app.use('/api/v1/category',require('./routes/category_routes'));//used routes for category
app.use('/api/v1/product',require('./routes/product_routes'));//used routes for product
app.listen(port,()=>{
    console.log(`server started:${port}`);
})