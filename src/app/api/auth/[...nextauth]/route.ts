import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/lib/db'
import Admin from '@/models/Admin'
import bcrypt from 'bcryptjs'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required')
        }

        await dbConnect()

        const admin = await Admin.findOne({ username: credentials.username })

        if (!admin) {
          throw new Error('Invalid credentials')
        }

        if (admin.isLocked()) {
          throw new Error('Account is locked. Please try again later.')
        }

        const isValid = await bcrypt.compare(credentials.password, admin.passwordHash)

        if (!isValid) {
          await admin.incrementFailedAttempts()
          throw new Error('Invalid credentials')
        }

        await admin.resetFailedAttempts()

        return {
          id: admin._id.toString(),
          name: admin.username,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
