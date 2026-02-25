import connectDB from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// ====================
// NextAuth Options
// ====================
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // ---------- Credentials Provider ----------
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        // find user in DB
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // compare hashed password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        // login success
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
          role: user.role,
        };
      },
    }),

    // ---------- Google Provider ----------
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ====================
  // Callbacks
  // ====================
  callbacks: {
    // ---------- signIn ----------
    async signIn({ user, account, profile }) {
      await connectDB();

      if (!account) return false;

      // Google login
      if (account.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // create new Google user
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            providerId: profile?.sub,
            // role omitted → Mongoose default "user" auto applied
          });

          // attach role to user object so JWT callback sees it
          user.role = newUser.role;
        } else {
          // existing user → attach role
          user.role = existingUser.role;
        }
      }

      return true;
    },

    // ---------- JWT ----------
    async jwt({ token, user }) {
      if (user) {
        // Credentials login or Google login
        token.role = user.role;
      }
      return token;
    },

    // ---------- Session ----------
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  // ====================
  // Custom pages
  // ====================
  pages: {
    signIn: "/login",
  },
};

// ====================
// Export NextAuth handler
// ====================
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };