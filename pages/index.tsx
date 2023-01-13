import { ShopLayout } from '../components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '../components/products/ProductList';
import { useProducts } from '../hooks';



export default function HomePage() {

  const { products, isLoading, isError } = useProducts('/products')

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Enuentra los mejores productos en Teslo Shop'} >
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>
      {
        isLoading
          ? <h1>Cargando</h1>
          : <ProductList products={products} />
      }
    </ShopLayout>


  )
}
