"use client";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    dispatch(formData);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="space-y-3 bg-white rounded p-4 text-black"
    >
      <h1>Login to continue</h1>

      <label
        htmlFor="email"
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
      >
        Email
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        type="email"
        id="email"
        name="email"
        required
        placeholder="Enter your email"
      />

      <label
        htmlFor="password"
        className="mb-3 block text-xs font-medium text-gray-900"
      >
        Password
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        type="password"
        id="password"
        name="password"
        required
        placeholder="Enter your password"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md py-3 font-medium"
      >
        Login
      </button>

      <div>
        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      </div>
    </form>
  );
}
