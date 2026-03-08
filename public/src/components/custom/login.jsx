import { useEffect, useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "../../../context/authContext"
import { Loader2, Printer, Zap, ShieldCheck, Globe } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import api from "../../lib/axios"

export default function LoginPage() {

  const { login, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Check existing session
  useEffect(() => {
    if (user) {
      navigate("/dashboard")
      return
    }

    // auto-login if cookie session exists
    const checkSession = async () => {
      try {
        const res = await api.get("/user/profile")
        if (res.data.success) {
          login(res.data.user)
          navigate("/dashboard")
        }
      } catch (err) {
        // not logged in — do nothing
      }
    }

    checkSession()
  }, [user, navigate, login])


  async function onSubmit(event) {
    event.preventDefault()

    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      })

      if (response.data.success) {
        login(response.data.user)
        navigate("/dashboard")
      } else {
        alert(response.data.message)
      }

    } catch (error) {
      alert(error?.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen grid lg:grid-cols-2 overflow-y-auto">

      {/* LEFT PANEL (HIDDEN ON MOBILE) */}
      <div className="relative hidden lg:flex flex-col bg-primary text-white p-10 h-full">

        <div
          className="flex items-center text-lg font-medium cursor-pointer"
          onClick={() => navigate("/")}
        >
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


      {/* RIGHT PANEL */}
      <div className="px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center col-span-1 lg:col-start-2">

        <div className="w-full max-w-md space-y-6 mx-auto">

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your print dashboard
            </p>
          </div>

          <Card className="border-none shadow-none">
            <form onSubmit={onSubmit}>
              <CardContent className="grid gap-4 p-0">

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="px-0 font-normal text-xs">
                      Forgot?
                    </Button>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button className="w-full h-11 text-base" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>

              </CardContent>
            </form>
          </Card>


          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full h-11">
            Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground pt-2">
            By continuing you agree to our{" "}
            <Link to="/terms" className="underline">Terms</Link> and{" "}
            <Link to="/privacy" className="underline">Privacy Policy</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
