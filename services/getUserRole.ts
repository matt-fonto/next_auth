import Database from "better-sqlite3";
const db = new Database("mytestdb.sqlite");

export function getUserRole(email: string) {
  // stmt => means statement
  const stmt = db.prepare("SELECT role FROM users WHERE email = ?");
  const user = stmt.get(email) as { role: string };

  console.log("user", user);

  return user ? user.role : "user";
}
