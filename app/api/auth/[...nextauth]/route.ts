import NextAuth, { AuthOptions } from 'next-auth'; // Import AuthOptions
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb'; // Your MongoDB connection promise
import User from '@/lib/models/user.model'; // Your User model
import bcrypt from 'bcrypt';
import { Adapter } from 'next-auth/adapters';
import { connectToDB } from '@/lib/mongoose'; // <-- 1. IMPORT YOUR MONGOOSE CONNECT UTIL

export const authOptions: AuthOptions = { // <-- 2. ADD AuthOptions TYPE
  // 1. Use the MongoDB Adapter to store users and sessions
  adapter: MongoDBAdapter(clientPromise) as Adapter,

  // 2. Configure JWT sessions
  session: {
    strategy: 'jwt' as const,
  },

  // 3. Add the "Credentials" (password) provider
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // This is the core login logic
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        // --- 3. CONNECT TO MONGOOSE ---
        // You MUST connect to Mongoose here before using a model
        await connectToDB();
        // -----------------------------

        const user = await User.findOne({ email: credentials.email });

        // If no user found
        if (!user || !user.password) {
          throw new Error('No user found');
        }

        // Compare the submitted password with the *hashed* password in the DB
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error('Invalid password');
        }

        // If everything is correct, return the user
        // This 'user' object is a Mongoose document
        return user;
      },
    }),
  ],

  // 4. Define callbacks for the JWT
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 'user' here is the Mongoose doc from authorize()
        // The types from next-auth.d.ts will merge with this
        token.id = user.id;
        
        // --- 4. ADD ENROLLMENTS TO TOKEN ---
        token.enrollments = user.enrollments;
        // -----------------------------------
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        // 'token' has the properties from the jwt callback
        session.user.id = token.id;
        
        // --- 5. ADD ENROLLMENTS TO SESSION ---
        session.user.enrollments = token.enrollments;
        // -------------------------------------
      }
      return session;
    },
  },

  // 5. Define your sign-in, sign-up pages (optional)
  pages: {
    signIn: '/login', // Create a custom login page at app/login
    // error: '/auth/error', // Custom error page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };