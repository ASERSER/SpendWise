import {
  Briefcase,
  Bus,
  Gift,
  GraduationCap,
  Heart,
  Home,
  Pizza,
  Plane,
  Receipt,
  ShoppingCart,
  Utensils,
  Wallet,
} from "lucide-react";
import type { Account, Budget, Category, Transaction } from "./types";

export const categories: Category[] = [
  { id: "cat_1", name: "Groceries", icon: ShoppingCart, color: "hsl(var(--chart-1))" },
  { id: "cat_2", name: "Dining", icon: Utensils, color: "hsl(var(--chart-2))" },
  { id: "cat_3", name: "Transport", icon: Bus, color: "hsl(var(--chart-3))" },
  { id: "cat_4", name: "Bills", icon: Receipt, color: "hsl(var(--chart-4))" },
  { id: "cat_5", name: "Rent", icon: Home, color: "hsl(var(--chart-5))" },
  { id: "cat_6", name: "Health", icon: Heart, color: "hsl(var(--chart-1))" },
  { id: "cat_7", name: "Entertainment", icon: Pizza, color: "hsl(var(--chart-2))" },
  { id: "cat_8", name: "Education", icon: GraduationCap, color: "hsl(var(--chart-3))" },
  { id: "cat_9", name: "Travel", icon: Plane, color: "hsl(var(--chart-4))" },
  { id: "cat_10", name: "Gifts", icon: Gift, color: "hsl(var(--chart-5))" },
  { id: "cat_11", name: "Work", icon: Briefcase, color: "hsl(var(--chart-1))" },
  { id: "cat_12", name: "Other", icon: Wallet, color: "hsl(var(--chart-2))" },
];

export const accounts: Account[] = [
  { id: "acc_1", name: "Cash", type: "cash", currency: "MAD", balance: 1500.75 },
  { id: "acc_2", name: "CIH Bank", type: "bank", currency: "MAD", balance: 12850.20 },
  { id: "acc_3", name: "Credit Card", type: "card", currency: "MAD", balance: -2400.00 },
];

export const transactions: Transaction[] = [
  { id: "txn_1", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), amount: 250.00, currency: "MAD", type: "expense", accountId: "acc_1", categoryId: "cat_1", categoryName: "Groceries", note: "Marjane", createdAt: new Date().toISOString() },
  { id: "txn_2", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), amount: 120.50, currency: "MAD", type: "expense", accountId: "acc_2", categoryId: "cat_2", categoryName: "Dining", note: "Lunch with friends", createdAt: new Date().toISOString() },
  { id: "txn_3", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), amount: 50.00, currency: "MAD", type: "expense", accountId: "acc_1", categoryId: "cat_3", categoryName: "Transport", note: "Tramway card", createdAt: new Date().toISOString() },
  { id: "txn_4", date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), amount: 5000.00, currency: "MAD", type: "income", accountId: "acc_2", categoryId: null, note: "Salary", createdAt: new Date().toISOString() },
  { id: "txn_5", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), amount: 850.00, currency: "MAD", type: "expense", accountId: "acc_3", categoryId: "cat_4", categoryName: "Bills", note: "Internet & Phone", createdAt: new Date().toISOString() },
  { id: "txn_6", date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), amount: 300.00, currency: "MAD", type: "expense", accountId: "acc_2", categoryId: "cat_7", categoryName: "Entertainment", note: "Cinema tickets", createdAt: new Date().toISOString() },
  { id: "txn_7", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), amount: 1000.00, currency: "MAD", type: "transfer", accountId: "acc_2", categoryId: null, note: "Cash withdrawal", createdAt: new Date().toISOString() },
  { id: "txn_8", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), amount: 1000.00, currency: "MAD", type: "income", accountId: "acc_1", categoryId: null, note: "From CIH Bank", createdAt: new Date().toISOString() },
];

export const budgets: Budget[] = [
    { id: "bud_1", scope: "overall", name: "Overall Budget", amount: 4000, spent: 1570.50, period: "monthly" },
    { id: "bud_2", scope: "cat_1", name: "Groceries", amount: 1500, spent: 250, period: "monthly" },
    { id: "bud_3", scope: "cat_2", name: "Dining", amount: 800, spent: 120.50, period: "monthly" },
    { id: "bud_4", scope: "cat_7", name: "Entertainment", amount: 500, spent: 300, period: "monthly" },
];
