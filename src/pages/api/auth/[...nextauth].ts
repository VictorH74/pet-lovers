import NextAuth, { Session, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { UserService } from "@/services/user.service";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SECRET,
} from "@/utils/constants";

export const authOptions = {
  pages: {
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Login e senha",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Julio@example.com",
        },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("notEmailAndPassword");
        }

        const user = await UserService.getUserByEmail(email);

        if (!user || !user.password) {
          throw new Error("invalidEmail");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("invalidPassword");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    jwt: async ({ user, token }: { user: any; token: JWT }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: { strategy: "jwt" as SessionStrategy },
  jwt: {
    secret: SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryption: true,
    // encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    async encode({
      token,
      secret,
    }: {
      token?: JWT;
      secret: string | Buffer;
      maxAge?: number;
    }): Promise<string> {
      if (!token) throw new Error("token not defined");
      if (!token.email) throw new Error("email from token not defined");

      let payload: object = {};

      if (token.sub) {
        const retrievedUser = await UserService.getUserByEmail(token.email);

        if (retrievedUser) {
          return jwt.sign({ ...token, ...retrievedUser }, secret);
        }

        if (!token.name) throw new Error("name from token not defined");

        let { name, email, picture } = token;

        const createdUser = await UserService.createUser({
          image: (picture as string) || null,
          name,
          email,
        });
        payload = { ...token, ...createdUser };
      } else {
        const user = await UserService.getUserByEmail(token.email);
        payload = { id: user?.id, name: user?.name, email: user?.email };
      }

      return jwt.sign(payload, secret);
    },
    async decode({
      secret,
      token,
    }: {
      token?: string;
      secret: string | Buffer;
    }): Promise<JWT | null> {
      if (!token) throw new Error("token not defined");

      return jwt.verify(token, secret) as JWT;
    },
  },
};
export default NextAuth(authOptions);
