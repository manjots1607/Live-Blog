const mongoose=require("mongoose");

var blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:String,
    // author:{
    //     id:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         rel:User
    // },
    //     username:String
    // },
    imageURL:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model("blog",blogSchema);
