const express= require('express');
const app=express();
const BlogRoutes=require("./routes/blog");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.json({msg:"HelloWorld!!! from app.js"});
});
app.use("/api/blog/",BlogRoutes);



const port=process.env.PORT || 3001;
app.listen( port,()=>{
    console.log("app running on: " + port);
});
