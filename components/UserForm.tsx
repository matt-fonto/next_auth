"use client";

import { User } from "@/app/types/User";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export function UserForm() {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    role: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.text();
      setErrorMessage(message);
      return;
    }

    router.refresh();
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="flex flex-col gap-3 w-1/2"
    >
      <h2>Create user</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <select value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Add user</button>
    </form>
  );
}
