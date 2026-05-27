import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Falta el parámetro de búsqueda' }, { status: 400 })
  }

  try {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}&limit=20`
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 }
    })

    const data = await res.json()
    console.log('ML API status:', res.status)
    console.log('ML API keys:', Object.keys(data))
    console.log('ML API results count:', data.results?.length)

    if (!data.results) {
      console.log('ML API error:', JSON.stringify(data))
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
