import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { UIProvider, CartProvider, AuthProvider } from '../context'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider >
      <PayPalScriptProvider options={{'client-id':process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
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
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
