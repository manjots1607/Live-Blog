const          express = require('express'),
              passport = require("passport"),
         localStrategy = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose"),
            BlogRoutes = require("./routes/blog.js"),
                    db = require("./models/index"),
              session = require("express-session"),
            bodyParser = require("body-parser"),
                  cors = require("cors"),
                   app = express();


//Express session
app.use(session({
  secret:"Dogs are cute",
  resave:false,
  saveUninitialized:false
}));

//passport Auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

//To remove the Access-Control-Allow-Origin error
// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
//   next();
// });


app.use(cors({
  origin:['http://localhost:5000'],
  methods:['GET','POST'],
  credentials: true // enable set cookie
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//middleware to log curUser
app.use((req,res,next)=>{
  console.log(req.user);
  next();
});

app.get("/",(req,res)=>{
    res.json({msg:"HelloWorld!!! from app.js"});
});
app.use("/blog-api/",BlogRoutes);

//auth routes
app.post("/api/register",(req,res)=>{
  db.User.register(new db.User({username:req.body.username}),req.body.password,(err,user)=>{
      if(err){
          console.log(err);
          res.json(err);
      }
      passport.authenticate("local")(req,res,()=>{
          res.json({
              success:"true",
              user:user.username
          });
      });
  });
});

app.get("/api/logout",(req,res)=>{
  req.logout();
  res.json({msg:"You log out successfully!!!"});
});

app.post("/api/login",passport.authenticate("local",{
      failureRedirect:"/api/err"
  }),(req,res)=>{
      res.json({
        success:"true",
        msg:"You logged in successfully with username "+req.user.username});
});

app.get("/api/err",(req,res)=>{
  res.json({success:"false"});
});


const port=process.env.PORT || 5000;
app.listen( port,()=>{
    console.log("app running on: " + port);
});
