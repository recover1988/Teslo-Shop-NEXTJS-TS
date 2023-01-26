import { AuthLayout } from '../../components/layouts'
import { Box, Grid, Typography, TextField, Button, Link, Chip, Divider } from '@mui/material';
import { GetServerSideProps } from 'next'
import { getSession, getProviders } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { validations } from '../../utils';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import NextLink from 'next/link';
import React, { useState, useEffect } from 'react'


type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter()

    // const { isLoggedIn, loginUser, user } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)

    const [providers, setProviders] = useState<any>({})

    useEffect(() => {
        getProviders()
            .then(prov => {
                setProviders(prov)
            })
    }, [])


    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)
        // const isValidLogin = await loginUser(email, password)

        // if (!isValidLogin) {
        //     setShowError(true)
        //     setTimeout(() => setShowError(false), 3000); // se muestra en error CHIP y 3 segundo despues se oculta
        //     return
        // }
        // const destination = router.query.p?.toString() || '/'; // obtenemos el url
        // router.replace(destination)
        await signIn('credentials', { email, password }) // en esta funcion solo estan permitidos los provider que se definieron en la pagina de [...auth].ts
        // este codigo de next-auth es el que realiza toda la autentificacion
    }



    return (
        <AuthLayout title={'Ingresar'} >
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography variant='h1' component='h1' >Iniciar Sesión</Typography>

                            <Chip
                                label='No reconocemos ese usuario / contraseña'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }} //el ternario con la condicion para q se oculte o aparesca
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                type='email'
                                label='Correo'
                                variant='filled'
                                fullWidth
                                {
                                ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: (val) => validations.isEmail(val)  // tambien se puede escribir validations.isEmail
                                })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color='secondary'
                                className='circular-btn'
                                size='large'
                                fullWidth
                                type='submit'
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end' >
                            <NextLink
                                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                                passHref
                                legacyBehavior
                            >
                                <Link underline='always' >
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end' >
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {

                                    if (provider.id === 'credentials') return (<div key='credentials'></div>)

                                    return (
                                        <Button
                                            key={provider.id}
                                            variant='outlined'
                                            fullWidth
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>


                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req })
    const { p = '/' } = query // puede marcar error pq puede ser un arreglo por eso le pones toString()

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: {}
    }
}

export default LoginPage