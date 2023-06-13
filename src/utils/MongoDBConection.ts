import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/node-ts").then(()=>{console.log("connected to node-ts DB")}).catch((err : any) => (err.massage));