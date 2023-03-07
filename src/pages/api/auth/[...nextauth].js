import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET

    }),

  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY
  },
  secret: process.env.NEXTAUTH_SECRET
 
})
