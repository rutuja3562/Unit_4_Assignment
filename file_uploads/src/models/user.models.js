const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    profile_pic:{type:String,required:true},
},
{
    versionKey:false,
    timestamps:true,
})



const User = mongoose.model("user",userSchema);

const gallerySchema = new mongoose.Schema(
  {
    
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const Gallery= mongoose.model("gallery",gallerySchema)
module.exports = User;

// module.exports = {User, Gallery};