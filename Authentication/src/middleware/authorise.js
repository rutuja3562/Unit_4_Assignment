// const res = require("express/lib/response");
const User = require("../models/user.model");

const authorise = (permittedRole) => {
  return (req, res, next) => {
    const user = req.user;
    //   console.log("ROLE" , req.userID.role);

    let isPermitted = false;
    permittedRole.map((role) => {
      if (user.role.includes(role)) {
        isPermitted = true;
      }
    });
    if (isPermitted) {
      return next();
    } else {
      return res
        .status(401)
        .send({ message: "You are not authorised to perform this operation" });
    }
  };
};

module.exports = authorise;
