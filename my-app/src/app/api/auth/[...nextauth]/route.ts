import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

type providerState = {
    clientId: string,
    clientSecret: string
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    } as providerState)
  ],
  pages: {
    signIn: '/account/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
