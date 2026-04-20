import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { UserModel } from "./models/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        await connectDB();

        // Find user by username in MongoDB (case-insensitive)
        const user = await UserModel.findOne({
          username: { $regex: new RegExp(`^${credentials.username}$`, "i") }
        }).exec();

        if (!user) {
          return null;
        }

        // Check password against passwordHash
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          username: user.username,
          displayName: user.displayName
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.displayName = (user as any).displayName;
      }
      if (trigger === "update" && session?.displayName) {
        token.displayName = session.displayName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          username: token.username as string,
          displayName: token.displayName as string,
        } as any;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
};
