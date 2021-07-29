var express = require('express');
var router = express.Router();
var User = require("../models/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/register" , (req,res)=> {
  res.render("registration.ejs")
})


router.post("/register" , (req,res ,next)=> {
  console.log("hello from post")
     User.create(req.body , (err,user)=> {
       console.log(err,user)
       if(err) return next(err)
       res.redirect("/users/login")   // if user registerd , then redirect to login page
     })
})   //User.create will look for pre saved hook inside model

router.get("/login" , (req,res)=> {
  res.render("login.ejs")
})


router.post("/login" , (req,res,next)=> {
  var  {email , password}  =req.body

  if(!email || !password) {
    res.redirect("/users/login")
  }

  User.findOne({email} , (err,user)=> {
    if(err) return next(err)
    //no user exist , if email does not exist , we get user as Null

    if(!user) {
      return res.redirect("/users/login")
    } //if user try to login before register

    //if user exist , compare password
    user.verifyPassword(password,(err,result )=> {
      //result will be in boolean form
      if(err) return next(err)
      //if result is false
      if(!result) {
        return res.redirect("/users/login")
      }

      //if password correct,persist logged in user
      req.session.userId =user.id  // This line will create session on server side
      res.redirect("/dashboard")
    })
  })
})


module.exports = router;
