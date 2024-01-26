const categoryModel=require('../models/category_model');
const addCategory=async(req,res)=>{
  //category is added using findone for already and new for creating new category
    try{
        const {name}=req.body;
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }
        const result=await categoryModel.findOne({name});
        if(result)
        {
            return res.status(200).send({success:true,message:'Name already exists'});
        }
        const category= await new categoryModel({
            name
        }).save();
        res.status(201).send({success:true,message:"New category Added",category});
    }catch(error){
        console.log(error);
        res.status(500).send({message:'Error in Category'});
    }
}
//used find for getting the category list
 const getCategory = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List are displayed",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };
  //used findone for getting the single category with their id
 const singleCategory = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ id: req.params.id });
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };
  //for updating category used findbyid and update and used new=true for the changes 
 const updateCategory=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name}=req.body;
        const category=await categoryModel.findByIdAndUpdate(id,{name},{new:true});
        res.status(200).send({message:'category updated successfully',category});
    }catch(error){
        console.log(error);
        res.status(500).send({message:'Error in Category'});
    }
}
//used findby id and delete for deleting the category
 const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({message:'Category Deleted Successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"error while deleting category"});
    }
}
module.exports={addCategory,getCategory,singleCategory,updateCategory,deleteCategory};