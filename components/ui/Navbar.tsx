import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'

import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

export const Navbar = () => {
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
                <Box sx={{ display: { xs: 'none', ms: 'block' } }} >
                    <NextLink href='/category/men' passHref legacyBehavior >
                        <Link>
                            <Button>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior >
                        <Link>
                            <Button>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref legacyBehavior >
                        <Link>
                            <Button>Niños</Button>
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

                <Button>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}

