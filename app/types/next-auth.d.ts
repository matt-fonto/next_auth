import type { User } from "next-auth";
import "next-auth/jwt";

// main entry point for the NextAuth.js library, providing the core functionality
declare module "next-auth" {
  interface Session {
    user?: User & { role?: string };
  }

  interface JWT {
    uid?: string;
    role?: string;
  }
}

// submodule, deals with JWTs (JSON Web Tokens) and provides utilities for working with them
declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    role: string;
  }
}
