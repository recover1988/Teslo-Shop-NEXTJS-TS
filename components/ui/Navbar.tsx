import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import ClearOutlined from '@mui/icons-material/ClearOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'

import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { UIContext, CartContext } from '../../context'

export const Navbar = () => {

    // const router = useRouter()
    // function isIn(d: string) {
    //     return router.asPath.includes(d)
    // }
    // <Button color={isIn('men') ? 'primary' : 'info'} >Hombres</Button>
    const { asPath, push } = useRouter()

    const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
    const { numberOfItems } = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`)
    }

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
                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className='fadeIn'
                >
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



                <Box flex={1} />


                {/* Pantallas Grandes */}
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                onClick={() => setIsSearchVisible(true)}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }


                {/* Pantallas Pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>


                <NextLink href='/cart' passHref legacyBehavior >
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary' >
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

