"use client";

import { User } from "@/app/types/User";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export function UserForm() {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: 0,
  });

  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage({ message: "", status: 0 });

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.text();
      setErrorMessage({ message, status: res.status });
      return;
    }

    router.refresh();
    // router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="flex flex-col gap-3 w-1/2 border rounded-lg p-4 shadow-md mt-10 "
    >
      <h2>Create user</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Add user</button>

      {errorMessage && (
        <p className="text-red-500 text-sm font-semibold">
          {errorMessage.message}
        </p>
      )}
    </form>
  );
}
