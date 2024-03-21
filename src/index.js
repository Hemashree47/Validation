const express=require('express')
const app=express();
const path=require("path")
const hbs=require('hbs')
const collection=require("./mongodb");

const templatePath=path.join(__dirname,'../templates');
app.use(express.json())
app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname,'../public')));
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=> {
    res.render("signup")
})

app.post("/signup", async(req, res) =>{

    const data={
        name:req.body.name,
        password:req.body.password
    }
    const exist=await collection.findOne({name:data.name});
    if(exist)
    {
        res.send("User already  exists! Please choose a different username");
    }
    else{
            const userdata=await collection.insertMany(data);
            console.log(userdata);
    }
    

    res.render("home")
})
app.post("/login", async(req, res) =>{

    try{
        const check=await collection.findOne({name: req.body.name}) 
        
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("Wrong password!!")
        }
    }
    catch{
        res.send("wrong details")
    }
})
app.listen(3000,()=>{
    console.log("port connected")
})