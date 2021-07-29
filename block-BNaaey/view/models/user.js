var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var Schema = mongoose.Schema


var userSchema = new Schema({
    name:{type:String , required:true} ,
    email:{type:String , required:true , unique:true},
    password:{type:String , minlength:5} ,
    phone:{type:String , minlength:10 , maxlength:12}
} , {timestamps:true})


//custom pre saved hook defined before creating model
userSchema.pre("save" , function(next) {
    if(this.password && this.isModified("password")) {
        bcrypt.hash(this.password , 12 , (err,hashed)=> {
            if(err) return next(err)
            this.password =hashed
            return (next)
        })
    }

    else {
        next()
    }  //calling next will make document to save in databse
}) 


var User = mongoose.model("User" , userSchema)
module.exports =User