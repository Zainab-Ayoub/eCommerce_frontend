import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-white">
        ProShop
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/products" className="hover:text-gray-300 text-sm">
          Shop
        </Link>
        <Link to="/cart" className="hover:text-gray-300 text-sm flex items-center gap-1">
          🛒 Cart
          {totalItems > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        <Link to="/login" className="hover:text-gray-300 text-sm">
          Sign In
        </Link>
      </div>
    </nav>
  )
}
