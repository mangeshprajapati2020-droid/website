import { useEffect, useState } from "react"

import ProductCard from "./test"

export default function Shop() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts([{
  _id: "65f2d1f12",
  name: "Custom Printed T-Shirt",
  category: "T-Shirt",
  price: 299,
  oldPrice: 499,
  images: [
    "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  ]
},{
  _id: "65f2d1f1",
  name: "Custom Printed T-Shirt",
  category: "T-Shirt",
  price: 299,
  oldPrice: 499,
  images: [
    "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  ]
},{
  _id: "65f21f12",
  name: "Custom Printed T-Shirt",
  category: "T-Shirt",
  price: 299,
  oldPrice: 499,
  images: [
    "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  ]
}]) // Clear products before fetching new ones
  }, [])

  return (
    <div className="container py-10">

      <h1 className="text-3xl font-bold mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  )
}
