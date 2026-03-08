import jwt from 'jsonwebtoken';
import UserModel from '../schema/user.model.js';

const auth= async (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(200).json({msg:'No token, authorization denied'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const id=decoded.userId;
        const user=await UserModel.findById(id);
        if(!user){
            return res.status(200).json({msg:'User not found, authorization denied'});
        }
        req.user=user;
        next();
    }   catch(e){
        console.log(e)
        res.status(401).json({msg:'Token is not valid'});
    }
}
export default auth;    