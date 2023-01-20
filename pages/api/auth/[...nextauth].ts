import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}   

export const authOptions: NextAuthOptions = {
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
  jwt: {

  },

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {

      if (account) {
        token.accessToken = account.access_token

        switch (account.type) {

          case "oauth":
          case "email":
            //TODO: crear usuario o verificar si existe en mi DB  
            break
          case "credentials":
            token.user = user
            break

        }
      }

      return token
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any


      return session
    }
  }
}
export default NextAuth(authOptions)