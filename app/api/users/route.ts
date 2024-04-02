import Database from "better-sqlite3";

export function GET() {
  const db = new Database("mytestdb.sqlite");
  const users = db.prepare("SELECT * FROM users").all();
  db.close();

  return new Response(JSON.stringify(users));
}

export function DELETE() {
  const db = new Database("mytestdb.sqlite");
  db.prepare("DELETE FROM users").run();
  db.close();

  return new Response("All users deleted");
}
