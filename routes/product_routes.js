const express=require('express');
const { authorization,isAdmin } = require('../middleware/protectedResources');
const {addProduct,getProduct,updateProduct,productList,productCount,braintreePayment,braintreeToken,productPhotoController,getProductById,deleteProductById,getProductBycategory,updatedImages, productFilters}=require('../controllers/product_controller');
const router=express.Router();
const upload = require('../middleware/fileupload');
const path = require('path');
const __basedir = path.resolve();
//used path and get the image in uploads folder
router.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const path = __basedir + "/uploads/";
    res.download(path + fileName, (error) => {
        if (error) {
            res.status(500).send({ message: "File cannot be downloaded " + error })
        }
    })
});
//used post,get and put for CRUD operations to the product and upload the image and used protected resources with admin
router.post("/addproduct",authorization,isAdmin,upload.single('image'),addProduct);
router.get("/getallproduct",getProduct);
router.get("/getproduct/:id",getProductById);
router.delete("/deleteproduct/:id",deleteProductById);
router.get("/getproduct/by-category/:id",getProductBycategory);
router.put("/updateproduct/:id",upload.single('image'),updateProduct)
router.put("/updatedimages/:id",upload.array('image',10),updatedImages);
router.get("/product-photo/:pid", productPhotoController);
router.post("/productfilters",productFilters);
router.get("/productlist/:page",productList);
router.get("/productcount",productCount);
router.get("/braintree/token",braintreeToken);
router.post("/braintree/payment",authorization,braintreePayment);

module.exports=router;