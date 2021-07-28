var express = require('express');
var router = express.Router();
var User = require("../models/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register" , (req,res)=> {
  res.render("register.ejs")
})


router.post("/register" , (req,res)=> {
  User.create(req.body , (err , user)=> {
    
     if(err) return next(err)
    res.redirect("/")
  })
})

module.exports = router;
