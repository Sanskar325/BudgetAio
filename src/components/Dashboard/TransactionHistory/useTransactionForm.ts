
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { NewTransaction, Transaction } from './types';
import { createNewTransaction, updateLocalStorage, updateExpenseData } from './transactionUtils';

export const useTransactionForm = (
  transactions: Transaction[],
  setTransactions: (transactions: Transaction[]) => void
) => {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    description: '',
    amount: '',
    category: 'Food & Dining',
    type: 'expense'
  });
  
  const { toast } = useToast();

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const transaction = createNewTransaction(newTransaction);
    const updatedTransactions = [transaction, ...transactions];
    
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
    updateExpenseData(transaction);

    toast({
      title: "Transaction added",
      description: `Added ${newTransaction.description} for ₹${amount}`
    });

    setNewTransaction({
      description: '',
      amount: '',
      category: 'Food & Dining',
      type: 'expense'
    });
    
    setIsAddingTransaction(false);
  };

  return {
    isAddingTransaction,
    setIsAddingTransaction,
    newTransaction,
    setNewTransaction,
    handleAddTransaction
  };
};