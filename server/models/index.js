const mongoose=require("mongoose");
mongoose.set("debug",true);

const databaseURL=process.env.DATABASEURL || "mongodb://localhost/liveBlog";

mongoose.connect(databaseURL,{
    useNewUrlParser:true
});

mongoose.Promise=Promise;

module.exports.Blog=require("./blog.js");
