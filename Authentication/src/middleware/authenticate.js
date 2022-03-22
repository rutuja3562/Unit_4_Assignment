require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwt_secret_key, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(400)
      .send({ massege: "1 st Token not found or incorrect token" });

  if (!req.headers.authorization.startsWith("Bearer "))
  // console.log((req.headers.authorization.split(" ")[1]))
    return res
      .status(400)
      .send({ massege: "2nd Token not found or incorrect token" });

  const token = req.headers.authorization.split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  }

  // req.userId = decoded.user._id;
  // console.log("decoded",decoded);
  req.user = decoded.user
  // req.body.userId = decoded.user._id;
  return next();
};
module.exports = authenticate;
