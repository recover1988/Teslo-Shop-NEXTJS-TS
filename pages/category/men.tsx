import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';


const CategoryMenPage = () => {
    const { products, isLoading, isError } = useProducts('/products?gender=men')
    return (
        <ShopLayout title={'Teslo-Shop - Categoria de Hombres'} pageDescription={'Los mejores productos para Hombres'} >
            <Typography variant='h1' component='h1' >Hombres</Typography>
            <Typography variant='h2' sx={{ mb: 1 }} >Productos para ellos</Typography>
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default CategoryMenPage