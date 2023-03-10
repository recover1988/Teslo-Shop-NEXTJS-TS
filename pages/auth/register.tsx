import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { validations } from '../../utils';
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

type FormData = {
    name: string;
    email: string;
    password: string;
}


const RegisterPage = () => {

    const { registerUser } = useContext(AuthContext)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [erroMessage, setErroMessage] = useState('')



    const onRegisterForm = async ({ email, name, password }: FormData) => {
        setShowError(false)
        const { hasError, message } = await registerUser(name, email, password)
        if (hasError) {
            setShowError(true)
            setErroMessage(message!)
            setTimeout(() => setShowError(false), 3000);
            return
        }
        // const destination = router.query.p?.toString() || '/';
        // router.replace(`${destination}`)
        await signIn('credentials', { email, password })
    }


    return (
        <AuthLayout title={'Registro'} >
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography variant='h1' component='h1' >Crear Cuenta</Typography>
                            <Chip
                                label='No se pudo registrar el usuario'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }} //el ternario con la condicion para q se oculte o aparesca
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                label='Nombre Completo'
                                variant='filled'
                                fullWidth
                                {
                                ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
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
                                label='Contrase??a'
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
                                Registrarse
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end' >
                            <NextLink
                                href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                                passHref
                                legacyBehavior
                            >
                                <Link underline='always' >
                                    ??Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


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

export default RegisterPage