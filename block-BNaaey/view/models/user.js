var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var Schema = mongoose.Schema


var userSchema = new Schema({
    name:{type:String , required:true} ,
    email:{type:String , required:true , unique:true},
    phone:{type:String , minlength:10 , maxlength:12} ,
    password:{type:String , minlength:5} 
    
} , {timestamps:true})


//custom pre saved hook defined before creating model
userSchema.pre("save" , function(next) {
    if(this.password && this.isModified("password")) {
        console.log(this , "before hashing")
        bcrypt.hash(this.password , 12 , (err,hashed)=> {
            if(err) return next(err)
            this.password =hashed
            console.log(this , "After hashing")
            return (next)
        })
    }

    else {
        next()
    }  //calling next will make document to save in databse
}) 


userSchema.methods.verifyPassword = function(password,cb)  {
    bcrypt.compare(password , this.password , (err ,result)=> {
        return cb(err,result)
    })
}  //using bcrypt to compare Hashed version of password with plain text password (entered by user)
// line 32 : password is plain text password entered by user and this.password is hashed version of password

var User = mongoose.model("User" , userSchema)
module.exports =User