const UserModel=require('../models/user_model')
const newUser=new UserModel({
    name:"sriyas",
    email:"sriyas@gmail.com",
    address:"Bangalore",
    phone:9564434434,
    isAdmin:0,
    password:bcrypt.hash("sriyas")
})
newUser.save();
const newUser1=new UserModel({
    name:"mahima",
    email:"mahima@gmail.com",
    address:"Chennai",
    phone:4895885848,
    isAdmin:1,
    password:bcrypt.hash("mahima")
})
newUser1.save();
module.exports={newUser,newUser1};