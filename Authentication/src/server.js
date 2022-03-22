const app = require("./index.js");
const connect = require("./configs/db");

// const app = express();
app.listen(5000,async()=>{
    try{
        await connect();
        console.log("Listening on port 5000")
    }
    catch(err){
        console.log(err)
    }
})


