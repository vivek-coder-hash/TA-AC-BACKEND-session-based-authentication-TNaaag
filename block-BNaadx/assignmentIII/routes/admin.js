var express = require("express")
var router = express.Router()
var User = require("../models/User")

router.get("/" , (req,res)=> {
    res.send("hello admin")
})


router.get("/register" , (req,res,next)=> {
    res.render("register.ejs" , {error : req.flash("error")[0]})
  })


  router.post("/register" , (req,res,next)=> {
    User.create(req.body , (err , user)=> {
      if(err) {
        if(err.name === "MongoError") {
          req.flash("error" , "Email/userId already exist")
         return  res.redirect("/admin/register")
        }
  
        if(err.name === "ValidationError") {
          req.flash("error" , "Minimum length of password is 5")
        return  res.redirect("/admin/register")
        }
        return res.json({err})
      }
  
      res.redirect("/admin/login")
    })
  
  })

  


  module.exports=router

