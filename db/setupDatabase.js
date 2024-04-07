const Database = require("better-sqlite3");
const db = new Database("mock_db.sqlite", { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT,
    role TEXT
  )
`);

const stmt = db.prepare(
  "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
);

console.log("Database created");
