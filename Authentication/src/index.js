// install express
const express = require("express");


const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const { register, login } = require("./controllers/auth.controller");
// const login = require("./controllers/user.controller");

const app = express();
app.use(express.json());

app.post("/registers", register);
app.post("/login",login);
app.use("/users", userController);
app.use("/products",productController);


module.exports=app;