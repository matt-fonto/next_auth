import Database from "better-sqlite3";

export function GET() {
  const db = new Database("mytestdb.sqlite");
  const users = db.prepare("SELECT * FROM users").all();
  db.close();

  return new Response(JSON.stringify(users));
}

export async function POST(request: Request) {
  const { name, email, role } = await request.json();
  const db = new Database("mytestdb.sqlite");

  db.prepare("INSERT INTO users (name, email, role) VALUES (?, ?, ?)").run(
    name,
    email,
    role
  );

  db.close();

  return new Response("User added");
}

export function DELETE() {
  const db = new Database("mytestdb.sqlite");
  db.prepare("DELETE FROM users").run();
  db.close();

  return new Response("All users deleted");
}
