import type { AppProps } from 'next/app'
import { UIProvider, CartProvider } from '../context'
import { SWRConfig } from 'swr'
import { lightTheme } from '../themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000, para que se reacrgue la consulta(refrescar)
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </CartProvider>
    </SWRConfig>

  )
}
