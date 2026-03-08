import { useState ,useEffect,useContext} from "react"
import { Button } from "@/components/ui/button"
import { AuthContext } from "../../../context/authContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LayoutDashboard, 
  Shirt, 
  CreditCard, 
  History, 
  Settings, 
  Plus, 
  Search,
  Bell,
  Package,
  CheckCircle2,
  Clock
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import api from "@/lib/axios"
import { useNavigate } from "react-router-dom"

async function fetchUserData() {
 
  const response=await api.get("/user/profile")
  if(response.data.success) {
    return response.data
  } else {
    return null
  }
}
const logOUt = async () => {
  await api.post("/auth/logout")
  return true;
}
export default function UserDashboard() {
   const {logout,user,login,setUser} = useContext(AuthContext)
    // Debugging log
    console.log("User data in dashboard:", user)
const navigate = useNavigate()
const [dp,setdp] = useState("AB")
  const [userName ,setUserName]= useState(user?.firstname||"User")
  
  useEffect(() => {
    if(user) {
    setUserName(user?.firstname || "User")
    setdp(
      user?.firstname && user?.lastname 
        ? `${user.firstname[0]}${user.lastname[0]}` 
        : "AB"
    )}
    else{
      fetchUserData().then(data => {
        if(data?.success) {
         login(data.user)
          // Update auth context with latest user data
        }
        else{
          logout() // Clear auth context if fetching user data fails
          navigate("/login") // Redirect to login if not authenticated
        };
    }
  )}}, [user,navigate])

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* SIDEBAR */}
      <aside className="hidden w-64 border-r bg-background lg:block">
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="bg-primary p-1 rounded-md">
               <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Print Live</span>
          </div>
          <nav className="flex-1 space-y-1">
            <Button variant="secondary" className="w-full justify-start gap-3">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Shirt className="w-4 h-4" /> My Apparel
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <CreditCard className="w-4 h-4" /> PVC Cards
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <History className="w-4 h-4" /> Order History
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="w-4 h-4" /> Settings
            </Button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* TOP BAR */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-8">
          <div className="relative w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search orders..." className="pl-8 bg-muted/50" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>

      


          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-8 w-8 cursor-pointer rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center font-bold text-sm">{dp}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={async()=>{await logOUt()
          logout()
          navigate("/login")

          }}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* WELCOME & QUICK ACTIONS */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
              <p className="text-muted-foreground">Here’s what’s happening with your prints today.</p>
            </div>
            <div className="flex gap-3">
              <Button className="gap-2"><Plus className="w-4 h-4" /> New T-Shirt</Button>
              <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> New PVC Card</Button>
            </div>
          </div>

          {/* STATS OVERVIEW */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Prints</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">148</div>
                <p className="text-xs text-muted-foreground">Total lifetime prints</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Account Credits</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$240.50</div>
                <Button variant="link" className="p-0 h-auto text-xs">Top up balance</Button>
              </CardContent>
            </Card>
          </div>

          {/* RECENT ORDERS TABLE */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track the live status of your current printing jobs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#ORD-7721</TableCell>
                    <TableCell>Cotton T-Shirt (XL)</TableCell>
                    <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Printing</Badge></TableCell>
                    <TableCell>Feb 17, 2026</TableCell>
                    <TableCell className="text-right">$24.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#ORD-7719</TableCell>
                    <TableCell>NFC PVC Card</TableCell>
                    <TableCell><Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">In Queue</Badge></TableCell>
                    <TableCell>Feb 16, 2026</TableCell>
                    <TableCell className="text-right">$12.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#ORD-7710</TableCell>
                    <TableCell>Staff ID Card (Batch of 5)</TableCell>
                    <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Shipped</Badge></TableCell>
                    <TableCell>Feb 14, 2026</TableCell>
                    <TableCell className="text-right">$45.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}