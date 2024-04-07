import { dbPath } from "@/db/dbPath";
import { createUser } from "@/services/createUser";
import Database from "better-sqlite3";
import { NextResponse } from "next/server";

export function GET() {
  const db = new Database(dbPath);
  const users = db.prepare("SELECT * FROM users").all();
  db.close();

  return new Response(JSON.stringify(users));
}

export async function POST(request: Request) {
  try {
    const { name, email, role, password } = await request.json(); //pulling the information
    const result = await createUser(name, email, role, password);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.log("error", error);

    if (error instanceof Error) {
      let statusCode;
      if (error.message === "User already exists") {
        statusCode = 409;
      } else if (error.message === "All fields are required") {
        statusCode = 400;
      } else {
        statusCode = 500;
      }

      return NextResponse.json(
        { message: error.message },
        { status: statusCode }
      );
    } else {
      // This catch block only runs if the error is not an instance of Error
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

export function DELETE() {
  const db = new Database(dbPath);
  db.prepare("DELETE FROM users").run();
  db.close();

  return new Response("All users deleted");
}
