const Status=async(ORDERID)=>{
    const MID=process.env.MID;
    if(!MID) return -1;
    const data={MID,ORDERID};
    const URI=`https://securegw.paytm.in/merchant-status/getTxnStatus?JsonData=${JSON.stringify(data)}`
    try{
        console.log(URI)
        const resp= await fetch(URI)
        const jsonresp=await resp.json();
   if(jsonresp.STATUS==="TXN_SUCCESS"){
    return {paid:true,amount:jsonresp.TXNAMOUNT,orderId:jsonresp.ORDERID,txnId:jsonresp.TXNID}
   }else{
    return {paid:false}
   }
        

    }
    catch(e){
        console.log(`Log created for ${e}`)
        return -2;
    }
}
export default Status;