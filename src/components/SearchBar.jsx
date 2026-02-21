import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/?search=${keyword.trim()}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded px-3 py-2 text-sm flex-1 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded text-sm">
        Search
      </button>
    </form>
  )
}