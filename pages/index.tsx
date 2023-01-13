import { ShopLayout } from '../components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '../components/products/ProductList';

import useSWR from 'swr'
const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export default function HomePage() {

  const { data, error, isLoading } = useSWR('/api/products', fetcher) // se puede poner useSWR('/api/products', fetcher,{refreshInterval:1000}) para que refresque cada 1 seg
  

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Enuentra los mejores productos en Teslo Shop'} >
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>

      <ProductList products={data} />

    </ShopLayout>


  )
}
