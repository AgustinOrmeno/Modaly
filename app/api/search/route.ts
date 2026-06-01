import { NextRequest, NextResponse } from 'next/server'

function getAccessToken(): string {
  const token = process.env.ML_ACCESS_TOKEN
  if (!token) throw new Error('ML_ACCESS_TOKEN no configurado en .env.local')
  return token
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Falta el parámetro de búsqueda' }, { status: 400 })
  }

  try {
    const token = await getAccessToken()
    console.log('Token obtenido OK, primeros 20 chars:', token.slice(0, 20))

    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}&limit=20`
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    })

    const data = await res.json()
    console.log('ML search status:', res.status)
    console.log('ML search response:', JSON.stringify(data).slice(0, 300))

    if (!data.results) {
      console.log('Sin resultados, respuesta completa:', JSON.stringify(data))
      return NextResponse.json({ products: [] })
    }

    const products = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      currency: item.currency_id,
      image: item.thumbnail?.replace('I.jpg', 'O.jpg'),
      link: item.permalink,
      store: 'MercadoLibre',
      condition: item.condition === 'new' ? 'Nuevo' : 'Usado',
    }))

    return NextResponse.json({ products })
  } catch (error) {
    console.log('Error completo:', error)
    return NextResponse.json({ error: 'Error al buscar productos' }, { status: 500 })
  }
}
