
import { createContext } from 'react';
import type { Transaction } from '@/lib/types';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'categoryName'>) => void;
}

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => {},
});
