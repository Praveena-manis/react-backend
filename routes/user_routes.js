const express=require('express');
const {register,login,Profile,Order,allOrders,orderStatus}=require('../controllers/user_controller');//import user controller
const { authorization, isAdmin } = require('../middleware/protectedResources');//import middleware for authorization and admin
const router=express.Router();
router.post("/register",register);//used post for registration
router.post("/login",login);
//protected user route auth
router.get("/user-auth", authorization, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Admin route auth
  router.get("/admin-auth",authorization, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //update the profile with put method
  router.put("/profile",authorization,Profile);
  //get the order details
  router.get('/orders',authorization,Order);
  //get the order details for admin
  router.get('/allorders',authorization,isAdmin,allOrders);
  //updated the order details using put method
  router.put('/order-status/:orderId',authorization,isAdmin,orderStatus);
module.exports=router;