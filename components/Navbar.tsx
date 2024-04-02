import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function Navbar() {
  const session = await getServerSession(options); //we pass our options from nextAuth to this function to get the session

  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My site</div>

        <div className="flex gap-10">
          <Link href="/">Home</Link>

          {/* Unprotected */}
          <Link href="/public">Public</Link>

          {/* Needs to be logged in */}
          <Link href="/member-server">Member Server</Link>
          <Link href="/member-client">Member Client</Link>

          {/* Needs to be admin */}
          <Link href="/create-user">Create User</Link>

          {/* Doesn't have authorization to do this -> not admin */}
          <Link href="/denied">Denied</Link>

          {session ? (
            <Link href={"/api/auth/signout?callbackUrl=/"}>Sign out</Link> //when we signout, redirect to the home page
          ) : (
            <Link href={"/api/auth/signin"}>Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
