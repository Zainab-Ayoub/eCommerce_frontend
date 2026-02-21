import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import Rating from '../components/Rating'
import Message from '../components/Message'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Message type="danger">Product not found.</Message>
        <Link to="/" className="text-blue-600 text-sm mt-4 block">Go Back</Link>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart(product, qty)
    navigate('/cart')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Link to="/" className="text-blue-600 text-sm hover:underline">&larr; Go Back</Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image */}
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded" />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <div className="border-t border-b py-2">
            <Rating value={product.rating} numReviews={product.numReviews} />
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2">Price: ${product.price}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 border-b pb-2">{product.description}</p>
        </div>

        {/* Add to Cart box */}
        <div className="border dark:border-gray-700 rounded p-4 space-y-3 self-start">
          <div className="flex justify-between text-sm border-b pb-2">
            <span className="text-gray-600 dark:text-gray-400">Price:</span>
            <span className="font-bold dark:text-white">${product.price}</span>
          </div>
          <div className="flex justify-between text-sm border-b pb-2">
            <span className="text-gray-600">Status:</span>
            <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {product.countInStock > 0 && (
            <div className="flex justify-between text-sm border-b pb-2 items-center">
              <span className="text-gray-600">Qty:</span>
              <select
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
              >
                {Array.from({ length: Math.min(product.countInStock, 10) }, (_, i) => i + 1).map(x => (
                  <option key={x} value={x}>{x}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-medium py-2 rounded text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
