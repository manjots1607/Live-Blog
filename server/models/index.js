const mongoose=require("mongoose");
mongoose.set("debug",true);
mongoose.Promise=Promise;

const databaseURL="mongodb://localhost/liveBlog";

mongoose.connect(databaseURL,{
    useNewUrlParser:true
})
.then(() => console.log(`Database connected`))
.catch(err => console.log(`Database connection error: ${err.message}`));


module.exports.Blog=require("./blog.js");
module.exports.User=require("./user");
