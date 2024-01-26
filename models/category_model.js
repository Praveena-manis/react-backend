const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
   
name:{
    type:String,
    required:true
}, 
id: { type: String },
},{timestamps:true});

const categoryModel=mongoose.model("categoryModel",categorySchema);
module.exports=categoryModel;