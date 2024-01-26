const categoryModel=require('../models/category_model');
const productModel=require('../models/product_model');
const OrderModel=require('../models/order_model');
const braintree=require('braintree');//used braintree for payment
const dotenv=require('dotenv');
dotenv.config();
//used id,privatekey and public key for payment gateway
var gateway = new braintree.BraintreeGateway({
   environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
//in addproduct used file for loading images 
const addProduct=async(req,res)=>{
    try {
        const file=req.file;
        if(!file)
        {
            return res.status(400).json({message:'No image in the request'});
        }  
        const fileName=file.filename;
        const path=__basedir+`/uploads/${fileName}`;
        let product=new productModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            quantity:req.body.quantity,
            image:fileName,
            category:req.body.category,
            shipping:req.body.shipping,
            rating:req.body.rating,
            reviews:req.body.reviews
        })
        product =await product.save();
        if(!product)
        return res.status(400).send("product cannot be created");
        res.status(200).send(product);
        } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
}
//used product model and find for getting product details
const getProduct=async(req,res)=>{
    try {
let product = await productModel.find({}).populate("category");
    res.status(201).send({
      success: true,
      message: "Get all Product Successfully",
      product, 
} )}catch (error) {
            console.log(error);
            return res.status(500).json({message:"Internal server error"});
        }
    }
    //used params.id and select for selecting images
    const productPhotoController = async (req, res) => {
        try {
          const product = await productModel.findById(req.params.pid).select("image");

          if (product.image) {
            res.set("Content-Type", product.image.contentType);
            return res.status(200).send(product.image);
          }
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
          });
        }
        };
        //using findbyid for getting products with their id
const getProductById=async(req,res)=>{
    try {
        const {id}=req.params;
        const productbyid=await productModel.findById(id).populate("category");
        res.status(201).send({success:true,message:"get product by ID successfully",productbyid});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//using findby id and delete for deleting the product with their id
const deleteProductById=async(req,res)=>{
    try {
        const {id}=req.params;
        const productbyid=await productModel.findByIdAndDelete(id);
        res.status(201).send({success:true,message:"delete product by ID successfully",productbyid});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//using find for getting product by category
const getProductBycategory=async(req,res)=>{
    try{
        const categoryId=req.params.id;
        const categorybyid=await productModel.find({category:categoryId}).populate("category");
        res.status(201).send({success:true,message:"get Product by category",categorybyid});
    }catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//using findby id and update with their id and file for updating image
const updateProduct = async (req, res) => {
  try {
      const id = req.params.id;
    const image=req.file.filename;
      const { name, description, price, quantity, category, shipping=false, rating, reviews } = req.body;
      const update = await productModel.findByIdAndUpdate(id, { name, description, price, quantity, image, shipping, category, rating, reviews }, { new: true });
      if (!update) {
          return res.status(404).json({ success: false, message: "Product not found" });
      }
      // Adjusted response status code to 200 for a successful update
      res.status(200).json({ success: true, message: "Updated successfully", update });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
};
//using findbyid and update updating the images
const updatedImages=async(req,res)=>{
    try{
        const files=req.files;
        let imagesPaths=[];
        const path=__basedir+`/uploads/${files.filename}`;
        if(files){
            files.map(file=>{
                imagesPaths.push(`${path}$`);
            })
        }
        const product=await productModel.findByIdAndUpdate(req.params.id,{
            images:imagesPaths,
        },{
            new:true
        })
        res.send(product);
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}
//used filters for products with checked and radio 
const productFilters= async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let arg = {};
      if (checked.length > 0) arg.category = checked;
      if (radio.length) arg.price = { $gte: radio[0], $lte: radio[1] };
      const products = await productModel.find(arg);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Filtering Products",
        error,
      });
    }
  };
  //create pagination for the products and used find 
  const productList= async (req, res) => {
    try {
      const perPage = 4;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };
  //estimateddocument count is used for calculating the product count
  const productCount = async (req, res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };
  //used braintree token is generated using generate
  const braintreeToken=async(req,res)=>{
    try {
      gateway.clientToken.generate({},function(err,response){
        if(err)
        {
          res.status(500).send(err);
        }
        else{
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //used payment gateway for transaction and get the product details and user details in order model
  const braintreePayment=async(req,res)=>{
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = await gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order= new OrderModel({
              products: cart,
              payment: result,
            buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
        );
    } catch (error) {
      console.log(error);
    }
  }
  
 
  
module.exports={addProduct,getProduct,getProductById,productCount,updateProduct,productList,deleteProductById,getProductBycategory,updatedImages,productPhotoController,productFilters,braintreeToken,braintreePayment};