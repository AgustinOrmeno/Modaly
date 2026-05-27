# Modaly - Buscador de ropa en Argentina

## Descripción
Web app que permite buscar prendas de ropa en múltiples tiendas de Argentina y comparar precios. El usuario busca por nombre o descripción y ve los resultados con foto, precio y link directo a la tienda.

## Stack
- **Frontend/Backend**: Next.js 15 + TypeScript
- **Estilos**: Tailwind CSS
- **Deploy**: Vercel (pendiente)

## Estado actual del proyecto
- [x] Página principal con buscador (`app/page.tsx`)
- [x] Página de resultados (`app/search/page.tsx`)
- [x] Componente ProductCard (`components/ProductCard.tsx`)
- [x] Endpoint API de búsqueda (`app/api/search/route.ts`)
- [ ] **PENDIENTE**: API de MercadoLibre devuelve 403 - necesita credenciales de desarrollador
- [ ] Scrapers de Zara y Tienda Nube
- [ ] Filtros por precio y tienda
- [ ] Deploy en Vercel

## Problema actual
La API de MercadoLibre (`https://api.mercadolibre.com/sites/MLA/search`) devuelve 403 tanto desde el servidor como desde el navegador. Se necesita:
1. Crear app en https://developers.mercadolibre.com.ar
2. Obtener APP_ID y SECRET_KEY
3. Configurar autenticación en `app/api/search/route.ts`

## Roadmap
### Fase 1 - Setup ✅
### Fase 2 - MercadoLibre API 🔄 (en progreso)
### Fase 3 - Scrapers (Zara, Tienda Nube)
### Fase 4 - Filtros
### Fase 5 - Diseño y UI
### Fase 6 - Deploy en Vercel

## Comandos útiles
```bash
npm run dev      # Servidor local en localhost:3000
git add . && git commit -m "mensaje" && git push
```

## Repo
https://github.com/AgustinOrmeno/Modaly
