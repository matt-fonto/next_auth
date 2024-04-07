import Database from "better-sqlite3";
import bcrypt from "bcrypt";

export async function createUser(
  name: string,
  email: string,
  role: "admin" | "user",
  password: string,
  dbPath: string
) {
  const db = new Database(dbPath);
  // Confirm that all fields are present
  if (!name || !email || !role || !password) {
    throw new Error("All fields are required");
  }

  // Check if the user already exists
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (user) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);
  db.prepare(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
  ).run(name, email, hashPassword, role);
  db.close();
  return { message: "User created" };
}
