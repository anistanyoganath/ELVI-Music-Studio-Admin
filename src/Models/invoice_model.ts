import type { User } from "./user_model";

export type Invoice = {
  id: string;
  invoiceNumber: string;
  user: User;
  rental: { item: { name: string }; startDate: string; endDate: string };
  subtotal: number;
  discount: number;
  lateFee: number;
  totalAmount: number;
  status: string;
  payments: { amount: number; method: string; createdAt: string }[];
};
