import { User } from "@/app/types/User";
import { dbPath } from "@/db/dbPath";
import Database from "better-sqlite3";

export function checkIfUserExists(email: string) {
  const db = new Database(dbPath);
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  db.close();

  return user as User;
}
