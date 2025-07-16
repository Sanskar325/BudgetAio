
import { useState, useEffect } from "react";
import { mockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface ExpenseData {
  transactions: Array<{
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    type: string;
    account: string;
  }>;
  expenseCategories: Array<{
    category: string;
    amount: number;
  }>;
}

interface NewExpense {
  description: string;
  amount: number;
  category: string;
  account: string;
}

export function useExpenseData() {
  const [expenseData, setExpenseData] = useState<ExpenseData>(mockData);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const { toast } = useToast();
  
  // Get recent transactions
  const recentTransactions = expenseData.transactions
    .filter(tx => tx.type === 'expense')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('expenseData');
    if (savedData) {
      setExpenseData(JSON.parse(savedData));
    }
  }, []);
  
  // Handle adding a new expense
  const handleAddExpense = (newExpenseData: NewExpense) => {
    // Create new expense transaction
    const newTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      description: newExpenseData.description,
      amount: newExpenseData.amount,
      category: newExpenseData.category,
      type: 'expense' as const,
      account: newExpenseData.account
    };

    // Update transactions and categories data
    const updatedTransactions = [newTransaction, ...expenseData.transactions];
    
    // Update category totals
    const updatedCategories = [...expenseData.expenseCategories];
    const categoryIndex = updatedCategories.findIndex(cat => cat.category === newExpenseData.category);
    
    if (categoryIndex >= 0) {
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        amount: updatedCategories[categoryIndex].amount + newExpenseData.amount
      };
    }

    // Update the data
    const updatedData = {
      ...expenseData,
      transactions: updatedTransactions,
      expenseCategories: updatedCategories
    };
    
    setExpenseData(updatedData);

    toast({
      title: "Expense added",
      description: `Added ${newExpenseData.description} for ₹${newExpenseData.amount}`
    });

    setIsAddingExpense(false);

    // Update localStorage to persist changes
    localStorage.setItem('expenseData', JSON.stringify(updatedData));
  };
  
  return {
    expenseData,
    recentTransactions,
    isAddingExpense,
    setIsAddingExpense,
    handleAddExpense
  };
}
