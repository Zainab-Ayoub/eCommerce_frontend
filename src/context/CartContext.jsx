import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems')
    return saved ? JSON.parse(saved) : []
  })

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, qty) {
    const exists = cartItems.find(x => x.id === product.id)
    if (exists) {
      setCartItems(cartItems.map(x => x.id === product.id ? { ...x, qty } : x))
    } else {
      setCartItems([...cartItems, { ...product, qty }])
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter(x => x.id !== id))
  }

  function updateQty(id, qty) {
    setCartItems(cartItems.map(x => x.id === id ? { ...x, qty } : x))
  }

  const cartCount = cartItems.reduce((a, x) => a + x.qty, 0)
  const cartTotal = cartItems.reduce((a, x) => a + x.price * x.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, cartCount, cartTotal, darkMode, setDarkMode }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
