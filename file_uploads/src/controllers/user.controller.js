const path = require("path")

const express = require("express");

const User = require("../models/user.models");
// const {User, profile_pic} = require("../models/user.models");
const uploads = require("../middleware/uploads.js");

// const { router } = require("..");

// const router = express.Router();
const router = express.Router();

 router.get("",  async (req, res) => {
   try {
     const users = await User.find().lean().exec();

     return res.status(200).send(users);
   } catch (err) {
     return res.status(500).send({ massage: err.massege });
   }
 });


 router.post("", uploads.single("profile_pic"), async (req, res) => {
   //  console.log("path", path);
    //  console.log(req.file);
   try {

    const user = await User.create({
      first_name:req.body.first_name,
     profile_pic:req.file.path,
    
    })
     return res.status(201).send("user");
   } catch (err) {
     return res.status(500).send({ massege: err.massege });
   }
 });
router.post("/", uploads.array("profile_pic",7), async (req, res) => {
  try {
  
    return res.status(201).send("user");
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});



// module.exports = router;
module.exports = router;

