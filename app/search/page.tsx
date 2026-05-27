'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

type Product = {
  id: string
  title: string
  price: number
  currency: string
  image: string
  link: string
  store: string
  condition: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return
    setLoading(true)
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}&limit=20`)
      .then(res => res.json())
      .then(data => {
        const mapped = (data.results || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          currency: item.currency_id,
          image: item.thumbnail?.replace('I.jpg', 'O.jpg'),
          link: item.permalink,
          store: 'MercadoLibre',
          condition: item.condition === 'new' ? 'Nuevo' : 'Usado',
        }))
        setProducts(mapped)
      })
      .finally(() => setLoading(false))
  }, [query])

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>Modaly</h1>
        </a>

        <form action="/search" method="get" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          <input
            name="q"
            type="text"
            defaultValue={query}
            placeholder="Buscá una prenda..."
            style={{
              flex: 1,
              padding: '0.8rem 1.2rem',
              fontSize: '1rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              maxWidth: '600px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.8rem 1.5rem',
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Buscar
          </button>
        </form>

        {loading && (
          <p style={{ color: '#666', textAlign: 'center', marginTop: '4rem' }}>Buscando...</p>
        )}

        {!loading && query && (
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            {products.length} resultados para <strong>"{query}"</strong>
          </p>
        )}

        {!loading && products.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && query && (
          <p style={{ color: '#999', textAlign: 'center', marginTop: '4rem' }}>
            No se encontraron resultados para "{query}"
          </p>
        )}

      </div>
    </main>
  )
}
