export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Modaly
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Buscá prendas en las principales tiendas de Argentina
      </p>
      <form action="/search" method="get" style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: '0.5rem' }}>
        <input
          name="q"
          type="text"
          placeholder="Ej: campera de cuero negra, vestido floral..."
          style={{
            flex: 1,
            padding: '0.9rem 1.2rem',
            fontSize: '1rem',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.9rem 1.5rem',
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
    </main>
  )
}
