const multer= require('multer');//used multer for images uploading and downloading
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const uniquesuffix= Date.now()+'-'+Math.random(Math.random()*1e9);
        const fileExtention= file.originalname.split('.').pop();
        cb(null,file.fieldname+'-'+uniquesuffix+'.'+fileExtention);
    }
})
//used filefilter for allowing only jpeg,jpg and png images only 
const fileFilter= (req,file,cb)=>{
    const allowedFileTypes=/jpeg|jpg|png/;
    const extname= allowedFileTypes.test(file.originalname.toLowerCase());
    const mimetype=allowedFileTypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null,true);
    }else{
        cb("Error only JPEG/PNG/JPG files allowed");
    }
}
//used storage and allowed file size upto 5 MB
const upload= multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5 //Allow 5 MB
    },
    fileFilter:fileFilter
})
module.exports=upload;