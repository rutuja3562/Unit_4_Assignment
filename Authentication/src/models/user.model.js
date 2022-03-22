const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    userName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    role:[{type:String}]
},
{
    versionKey:false,
    timestamps:true
})
userSchema.pre("save",function(next){
    // console.log(this.password);
    const hash = bcrypt.hashSync(this.password, 8);
// let hashedpwd = this.password+"secret";
this.password = hash;

  return next();
})
userSchema.methods.checkedPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model("user",userSchema);
module.exports = User;