const express=require('express');
const {addCategory,getCategory,singleCategory,updateCategory,deleteCategory}=require('../controllers/category_controller');
const router=express.Router();
//used get,post,put and delete for category
router.post("/addcategory",addCategory);
router.get("/getcategory",getCategory);
router.get("/singlecategory/:id", singleCategory);
router.put("/updatecategory/:id",updateCategory);
router.delete("/deletecategory/:id",deleteCategory);
module.exports=router;  