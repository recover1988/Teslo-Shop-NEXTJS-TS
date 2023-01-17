import { AuthLayout } from '../../components/layouts'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { tesloApi } from '../../api';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import NextLink from 'next/link';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter()

    const { isLoggedIn, loginUser, user } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false)



    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true)
            setTimeout(() => setShowError(false), 3000); // se muestra en error CHIP y 3 segundo despues se oculta
            return
        }
        // TODO: volver a la pantalla anterior
        const destination = router.query.p?.toString() || '/'; // obtenemos el url
        router.replace(destination)
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
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage