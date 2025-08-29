import type { LucideIcon } from "lucide-react";

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  currency: string;
  type: 'expense' | 'income' | 'transfer';
  accountId: string;
  categoryId: string | null;
  categoryName?: string;
  note: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: LucideIcon;
};

export type Account = {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'card';
  currency: string;
  balance: number;
};

export type Budget = {
  id: string;
  scope: 'overall' | string; // 'overall' or categoryId
  name: string;
  amount: number;
  period: 'monthly';
  spent: number;
};
