
const User = require("../models/user.model");
// libary for token
const jwt = require("jsonwebtoken");

require("dotenv").config();


const generateToken = (user) => {
  return jwt.sign({ user }, process.env.jwt_secret_key);
};

const register = async (req, res) => {
  // console.log("register");
  try {
    let user = await User.findOne({ email: req.body.email });

    // if user is present
    if (user) {
      return res.status(400).send({ massege: "Email alredy registered" });
    }

    // if not then create
    user = await User.create(req.body);

    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ massege: err.massege });
  }
};


const login = async (req, res) => {
   
  try {
    const user = await User.findOne({ email: req.body.email });
    // first check email exist or not
    // if not
    if (!user) {
        
      return res
        .status(400)
        .send({ massege: "Password or Email dosen't exits" });
    
    }
 
    // email is exist then check password
    //password

    const match = user.checkedPassword(req.body.password);

    // if user entered password (plane text password) is not match with database password(this.password)
    if (!match) {
        // console.log("not found user");
      return res.status(400).send({ massege:"wrong email or password" });
    }
    // console.log(user);
    // if match both password password
    // user = await User.create(req.body);
   const token = generateToken(user);
   return res.status(200).send({ user, token });
//  return res.status(200).send("user");
  } catch (err) {
    res.status(400).send({ massege: err.massege });
  }
};

module.exports = { register, login };
