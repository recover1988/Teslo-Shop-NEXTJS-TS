import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';



const SearchPage = () => {

    const { products, isLoading, isError } = useProducts('/search/cybertruck')

    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Enuentra los mejores productos en Teslo Shop'} >
            <Typography variant='h1' component='h1' >Buscar producto</Typography>
            <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}
export default SearchPage