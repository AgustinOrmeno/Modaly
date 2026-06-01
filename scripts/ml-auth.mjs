import { createInterface } from 'readline'

const APP_ID = '3984605951478701'
const SECRET_KEY = 'qjKCs6J8eK4iYxDmR2mHh6qizjto1NCd'
const REDIRECT_URI = 'https://modaly.vercel.app'

const authUrl = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`

console.log('\n=== PASO 1: Visitá esta URL en tu navegador ===')
console.log(authUrl)
console.log('\nCuando ML te redirija a modaly.vercel.app, la página no va a existir.')
console.log('Copiá el valor del parámetro "code" de la URL (ej: TG-abc123...).\n')

const rl = createInterface({ input: process.stdin, output: process.stdout })

rl.question('Pegá el código acá: ', async (code) => {
  rl.close()
  code = code.trim()

  console.log('\nIntercambiando código por tokens...')

  const res = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: APP_ID,
      client_secret: SECRET_KEY,
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const data = await res.json()

  if (data.error) {
    console.error('\nError:', data.error, '-', data.message)
    return
  }

  console.log('\n=== PASO 2: Copiá estas líneas en tu .env.local ===\n')
  console.log(`ML_ACCESS_TOKEN=${data.access_token}`)
  console.log(`ML_REFRESH_TOKEN=${data.refresh_token}`)
  console.log('\n(Reemplazá las líneas ML_APP_ID y ML_SECRET_KEY existentes, o agregalas abajo)')
})
