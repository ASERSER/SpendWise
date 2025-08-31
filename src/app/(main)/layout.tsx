
"use client";

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarNav } from "./sidebar-nav";
import { useState } from "react";
import type { Transaction } from "@/lib/types";
import { transactions as initialTransactions } from "@/lib/data";
import { TransactionContext } from "./transaction-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt' | 'categoryName'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };


  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      <SidebarProvider>
        <Sidebar>
          <AppSidebarNav />
        </Sidebar>
        <SidebarInset>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TransactionContext.Provider>
  );
}
