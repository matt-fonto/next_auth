import { getUserRole } from "@/services/getUserRole";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkIfUserExists } from "@/services/checkIfUserExists";
import bcrypt from "bcrypt";

export const options: AuthOptions = {
  // To ensure the role is available through the application, we set the callbacks
  callbacks: {
    // called when JWT is created or updated
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.uid = user.id; // adding the user role to the token, so it's available in the server side
        const userEmail = user.email ?? profile?.email;
        token.role = getUserRole(userEmail ?? "");
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = String(token.id);
          session.user.role = token.role;
          session.user.email = token.email;
        }
      }

      return session;
    },

    async signIn({ user, profile, account }) {
      const payload = {
        name: user.name,
        email: user.email ?? profile?.email,
        password: "NO_PASSWORD_AUTH_PROVIDER",
        role: user.email === "mateus.fonto@gmail.com" ? "admin" : "user",
      };

      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      if (res.status === 409) {
        return true;
      }
      if (!res.ok) {
        console.log(`Error creating user: ${await res.json()}`);

        return false;
      }

      return true;
    },
  },

  // Setting up the providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        try {
          const foundUser = checkIfUserExists(credentials?.email ?? "");

          if (foundUser) {
            console.log("user exists");
            const match = await bcrypt.compare(
              String(credentials?.password),
              String(foundUser.password)
            );

            if (match) {
              console.log("password match");

              foundUser["role"] = "unverified email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log("error", error);
        }

        return null;
      },
    }),
  ],
};
