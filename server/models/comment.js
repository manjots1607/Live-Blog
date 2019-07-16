const mongoose=require("mongoose");

var commentSchema= new mongoose.Schema({
    content:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports=mongoose.model("comment",commentSchema);