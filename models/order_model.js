const mongoose=require("mongoose");
//created orderschema with mongoose and used productmodel reference for getting product details and used usermodel for getting user details
const   OrderSchema=new mongoose.Schema(
    {
        products:[
            {
                type:mongoose.ObjectId,
                ref:"productModel",  
            required:true      },
        ],
        payment:{},
        buyer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserModel",
            required:true
           
        },
        status:{
            type:String,
            default:"Not Process",
            enum:["Not Process","Processing","Shipped","delivered","cancel"],
        },
    },{timestamps:true}
);
const OrderModel=mongoose.model('OrderModel',OrderSchema);
module.exports=OrderModel;