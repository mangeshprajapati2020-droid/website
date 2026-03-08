import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function VerifyOtp() {
const [otp, setOtp] = useState("")
const [loading, setLoading] = useState(false)
const navigate = useNavigate()
const location = useLocation()

const email = location.state?.email

async function handleVerify(e) {
e.preventDefault()
setLoading(true)

try {
  const res = await axios.post("http://localhost:8000/api/auth/verify-otp", {
    email,
    otp
  })

  if (res.data.success) {
    alert("Account verified successfully!")
    navigate("/login")
  } else {
    alert(res.data.message)
  }
} catch (err) {
  alert(err?.response?.data?.message || "Invalid OTP")
} finally {
  setLoading(false)
}

}

return ( 
  <div className="flex items-center justify-center min-h-screen bg-muted">
   <Card className="w-[380px]"> <CardHeader className="text-center"> 
   <CardTitle className="text-2xl">Verify your email</CardTitle> <CardDescription>
Enter the 6-digit OTP sent to <b>{email}</b> </CardDescription> 
</CardHeader>

    <CardContent>
      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter 6 digit OTP"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          className="text-center tracking-widest text-lg"
          required
        />

        <Button className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify OTP
        </Button>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-4">
        Didn’t receive code?{" "}
        <span className="text-primary cursor-pointer">Resend OTP</span>
      </p>
    </CardContent>
  </Card>
</div>


)
}
