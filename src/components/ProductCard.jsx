import { Link } from 'react-router-dom'
import Rating from './Rating'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-3">
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 line-clamp-2 block mb-2">
          {product.name}
        </Link>
        <Rating value={product.rating} />
        <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">${product.price}</p>
      </div>
    </div>
  )
}
