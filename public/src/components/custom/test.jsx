import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProductCard({ product }) {
const navigate = useNavigate()

const discount =
product.oldPrice
? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
: 0

const outOfStock = product.stock === 0

return ( <Card className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-zinc-900 hover:shadow-2xl transition-all duration-300">


  {/* IMAGE */}
  <div
    onClick={() => navigate(`/product/${product._id}`)}
    className="relative aspect-square overflow-hidden cursor-pointer bg-muted"
  >
    <img
      src={product.images?.[0]}
      alt={product.name}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Discount ribbon */}
    {discount > 0 && (
      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
        {discount}% OFF
      </div>
    )}

    {/* Out of stock overlay */}
    {outOfStock && (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
        Out of Stock
      </div>
    )}
  </div>

  {/* CONTENT */}
  <div className="p-4 space-y-2">

    {/* Category */}
    <p className="text-xs uppercase tracking-wide text-muted-foreground">
      {product.category}
    </p>

    {/* Name */}
    <h3
      onClick={() => navigate(`/product/${product._id}`)}
      className="font-semibold text-base leading-tight line-clamp-2 cursor-pointer hover:text-primary transition"
    >
      {product.name}
    </h3>

    {/* Rating */}
    <div className="flex items-center gap-1 text-yellow-500">
      <Star className="h-4 w-4 fill-yellow-400" />
      <Star className="h-4 w-4 fill-yellow-400" />
      <Star className="h-4 w-4 fill-yellow-400" />
      <Star className="h-4 w-4 fill-yellow-400" />
      <Star className="h-4 w-4 text-gray-300" />
      <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
    </div>

    {/* Price */}
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold text-primary">
        ₹{product.price}
      </span>

      {product.oldPrice && (
        <span className="text-sm line-through text-muted-foreground">
          ₹{product.oldPrice}
        </span>
      )}
    </div>

    {/* Buttons */}
    <div className="flex gap-2 pt-2">

      {/* Add to Cart */}
      <Button
        disabled={outOfStock}
        variant="outline"
        className="flex-1"
        onClick={(e) => {
          e.stopPropagation()
          alert("Add to cart — connect cart context")
        }}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart
      </Button>

      {/* BUY NOW */}
      <Button
        disabled={outOfStock}
        className="flex-1"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/checkout/${product._id}`)
        }}
      >
        <Zap className="h-4 w-4 mr-2" />
        Buy Now
      </Button>

    </div>
  </div>
</Card>


)
}
