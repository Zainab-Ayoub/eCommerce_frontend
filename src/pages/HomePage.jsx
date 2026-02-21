import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('search') || ''

  const filtered = keyword
    ? products.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.category.toLowerCase().includes(keyword.toLowerCase()) ||
        p.brand.toLowerCase().includes(keyword.toLowerCase())
      )
    : products

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchBar />

      {keyword && (
        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} result(s) for "<strong>{keyword}</strong>"
        </p>
      )}

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {keyword ? 'Search Results' : 'Latest Products'}
      </h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
