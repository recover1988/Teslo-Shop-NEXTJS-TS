import { Inter } from '@next/font/google'
import { ShopLayout } from '../components/layouts'
import { Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Enuentra los mejores productos en Teslo Shop'} >
       <Typography variant='h1' component='h1' >Tienda</Typography>
       <Typography variant='h2' sx={{mb:1}} >Todos los productos</Typography>
    </ShopLayout>
  

  )
}
