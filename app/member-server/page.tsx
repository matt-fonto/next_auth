import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function MemberServerPage() {
  const session = await getServerSession(options); //we check if there is a session

  console.log("session", session);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member-server");
  }

  return (
    <div>
      <h1>Protecting routes in the server</h1>
      <h2>This is a protected route</h2>

      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
}
