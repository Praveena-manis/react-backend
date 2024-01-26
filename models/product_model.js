const mongoose=require('mongoose');
//created product schema with mongoose and use categoryModel for getting category
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:'',
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryModel",
        required:true
    },shipping: {
        type: Boolean,
      },
    rating:{
        type:Number,
        default:0
    },reviews:{
        type:Number,
        default:0
    }
},{timestamps:true});
const productModel=mongoose.model("productModel",productSchema);
module.exports=productModel;