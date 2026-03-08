
import UserModel from "../schema/user.model.js";
import sendOtp from "../utils/otp.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=async(req,res)=>{
const {email,firstname,lastname,password}=req.body;
console.log(req.body)
const user=await UserModel.findOne({email})
if (user) return res.json({success:false,message:"Email already registered"})
const userId=Date.now().toString(36)+Math.random().toString(36).substring(2,8);
const newPassword=await bcrypt.hash(password,10);
const verifyOtp=100000+Math.floor(Math.random()*900000);
const newUser=new UserModel({
    email,
    firstname,
    lastname,
    password:newPassword,
    userId,
    verifyOtp,
    verifyOtpExpire:Date.now()+10*60*1000
})
try {
    await newUser.save();
 
    const sendResult=await sendOtp(email,verifyOtp,firstname);
    if(sendResult===-1){
        return res.json({success:false,message:"Error sending OTP But user registered successfully"})
    }
    const token=jwt.sign({userId:newUser.id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
    }) 
    res.json({success:true,message:"User registered successfully"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error registering user",error})
}

}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    if(!user) return res.json({success:false,message:"User not found"})
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.json({success:false,message:"Invalid password"})
    if(!user.isVerified) return res.json({success:false,message:"Please verify your account"})
    const token=jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie("token",token,{
        httpOnly:true,
        secure:true,
      
    })
    const userinfo={email:user.email,phone_number:user.phone_number,firstname:user.firstname,lastname:user.lastname,userId:user.userId,address:user.address}
    
    res.json({success:true,message:"Login successful",user:userinfo})
}

export const verifyOtp=async(req,res)=>{
    try{
    const {email,otp}=req.body;
    const OTP=parseInt(otp);
 
    const user=await UserModel.findOne({email})
    console.log(user.verifyOtp,OTP)
    if(!user) return res.json({success:false,message:"User not found"})
    if(user.isVerified) return res.json({success:false,message:"User already verified"})   
    if(user.verifyOtp!==OTP) return res.json({success:false,message:"Invalid OTP"})
        console.log(user.verifyOtpExpire,Date.now() )
    if(user.verifyOtpExpire<Date.now()) return res.json({success:false,message:"OTP expired"})
    user.isVerified=true;
    user.verifyOtp=0;
    user.verifyOtpExpire=0;
    await user.save();
    res.json({success:true,message:"OTP verified successfully"})
}catch(error){
    res.json({success:false,message:"Error verifying OTP",error:error.message})      
}
}
export const resendOtp=async(req,res)=>{
    try{
    const {email}=req.body;
    const user=await UserModel.findOne({email})
    if(!user) return res.json({success:false,message:"User not found"})
    if(user.isVerified) return res.json({success:false,message:"User already verified"})
    const verifyOtp=100000+Math.floor(Math.random()*900000);
    user.verifyOtp=verifyOtp;
    user.verifyOtpExpire=Date.now()+10*60*1000;
    await user.save();
    const sendResult=await sendOtp(email,verifyOtp,user.name);
    if(sendResult===-1){
        return res.json({success:false,message:"Error sending OTP"})
    }
    res.json({success:true,message:"OTP resent successfully"})
}
catch(error){
    res.json({success:false,message:"Error resending OTP",error:error.message})      
}
}

export const logout=(req,res)=>{
    res.clearCookie("token");
    res.json({success:true,message:"Logout successful"})
}
export const resetPassword=async(req,res)=>{
    try{
    const {email}=req.body;
    const user=await UserModel.findOne({email})
    if(!user) return res.json({success:false,message:"User not found"})
    const resetOtp=100000+Math.floor(Math.random()*900000);
    user.resetOtp=resetOtp;
    user.resetOtpExpire=Date.now()+10*60*1000;
    await user.save();
    const sendResult=await sendOtp(email,resetOtp,user.name);
    if(sendResult===-1){
        return res.json({success:false,message:"Error sending OTP"})
    }
    res.json({success:true,message:"Password reset OTP sent successfully"})
}
catch(error){
    res.json({success:false,message:"Error sending password reset OTP",error:error.message})      
}
}

export const verifyResetOtp=async(req,res)=>{
    try{
    const {email,otp,newPassword}=req.body;
    const resetOtp=parseInt(otp);
    const user=await UserModel.findOne({email})
    if(!user) return res.json({success:false,message:"User not found"})
    if(user.resetOtp!==resetOtp) return res.json({success:false,message:"Invalid OTP"})
    if(user.resetOtpExpire<Date.now()) return res.json({success:false,message:"OTP expired"})
    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp=0;
    user.resetOtpExpire=0;
    await user.save();
    res.json({success:true,message:"Password reset successfully"})
}catch(error){
    res.json({success:false,message:"Error resetting password",error:error.message})      
}
}