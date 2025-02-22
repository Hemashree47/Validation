const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect")
})

const loginSchema = new mongoose.Schema({
    name:{
        type : String, 
        required : true 
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("Collection1",loginSchema)
module.exports=collection;