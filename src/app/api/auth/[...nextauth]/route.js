import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // This where Data Comes from the Login FORM Page
        console.log("credentials", credentials);

        // Instead of API call to Backend Server, I am Hard Coding it
        if (credentials.email === "test@gmail.com" && credentials.password === "123456") {
          return credentials;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn:"/login"
  }
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
