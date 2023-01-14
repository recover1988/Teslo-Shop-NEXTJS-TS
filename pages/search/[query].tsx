import { GetServerSideProps, NextPage } from 'next'
import { ProductList } from '../../components/products/ProductList';
import { ShopLayout } from '../../components/layouts'
import { Box, Typography } from '@mui/material'
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { useProducts } from '../../hooks';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos en Teslo Shop'} >
            <Typography variant='h1' component='h1' >Buscar productos</Typography>

            {
                foundProducts
                    ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize' >Termino: {query}</Typography>
                    : (
                        <Box display='flex' >
                            <Typography variant='h2' sx={{ mb: 1 }} >No encontramos ningún producto</Typography>
                            <Typography variant='h2' sx={{ ml: 1 }} color='secondary' textTransform='capitalize' >{query}</Typography>
                        </Box>
                    )
            }




            <ProductList products={products} />

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string } // your fetch function here 
    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query)

    const foundProducts = products.length > 0

    //TODO: retornar otros productos
    if (!foundProducts) {
        // aca se puede cambiar products y buscar por alguna cosa que el usuario tenga guardado en la cookie
        products = await dbProducts.getAllProducts()
    }


    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage