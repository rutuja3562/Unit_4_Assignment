const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");
router.post("",authenticate,async(req,res)=>{
  
    // req.body.userId = req.user
    try{
      // console.log("req", req.body.userId);
        const product = await Product.create(req.body);
        return res.status(200).send(product);
    }
    catch(err){
        return res.status(400).send({massege:err.massege})
    }
})

router.patch("/:id",authenticate,authorise(["seller","admin"]),async(req,res)=>{
 
  try{
const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
return res.status(200).send(product);
  }
  catch(err){
    return res.status(400).send({massege:err.massege})
  }

})


router.get("",  async (req, res) => {
 
  try {
    const product = await Product.find().lean().exec();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ massege: err.massege });
  }
});

module.exports=router;


