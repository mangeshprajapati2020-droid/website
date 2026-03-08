import nodemailer from "nodemailer";
const  sendOtp=async (email,otp,name)=>{
    if(!email || !otp) return -1;
const user=process.env.GOOGLE_APP_EMAIL;
const transporter = nodemailer.createTransport({
    
  service: "gmail",
  auth: {
     user,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const message = {
    from: `PrintLive <${user}>`,
    to: email,
    subject: "Your PrintLive OTP Code",
    text: `OTP for your PrintLive account: ${otp}`,
    html: `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                    .content { padding: 30px; text-align: center; }
                    .otp-box { background-color: #f0f0f0; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; }
                    .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
                    .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; }
                    .warning { color: #d32f2f; font-size: 14px; margin-top: 15px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>PrintLive</h1>
                        <p>Verify Your Account</p>
                    </div>
                    <div class="content">
                        <h2>Your One-Time Password</h2>
                        <p>Dear ${name} use this OTP to verify your PrintLive account:</p>
                        <div class="otp-box">
                            <div class="otp-code">${otp}</div>
                        </div>
                        <p style="color: #666; font-size: 14px;">This code expires in 10 minutes</p>
                        <p class="warning">⚠️ Never share this code with anyone</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 PrintLive. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>
    `,
};

transporter.sendMail(message, (error, info) => {
    if (error) {
        console.log("Error sending OTP:", error);
    } else {
        console.log("OTP sent successfully:", info.response);
    }
});
    
    }

export default sendOtp;