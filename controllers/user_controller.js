const bcrypt = require('bcrypt');//used bcrypt for encryption the password
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET;//used secret key from config
const UserModel = require('../models/user_model');//used usermodel and order model 
const OrderModel = require('../models/order_model');
const register = async (req, res) => {
  try {
    //get user details from body
    const { name, address, phone, email, password } = req.body;
    if (!name || !address || !phone || !email || !password) {
      return res.status(400).json({ message: "All the fields are mandatory" });
    }
    //used usermodel and find email
    let user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(500).json({ message: "emailid is already registered" });
    }
    //used bcrypt.hash for encrypting the password upto 10 rounds
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newuser = new UserModel({ name, address, phone, email, password: hashedPassword });
    const resp = await newuser.save();
    res.status(201).send({ message: "User registered successfully", resp });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "internal server error" });
  }
}
const login = async (req, res) => {
  try {
    //used usermodel and findone for finding the email
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "one or more fields are empty" });
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(500).json({ success: false, message: "Invalid Credentials" });
    }
    //check whether the password is match and compare the password with user using bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const jwtToken = jwt.sign({ _id: user._id }, SECRET);
      //if the password match then display the user info
      const userInfo = { "_id": user._id, "name": user.name, "email": user.email, "phone": user.phone, "address": user.address, "isAdmin": user.isAdmin };
      res.status(200).json({ success: true, result: { token: jwtToken, user: userInfo } });
    } else {
      return res.status(401).send({ succes: false, message: "invalid credentials" });
    }
  }
  catch (error) {
    console.log(error);
  }
}
const Profile = async (req, res) => {
  try {
    //used usermodel and findby id is used for finding the user and update the user details by findbyid and update
    const { name, email, password, address, phone } = req.body;
    const user = await UserModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({ message: "Password is required and must 6 characters long" });
    }
    const hashedPassword = password ? await bcrypt.hash(req.body.password, 10) : undefined;
    const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, { name: name || user.name, email: email || user.email, password: hashedPassword || user.password, address: address || user.address, phone: phone || user.phone }, { new: true });
    res.status(200).send({ success: true, message: "Profile Updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: "Error while update profile", error });
  }
}
const Order = async (req, res) => {
  try {
    //for orders used ordermodel and used find for user id
    const orders = await OrderModel.find({ buyer: req.user._id })
      .populate("products")
      .populate("buyer", "name")
      .sort({ "createdAt": -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Getting Orders",
      error,
    });
  }
}
const allOrders = async (req, res) => {
  try {
        //for orders used ordermodel and used find for getting all the details 
    const orders = await OrderModel
      .find({})
      .populate("products")
      .populate("buyer", "name")
      .sort({ "createdAt": -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};
const orderStatus = async (req, res) => {
  try {
    //get the order status using orderid and status then update the status using findby id and update
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
module.exports = { register, login, Profile, Order, allOrders, orderStatus };
