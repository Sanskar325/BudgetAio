
import { Transaction, NewTransaction } from './types';

export const CATEGORIES = [
  "Food & Dining",
  "Entertainment",
  "Housing",
  "Shopping",
  "Transportation",
  "Healthcare",
  "Income",
  "Transfer"
];

export const createNewTransaction = (newTransaction: NewTransaction): Transaction => {
  return {
    id: `tx-${Date.now()}`,
    date: new Date().toISOString(),
    description: newTransaction.description,
    amount: parseFloat(newTransaction.amount),
    category: newTransaction.category,
    type: newTransaction.type,
    account: "acc-1"
  };
};

export const updateLocalStorage = (transactions: Transaction[]): void => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const updateExpenseData = (transaction: Transaction): void => {
  // Only update expense data if it's an expense
  if (transaction.type !== 'expense') return;

  const expenseDataString = localStorage.getItem('expenseData');
  if (!expenseDataString) return;

  const expenseData = JSON.parse(expenseDataString);
  
  // Add to transactions
  const updatedExpenseData = {
    ...expenseData,
    transactions: [transaction, ...expenseData.transactions]
  };
  
  // Update category totals if it's an expense
  const categoryIndex = expenseData.expenseCategories.findIndex(
    (cat: any) => cat.category === transaction.category
  );
  
  if (categoryIndex >= 0) {
    updatedExpenseData.expenseCategories[categoryIndex].amount += transaction.amount;
  }
  
  localStorage.setItem('expenseData', JSON.stringify(updatedExpenseData));
};