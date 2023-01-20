import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'
export const authOptions = {
  // Configure one or more authentication providers
  // Para cambiar el orden simplemente movemos la credenciales de orden
  providers: [
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { lable: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
        password: { lable: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
      },
      //esta funcion tiene que devolver un null si falla o un objeto si esta todo bien
      async authorize(credentials, req) {
        //todo: validar contra base de datos
        return null
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

  ],

  // Callbacks
  callbacks: {

  }
}
export default NextAuth(authOptions)