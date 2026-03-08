import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
     lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true
    },
address:{

  landmark:{
            type:String,
            default:"",
        },
        line1:{
            type:String,
            default:"",
        },

        line2:{
            type:String,
            default:"",
        },
      
        district:{
            type:String,
            default:""
        },
        state:{
            type:String,
        },
        pincode:{
            type:Number,
            default:110011,
        }
        ,
        coords:{
            lat:{
                type:String,
                default:"",
            }
          ,
            lang:{
                type:String,
                default:"",
            }
           
        }
    },
    phone_number:{
        type:String,
        default:""
    }
    ,
    verifyOtp:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyOtpExpire:{
        type:Number,
        default:(Date.now() + 10*60*1000),
    },
    resetPassOtp:{
        type:Number,
        default:0
    },
    resetOtpExpire:{
        type:Number,
        default:0,
    }
})

const UserModel=mongoose.model("user",userSchema)
export default UserModel;