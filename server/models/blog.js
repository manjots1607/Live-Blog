const mongoose=require("mongoose");
const User = require('./user');

var blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            rel:User
    },
        username:String,
        authorURL:String
    },
    imageURL:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now()
    },
    isLive:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model("blog",blogSchema);
