import { connectToDatabase } from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        const ALL = await usersCollection
          .find({
            email: credentials?.email,
          })
          .toArray();
        console.log("ALL");
        console.log(ALL);

        const user = await usersCollection
          .find({
            email: credentials?.email,
          })
          .toArray();

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user[0].password
        );

        if (!passwordMatch) throw new Error("Wrong Password");
        console.log(user[0].email);
        return {
          id: user[0]._id.toString(),
          email: user[0].email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
  jwt: {
    secret: "process.env.NEXTAUTH_SECRET", // Make sure this is set in your .env file
  },
  pages: {
    signIn: "/login", // Optional: Custom sign-in page
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
  debug: true, // Optional: Enable debug logs in the console
  secret: "process.env.NEXTAUTH_SECRET",
};
