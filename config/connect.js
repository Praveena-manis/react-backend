const mongoose=require('mongoose');
const dotenv=require('dotenv');//used mongoose for connection and used dotenv for configuration
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected"))
.catch((error)=>console.log("error in connection:"+error))