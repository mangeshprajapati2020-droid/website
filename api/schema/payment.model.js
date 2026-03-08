import { Model, Schema } from "mongoose";

const paymentSchema=Schema({
    utr:{
        type:String,
        required:true,
    },
    transection_number:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    api_response:{
        type:JSON,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now(),
        required:true,
    }
})

const paymentModel=Model("payment",paymentSchema);
export default paymentModel;