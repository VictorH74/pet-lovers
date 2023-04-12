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
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Julio@example.com",
        },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        const user = await UserService.getUserByEmail(email);

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // If no error and we have user data, return it
        if (isPasswordCorrect) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
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

      if (token.sub) {
        const retrievedUser = await UserService.getUserByEmail(token.email);

        if (retrievedUser) {
          return jwt.sign({...token, ...retrievedUser }, secret);
        }

        if (!token.name || !token.email) throw new Error("email from token not defined");

        let {name, email} = token

        const createdUser = await UserService.createUser({
          name,
          email,
        });
        return jwt.sign({ ...token,  ...createdUser }, secret);
      } else {
        const user = await UserService.getUserByEmail(token.email);

        return jwt.sign(
          { id: user?.id, name: user?.name, email: user?.email },
          secret
        );
      }
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
