export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password1234",
  },
  {
    id: "3",
    name: "Bob Smith",
    email: "bob@example.com",
    password: "1234password",
  },
];
