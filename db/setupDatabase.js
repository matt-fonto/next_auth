const Database = require("better-sqlite3");
const db = new Database("mytestdb.sqlite", { verbose: console.log });

try {
  db.exec(`
    ALTER TABLE users ADD COLUMN role TEXT;
  `);
  console.log("Added 'role' column to 'users' table.");
} catch (error) {
  if (error.message.includes("duplicate column name")) {
    console.log("'role' column already exists in 'users' table.");
  } else {
    throw error; // Rethrow if it's not the specific error we're looking for
  }
}
// Your existing table creation and data insertion logic here
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    role TEXT
  )
`);

const stmt = db.prepare(
  "INSERT INTO users (name, email, role) VALUES (?, ?, ?)"
);
const users = [
  { name: "John Doe", email: "john@example.com", role: "user" },
  { name: "Jane Doe", email: "jane@example.com", role: "user" },
  { name: "Mateus", email: "mateus.fonto@gmail.com", role: "admin" },
];

users.forEach((user) => {
  stmt.run(user.name, user.email, user.role);
});

console.log("Database and users table have been initialized with test data.");
