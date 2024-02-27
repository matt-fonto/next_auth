import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { User, mockUsers } from "./db/mockData";

async function getUser(email: string): Promise<User | null> {
  return mockUsers.find((user) => user.email === email) ?? null;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUser(email);

        if (user && user.password === password) {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } else {
          return null;
        }
      },
    }),
  ],
});
