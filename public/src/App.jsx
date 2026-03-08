import { User } from "lucide-react"
import LandingPage from "./components/custom/homepage"
import LoginCard from "./components/custom/login"
import { BrowserRouter, Route, Routes ,useRoutes} from "react-router-dom"
import UserDashboard from "./components/custom/userDashboard"
import SignUpPage from "./components/custom/signUp"
import Shop from "./components/custom/shop"
import Navbar from "./components/custom/navbar"

function AppContent() {
  const routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginCard /> },
    {"path": "/register", "element": <SignUpPage /> },
    {path: "/dashboard", element: <UserDashboard /> },
    {path:"/shop",element:<Shop />},
    {path:"/nav",element:<Navbar />}
  ])
  return routes
}

function App() {


  return (
  <BrowserRouter>
    <AppContent/>
  </BrowserRouter>
  )
 
}

export default App
