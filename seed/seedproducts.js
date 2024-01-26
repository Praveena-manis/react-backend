const productModel=require("../models/product_model");
const product1=new productModel({
    name:"shirt",
    description:"boys checked cotton full sleeve",
    price:400,
    quantity:4,
    image:"https://storage.sg.content-cdn.io/cdn-cgi/image/width=1000,height=1333,quality=90,format=auto,fit=cover,g=top/in-resources/22a79ec5-e694-4d7a-ac5a-85c8fa45b7f1/Images/ProductImages/Source/ITBSH01210LS-Ochre_01.jpg",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:4
})
product1.save();

const product2=new productModel({
    name:"tops",
    description:"girls-trendy cotton designer tops",
    price:500,
    quantity:2,
    image:"https://richous.co.in/wp-content/uploads/2023/05/red-top.jpg",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:4
})
product2.save();
const product3=new productModel({
    name:"saree",
    description:"trendy designer sarees",
    price:1000,
    quantity:5,
    image:"https://rangoliindia.com/uploads/10.Rang_0633.jpg",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:3
})
product3.save();
const product4=new productModel({
    name:"tops",
    description:"kids-Red and black Check print crop top",
    price:300,
    quantity:2,
    image:"https://www.sassafras.in/cdn/shop/products/NVTOPS41108-1.jpg?v=1666370480g",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:5
})
product4.save();
const product5=new productModel({
    name:"shirt",
    description:"men checked striped white shirt",
    price:1500,
    quantity:5,
    image:"https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?cs=srgb&dl=pexels-jeffrey-reed-769749.jpg&fm=jpg",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:4
})
product5.save();
const product6=new productModel({
    name:"jeans",
    description:"Men Jeans on White lay flat",
    price:2000,
    quantity:5,
    image:"https://media.istockphoto.com/id/1173038304/photo/jeans-pants-on-a-white-background-front-and-back.jpg?s=612x612&w=0&k=20&c=CVzJY6H7-HtQ12MgtfU1h8UwW0JIMTSNVgrIl2AtYP8=",
    category:"categoryID",
    shipping:"true",
    rating:4,
    reviews:4
})
product6.save();
const product7=new productModel({
    name:"kurta",
    description:"Men-kurta set white cotton silk",
    price:5000,
    quantity:2,
    image:"https://benzerworld.com/wp-content/uploads/2021/10/benzer-white-cotton-silk-kurta-sets-ME-KC-076-1-1.jpg-1.jpg",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:5
})
product7.save();
const product8=new productModel({
    name:"Kurti",
    description:"kurta with pant set designs for women",
    price:1200,
    quantity:2,
    image:"https://i.pinimg.com/474x/29/6b/cf/296bcf658bb61b4f7f3fe631c90dffc4.jpg",
    category:"categoryID",
    shipping:"true",
    rating:3,
    reviews:3
})
product8.save();
const product9=new productModel({
    name:"T-shirt",
    description:"Plain Henley yellow T-shirt ",
    price:800,
    quantity:6,
    image:"https://storage.sg.content-cdn.io/cdn-cgi/image/width=1000,height=1333,quality=90,format=auto,fit=cover,g=top/in-resources/22a79ec5-e694-4d7a-ac5a-85c8fa45b7f1/Images/ProductImages/Source/ITBTS01144SS-Lemon_02.jpg",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:4
})
product9.save();
const product10=new productModel({
    name:"T-shirt",
    description:"girls-Personalized T-shirt",
    price:500,
    quantity:2,
    image:"https://src1.ilogo.in/images/products/6773/Showcase.jpg",
    category:"categoryID",
    shipping:"true",
    rating:5,
    reviews:4
})
product10.save();