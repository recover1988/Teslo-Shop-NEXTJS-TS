import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { UIProvider, CartProvider, AuthProvider } from '../context'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000, para que se reacrgue la consulta(refrescar)
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>

  )
}
