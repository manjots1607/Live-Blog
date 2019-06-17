const express= require('express');
const router=express.Router();
const db=require("../models/index");

router.get("/",(req,res)=>{
    // code to display all blogs
    db.Blog.find()
    .then((blogs)=>{
        res.json(blogs);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err);
    })

    // res.json({msg:"here will be all list of blogs!!!"});
});

router.post("/",(req,res)=>{
    // code to add new blog
    db.Blog.create(req.body)
    .then((createdBlog)=>{
        res.json(createdBlog);
    }).catch((err)=>{
        console.log(err);
        res.json(err);
    });

});

router.get("/:id",(req,res)=>{
    // code to show one blog
    db.Blog.findById(req.params.id)
    .then((foundBlog)=>{
        res.json(foundBlog);
    }).catch((err)=>{
        console.log(err);
        res.status(404).json(err);
    });
    
});

router.put("/:id",(req,res)=>{
    //logic to update blog
    db.Blog.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((updatedBlog)=>{
        res.json(updatedBlog);
    }).catch((err)=>{
        console.log(err);
        res.status(404).json(err);
    });

});

router.delete("/:id",(req,res)=>{
    //logic to delete blog
    db.Blog.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.json({msg:"deleted Successfully"});
    }).catch((err)=>{
        console.log(err);
        res.json(err);
    });
  
});

module.exports=router;