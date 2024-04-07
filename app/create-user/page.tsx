import { UserForm } from "@/components/UserForm";

export default function CreateUser() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Only admins!</h2>

      <UserForm />
    </div>
  );
}
