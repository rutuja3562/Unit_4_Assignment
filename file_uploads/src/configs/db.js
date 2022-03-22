const mongoose = require("mongoose");

 const connect = () =>{
    return mongoose.connect(
      "mongodb+srv://rutuja:rutuja3562@cluster0.orwkt.mongodb.net/file_uploads?retryWrites=true&w=majority"
    );
}
module.exports= connect;