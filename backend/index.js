

const express=require('express')
const { UserModel ,AgentModel,TaskModel} = require("./config/db"); // Importing UserModel
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken
const mongoose=require("mongoose") // Importing mongoose
const cors=require('cors')
const multer = require("multer");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const uploadRoutes=require("../backend/routes/uploadRoutes")


const app =express()
app.use(express.json())
app.use(cors())
JWT_SECRET="SECRET"
const upload=multer({dest:"uploads/"})

mongoose
.connect("mongodb+srv://gprahul100:opop@cluster0.6za9n.mongodb.net/")
.then(() => {
    app.listen(3001, () => console.log(" Server running on port 3000"));
  })
.catch((err)=>{
    console.log(err)
})


app.post("/signup",async (req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.create({
        email,
        password
    })
    if(user){
        const token=jwt.sign({
            id:user._id
            
        },JWT_SECRET);
        res.json({token,id:user._id,message:"User Created "})
}})
app.post("/signin",async (req,res)=>{
    const {email,password}=req.body

    const user=await UserModel.findOne({
        email,
        password
    })
    if(user){
        const token=jwt.sign({
            id:user._id
            
        },JWT_SECRET);
        res.json({token,id:user._id})

    }else{
        res.status(403). json({
            message:"Invalid Request",
        })
    }
})
app.post("/newAgent",async (req,res)=>{
    try{
    const {firstname,email,mobileNumber,countryCode,password,tasks,createdBy}=req.body

    const NewmobileNumber = `${countryCode}${mobileNumber}`;

    const agent=await AgentModel.create({
        firstname,
        email,
        mobileNumber:NewmobileNumber,
        password,
        tasks:tasks || [],
        createdBy
    })
    res.status(201).json({agent,message:"Agent is created"})
}catch(e){
    console.log(e)
    res.status(500).json({ message: "Internal Server Error" });
}
})
app.get("/agents", async (req, res) => {
    try {
        const { _id } = req.query; // Get _id from query parameters

        if (!_id) {
            return res.status(400).json({ message: "Missing _id parameter" });
        }

        const agents = await AgentModel.find({ createdBy: _id });


        if (agents.length === 0) {
            return res.status(200).json({agents:[], message: "No agents found" });
        }

        res.status(200).json({ agents, message: "Agents retrieved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.post("/tasks",async(req,res)=>{
    try{
        const agents=req.body
        const responce=[]



        for(const agent of agents){
            const tasks=await TaskModel.find({_id:{$in:agent.tasksId}})

            responce.push({
                agentId:agent.agentId,
                agentName:agent.agentName,
                tasks:tasks
            })
        }

        res.status(200).json({responce,message:"did will"})

    }catch(e){
        res.json({e,message:"Failed to fetch"})
        console.log(e)

    }

})


app.use("/api",uploadRoutes)
