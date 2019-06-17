const mongoose=require("mongoose");

var blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:String,
    author:{
        type:String,
        required:true
    },
    created_date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model("blog",blogSchema);