const express= require('express');
const app=express();
const BlogRoutes=require("./routes/blog.js");
const bodyParser=require("body-parser");


//To remove the Access-Control-Allow-Origin error
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.json({msg:"HelloWorld!!! from app.js"});
});
app.use("/blog-api/",BlogRoutes);



const port=process.env.PORT || 5000;
app.listen( port,()=>{
    console.log("app running on: " + port);
});
