import express from "express";
import  "dotenv/config.js";
import Status from './payments/status.js'
import Payment from "./payments/init.js";
import cors from "cors";
import dns from "dns";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
const app=express();
import ip from "ip";
const PORT=process.env.PORT || 8000;
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://192.168.43.149:5173",
  credentials: true
}));

await dns.setServers(['8.8.8.8', '8.8.4.4'])
mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>{
    console.log("Mongo Error:",err.message)
})

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)


//protected routes


app.get("/pay/:QR",async(req,res)=>{
    const {QR}=req.params;
   const  {blob,UPI_INTENT}=await Payment(1,QR)
   const arb=await blob.arrayBuffer()
   const bfr=Buffer.from(arb)
   res.type(blob.type)
   res.send(bfr)
   
   
})
app.get("/pay/upi/info/:ORDER",async(req,res)=>{

const {ORDER}=req.params;
const {UPI_INFO}=await Payment(1,ORDER)
res.json({UPI_INFO})

})
app.post("/pay/init",async(req,res)=>{
    const amount=1;
    const orderId=`ORDER_${Date.now()}`
    const qrUrl=`http://localhost:${PORT}/pay/${orderId}`
    res.json({orderId,qrUrl,amount,success:true})
})
app.post("/pay/status",async(req,res)=>{
    const {orderId}=req.body;
    const resp=await Status(orderId)
    res.json(resp)
    

})

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server running at ${PORT}`)
    console.log(ip.address())
})
