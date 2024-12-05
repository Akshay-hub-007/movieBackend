const express=require("express")
const connect=require("./db");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors')
const app=express();
require("dotenv").config();
app.use(express.json());
app.use(cors())

connect()
app.use("/api",authRoutes)

app.listen(3000,()=>{
    console.log("port is running on 3000")
})