import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Printer, Shirt, Contact2, Zap, ShieldCheck, 
  ArrowRight, Upload, Palette, Truck, Star, Check 
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Navbar from "./navbar" // Your reusable navbar

export default function LandingPage() {
  const navigate = useNavigate()
  const user = null; // Replace with your actual auth context/state

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="px-8 pt-32 pb-20 lg:pt-48 lg:pb-32 max-w-7xl mx-auto text-center">
        <Badge variant="secondary" className="mb-4 px-4 py-1 rounded-full animate-pulse">
          ⚡ Instant Custom Printing in India
        </Badge>
        <h1 className="text-5xl lg:text-8xl font-extrabold tracking-tighter mb-6">
          Your Designs, <span className="text-primary italic">Printed Live.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          High-quality custom apparel and PVC card printing at your fingertips. 
          Upload, preview, and get it delivered—faster than ever.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="h-12 px-8 text-lg group" onClick={() => navigate("/dashboard")}>
            Start Designing <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg">View Catalog</Button>
        </div>
      </section>

      {/* Process Section - HOW IT WORKS */}
      <section id="how-it-works" className="px-8 py-20 border-y bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-16">Three simple steps to your custom product.</p>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              { icon: Upload, title: "1. Upload Design", desc: "Drop your PNG, JPG, or SVG. Our AI checks the resolution automatically." },
              { icon: Palette, title: "2. Live Preview", desc: "Use our 3D customizer to position your design on shirts or smart cards." },
              { icon: Truck, title: "3. Fast Delivery", desc: "We print within 24 hours and ship your products with express tracking." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="bg-primary/10 p-6 rounded-2xl mb-6">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-2">Specialized Surfaces</h2>
              <p className="text-muted-foreground">Industrial grade printing on high-quality materials.</p>
            </div>
            <Button variant="link" className="text-primary font-bold">See all products →</Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* T-Shirt Card */}
            <Card className="group overflow-hidden border-2 hover:border-primary transition-all">
              <CardHeader className="pb-0">
                <Shirt className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-3xl">Premium Apparel</CardTitle>
                <CardDescription>Cotton, Polyester & Blends</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> DTF & Screen Printing</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Vibrant, No-Fade Colors</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> All Sizes (S-XXL)</li>
                </ul>
                <Button className="w-full">Select Apparel</Button>
              </CardContent>
            </Card>

            {/* PVC Card */}
            <Card className="group overflow-hidden border-2 hover:border-primary transition-all">
              <CardHeader className="pb-0">
                <Contact2 className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-3xl">PVC & ID Cards</CardTitle>
                <CardDescription>High-Durability Plastic Cards</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> NFC & Smart Chips Ready</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Double-Sided HD Print</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Waterproof & Scratch-Resistant</li>
                </ul>
                <Button className="w-full" variant="outline">Select Card Type</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-8 py-24 bg-muted/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-muted-foreground mb-16">No hidden setup fees. Volume discounts apply automatically.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-background relative overflow-hidden">
               <div className="p-8">
                  <h3 className="font-bold text-xl mb-2">Apparel Printing</h3>
                  <div className="text-4xl font-bold mb-4">₹499<span className="text-lg text-muted-foreground font-normal">/unit</span></div>
                  <p className="text-sm text-muted-foreground mb-6">Includes premium T-shirt + Front print</p>
                  <Button className="w-full" variant="secondary">Get Started</Button>
               </div>
            </Card>
            <Card className="bg-background border-primary">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-bold">BEST VALUE</div>
               <div className="p-8">
                  <h3 className="font-bold text-xl mb-2">PVC Smart Cards</h3>
                  <div className="text-4xl font-bold mb-4">₹149<span className="text-lg text-muted-foreground font-normal">/unit</span></div>
                  <p className="text-sm text-muted-foreground mb-6">Includes NFC encoding + HD Lamination</p>
                  <Button className="w-full">Get Started</Button>
               </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Printer className="w-5 h-5" /> Print Live
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Shipping Info</a>
          </div>
          <p>© 2026 Print Live Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}