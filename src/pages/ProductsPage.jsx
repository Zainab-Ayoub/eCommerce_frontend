import { useState } from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
        >
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
