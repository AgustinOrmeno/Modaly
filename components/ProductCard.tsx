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

export default function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', background: '#f9f9f9' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div style={{ padding: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.3rem' }}>
          {product.store} · {product.condition}
        </p>
        <p style={{
          fontSize: '0.95rem',
          fontWeight: 500,
          marginBottom: '0.5rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.title}
        </p>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {formattedPrice}
        </p>
      </div>
    </a>
  )
}
