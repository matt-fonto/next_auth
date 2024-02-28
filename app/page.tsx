// import { getSession } from "next-auth/react";

import { getSession, login, logout } from "@/lib";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  return (
    <section className="min-h-screen">
      <div className="flex flex-col w-1/4 justify-center items-center mx-auto mt-20">
        {/* Login */}
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server";
            await login(formData); // call this function
            redirect("/"); // redirect to home page
          }}
        >
          <label>Email</label>
          <input type="email" name="email" required />
          <br />

          <label>Password</label>
          <input type="password" name="password" required />
          <br />

          <label>Name</label>
          <input type="text" name="name" required />
          <br />
          <button type="submit">Login</button>
        </form>

        {/* Logout */}
        <form
          action={async () => {
            "use server";
            await logout();
            redirect("/");
          }}
        >
          <button type="submit">Logout</button>
        </form>

        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </section>
  );
}

// https://nextjs.org/learn/dashboard-app/adding-authentication
// https://www.youtube.com/watch?v=DJvM2lSPn6w&t=535s
// https://github.com/balazsorban44/auth-poc-next
