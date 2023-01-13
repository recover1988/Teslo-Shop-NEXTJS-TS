import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';


const CategoryKidPage = () => {
  const { products, isLoading, isError } = useProducts('/products?gender=kid')
  return (
    <ShopLayout title={'Teslo-Shop - Categoria de Niños'} pageDescription={'Los mejores productos para Niños'} >
      <Typography variant='h1' component='h1' >Niños</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Productos para Niños</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default CategoryKidPage