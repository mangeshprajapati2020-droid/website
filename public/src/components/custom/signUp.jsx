
import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "../../../context/authContext"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Printer, ShieldCheck, Zap, Globe } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import api from "@/lib/axios"

export default function SignUpPage() {

  const { setUser, user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [user, navigate])


  // REGISTER
  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post("/auth/register", {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      })

      if (response.data.success) {
        setIsOtpSent(true)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }


  // VERIFY OTP
  async function handleVerify(e) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      })

      if (res.data.success) {
        setUser(res.data.user)
        navigate("/dashboard")
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid OTP")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL (TOP BANNER ON MOBILE) */}
      <div className="relative hidden lg:flex flex-col bg-primary text-white p-10 h-full">


        <div className="flex items-center text-lg font-medium">
          <Printer className="mr-2 h-6 w-6" />
          Print Live
        </div>

        <div className="mt-8 space-y-6 lg:mt-auto">

          <div className="flex items-start gap-4">
            <Zap className="mt-1 h-6 w-6 shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Instant Preview</h3>
              <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed">
                See exactly how your T-shirt or PVC card looks before we press it.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Enterprise Security</h3>
              <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed">
                Secure chip encoding for PVC ID cards and access badges.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Globe className="mt-1 h-6 w-6 shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Global Shipping</h3>
              <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed">
                We print locally and ship globally within 48 hours.
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* RIGHT PANEL (FORM) */}
      <div className="px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">

        <div className="w-full max-w-md space-y-6">

          <div className="text-center space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to start your first print job
            </p>
          </div>


          {/* REGISTER FORM */}
          {!isOtpSent ? (

            <Card className="border-none shadow-none min-h-[420px]">
              <form onSubmit={onSubmit}>
                <CardContent className="grid gap-4 p-0">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex items-start space-x-2 py-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary underline">Terms of Service</Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>.
                    </label>
                  </div>

                  <Button className="w-full h-11 text-base" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>

                </CardContent>
              </form>
            </Card>

          ) : (

            /* OTP VERIFY */
            <Card className="w-full min-h-[380px]">

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Verify your email</CardTitle>
                <CardDescription>
                  Enter the 6-digit OTP sent to <b>{email}</b>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleVerify} className="space-y-4">

                  <Input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center tracking-[0.5em] text-xl h-12"
                    required
                  />

                  <Button className="w-full h-11 text-base" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify OTP
                  </Button>

                </form>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  Didn’t receive code?{" "}
                  <span className="text-primary cursor-pointer">Resend OTP</span>
                </p>
              </CardContent>
            </Card>
          )}


          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full h-11">
            Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

