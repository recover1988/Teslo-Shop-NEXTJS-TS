import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';


const CategoryWomenPage = () => {
      const { products, isLoading, isError } = useProducts('/products?gender=women')
  return (
        <ShopLayout title={'Teslo-Shop - Categoria de Mujeres'} pageDescription={'Los mejores productos para Mujeres'} >
      <Typography variant='h1' component='h1' >Mujeres</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Productos para ellas</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default CategoryWomenPage