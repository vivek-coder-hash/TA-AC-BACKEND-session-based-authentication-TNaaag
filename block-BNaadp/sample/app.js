var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var usersrouter = require("./routes/users")
var mongoose = require("mongoose")

//connect to database
mongoose.connect("mongodb://localhost/sample" , {useNewUrlParser:true , useUnifiedTopology:true} , (err)=> {
    console.log(err ? err : "connect to database")
})


var app = express()

//setup view engine
app.set("view engine" , "ejs" )
app.set("views" , path.join(__dirname , "views"))

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.use((req, res, next)=>{
    res.cookie("Name" , "Vivek" )
    next()
  })
  

//routing
app.use("/users" , usersrouter)





//Error handler
app.use((req,res,next)=> {
    res.send("Page not found")
})

app.use((err,req,res,next)=> {
    res.send(err)
})

//listen
app.listen(4000,()=>{
    console.log("server listening to port 4000")
})