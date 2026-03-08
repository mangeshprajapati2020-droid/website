import mongoose from "mongoose";
const db=async()=>{
    try{
        const DBURL=ProcessingInstruction.env.DATABASE_URL;
        if(!DBURL) return -1;
        await mongoose.connect(DBURL)
    }
    catch(e){
        console.log(`DB Connection error${e}`)
    }
}