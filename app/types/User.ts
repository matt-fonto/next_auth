export type User = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "unverified email";
};
