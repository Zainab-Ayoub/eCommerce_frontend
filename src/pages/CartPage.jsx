import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Message from '../components/Message'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Message>Your cart is empty. <Link to="/" className="text-blue-600 underline">Go Shopping</Link></Message>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b dark:border-gray-700 pb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="text-sm font-medium text-blue-500 hover:underline line-clamp-2">
                  {item.name}
                </Link>
              </div>
              <div className="text-sm font-bold text-gray-800 dark:text-white">${item.price}</div>
              <select
                value={item.qty}
                onChange={e => updateQty(item.id, Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-2 py-1 text-sm focus:outline-none"
              >
                {Array.from({ length: Math.min(item.countInStock, 10) }, (_, i) => i + 1).map(x => (
                  <option key={x} value={x}>{x}</option>
                ))}
              </select>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border dark:border-gray-700 dark:bg-gray-800 rounded p-4 space-y-3 self-start">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
            Subtotal ({cartItems.reduce((a, x) => a + x.qty, 0)} items)
          </h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</p>
          <button
            onClick={() => alert('Checkout coming soon!')}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded text-sm"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}