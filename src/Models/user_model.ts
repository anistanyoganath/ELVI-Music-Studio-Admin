export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
};
