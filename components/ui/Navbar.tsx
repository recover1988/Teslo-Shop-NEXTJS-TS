import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'

import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UIContext } from '../../context'

export const Navbar = () => {

    // const router = useRouter()
    // function isIn(d: string) {
    //     return router.asPath.includes(d)
    // }
    // <Button color={isIn('men') ? 'primary' : 'info'} >Hombres</Button>
    const { asPath } = useRouter()

    const { isMenuOpen, toggleSideMenu } = useContext(UIContext)

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref legacyBehavior >
                    <Link display='flex' alignItems='center' >
                        <Typography variant='h6' >Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                    </Link>
                </NextLink>
                {/* TODO: flex */}
                <Box flex={1} />
                {/* MaterialUi el Box>sx nos permite tener el display condicional para pantallas pequeñas xs:'none' para pantallas mas grandes ms:'block'*/}
                <Box sx={{ display: { xs: 'none', sm: 'block' } }} >
                    <NextLink href='/category/men' passHref legacyBehavior >
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'} >Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior >
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'} >Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref legacyBehavior >
                        <Link>
                            <Button color={asPath === '/category/kid' ? 'primary' : 'info'} >Niños</Button>
                        </Link>
                    </NextLink>
                </Box>


                {/* TODO: flex */}
                <Box flex={1} />
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <NextLink href='/cart' passHref legacyBehavior >
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary' >
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toggleSideMenu} >
                    Menú
                </Button>

            </Toolbar>
        </AppBar >
    )
}

