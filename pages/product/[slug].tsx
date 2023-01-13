import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ProductSlideshow } from '../../components/products/ProductSlideshow';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { SizeSelector } from '../../components/products/SizeSelector';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {


  // Esta es una forma de traer los elementos 
  // No se recomienda hacerlo de esta manera por el SEO ya que los bots de google solo encontrarian un Cargando y no ayudaria a posiciar los productos
  //   const router = useRouter()
  //   const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`)

  // if(isLoading){
  //   return <h1>Cargando</h1>
  // }
  // if(!product){
  //   return <h1>No existe el producto</h1>
  // }


  return (
    <ShopLayout title={product.title} pageDescription={product.description} >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={7} >

          {/* Slideshow */}
          <ProductSlideshow images={product.images} />

        </Grid>
        <Grid item xs={12} sm={5} >
          <Box display='flex' flexDirection='column' >
            {/* Titulos */}
            <Typography variant='h1' component='h1' >{product.title}</Typography>
            <Typography variant='subtitle1' component='h2' >{`$${product.price}`}</Typography>
            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'  >Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>
            {/* Agregar al carrito */}
            <Button color='secondary' className='circular-btn' >
              Agregar al Carrito
            </Button>

            {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

            {/* Descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2' >Descripcion</Typography>
              <Typography variant='body2' >{product.description}</Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

// getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// * No usar esto SSR

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string }
//   const product = await dbProducts.getProductBySlug(slug) // your fetch function here 

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',   // redirigir si la pagina no existe
//         permanent: false    // para que no bloque la url y en algun momento poder usarla
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// getStaticPath

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data = await dbProducts.getAllProductSlugs() // your fetch function here 
  const slugs: string[] = data.map((obj: dbProducts.ProductSlug) => obj.slug)

  return {
    paths: slugs.map(slug => ({
      params: { slug }
    })),
    fallback: "blocking"
  }
};
// getStaticProps
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  };
  return {
    props: {
      product
    },
    revalidate: 86400,
  }
};


export default ProductPage
