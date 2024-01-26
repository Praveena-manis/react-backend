const jwt=require('jsonwebtoken');//used jwt for token
const SECRET=process.env.JWT_SECRET;//get secret key from config
const mongoose=require('mongoose');
const UserModel=mongoose.model("UserModel");//used usermodel for getting the user details
 const authorization=async(req,res,next)=>{   
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "UnAuthoried.." })
    }
    //if header is available then extract token for the same.
    const token = authHeader.replace('Bearer ', "");
    if (!token) {
        return res.status(401).json({ message: "UnAuthoried.." })
    }
    try {
        //verify and decode the Token
        const decoded = jwt.verify(token,SECRET);
        const user = await UserModel.findById({ _id: decoded._id }, { password: 0 });
        //check if the User Exist
        if (!user)
            return res.status(401).json({ message: "UnAuthoried.." })
        req.user=user;
        //proceed to route
        next(); 
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"UnAuthoried.."})
    }
  }
 const isAdmin=async(req,res,next)=>{
    try{
        //used usermodel for getting user details
        const user=await UserModel.findById(req.user._id);
        if(user.isAdmin!==1){
            return res.status(401).json({message:"Unuthorized Access"
        })
    }
        else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).json({message:"error in middleware admin"});
    }
}
module.exports={authorization,isAdmin};