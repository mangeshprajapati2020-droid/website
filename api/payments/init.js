

const Payment=async(amount,orderId)=>{
const VPA=process.env.VPA
const VPANAME=process.env.UPI_NAME
const paytmqr=process.env.paytmqr;
if(!VPA || !VPANAME) return -1;
const UPI_INFO={VPA,VPANAME,orderId,amount}
const UPI_INTENT=`upi://pay?pa=${VPA}&pn=${VPANAME}&paytmqr=${paytmqr}&am=${amount}&tr=${orderId}&tn=Don't Modify Amount`
const resp=await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(UPI_INTENT)}`);
const blob=await resp.blob();
return {blob,UPI_INTENT,UPI_INFO}


}
export default Payment;