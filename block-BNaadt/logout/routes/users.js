var express = require('express');
var router = express.Router();
var User = require("../models/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register" , (req,res,next)=> {
  res.render("register.ejs")
})

router.post("/register" , (req,res,next)=> {
  console.log(req.body) // data entered by user
  User.create(req.body , (err,user)=> {
    console.log(err ,user) // ID and hashed password
    if(err) return next(err)
    res.redirect("/users/login")

  })

})   //User.create will look for pre saved hook inside model

router.get("/login" , (req,res,next)=> {
  var error =req.flash("error")[0]
  res.render("login.ejs" , {error:error})
})


router.post("/login" , (req,res,next)=> {
  var {email,password} = req.body

  if(!email || !password) {
    req.flash("error" , "Email/Password required")
    return res.redirect("/users/login")
  }

  User.findOne({email} , (err,user)=> {
    if(err) return next(err)

    if(!user) {
      return res.redirect("/users/login")
    }

    //user exist , compare password
    user.verifyPassword(password , (err,result)=> {
      if(err) return next(err)

      if(!result) {
        return res.redirect("/users/login")
      }


      //if password correct , persist user logged in
      req.session.userId =user.id  //This line will create session
      res.send("user logged in")

   

    })
  })

  router.get("/logout" , (req,res)=> {
    req.session.destroy()
    res.clearCookie("connect.sid") //remove cookie after logout
    res.redirect("/user/login")
  })
})




module.exports = router;
