export const profile=async (req,res)=>{
    const {firstname,lastname,email,isVerified,address,phone_number}=req.user;
    res.json({success:true,user:{firstname,lastname,email,isVerified,address,phone_number}})
}