"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function MemberClientPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to the login page
      redirect("/api/auth/signin?callbackUrl=/member-client");
    },
  });

  return (
    <div>
      <h1>Protecting routes in the client</h1>
      <h2>This is a protected route</h2>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      <h3>{session?.user?.role}</h3>
    </div>
  );
}
