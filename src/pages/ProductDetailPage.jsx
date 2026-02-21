import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import Rating from '../components/Rating'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { addToCart } = useCart()

  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div>
        <p className="text-red-500">Product not found.</p>
        <Link to="/products" className="text-blue-600 hover:underline">Go back</Link>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <Link to="/products" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Image */}
        <div className="md:col-span-1">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow" />
        </div>

        {/* Info */}
        <div className="md:col-span-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{product.name}</h1>
          <hr className="mb-3" />
          <Rating value={product.rating} numReviews={product.numReviews} />
          <hr className="my-3" />
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Price: ${product.price}</p>
          <hr className="mb-3" />
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>

        {/* Add to cart box */}
        <div className="md:col-span-1">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4">
            <div className="flex justify-between mb-3">
              <span className="font-medium">Price:</span>
              <span className="font-bold">${product.price}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-medium">Status:</span>
              <span className="text-green-600">In Stock</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <label className="font-medium">Qty:</label>
              <select
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 text-sm font-medium"
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
