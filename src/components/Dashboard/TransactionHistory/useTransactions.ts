
import { useState } from 'react';
import { mockData } from "@/lib/mockData";
import { Transaction } from './types';
import { CATEGORIES } from './transactionUtils';
import { useTransactionFilters } from './useTransactionFilters';
import { useTransactionForm } from './useTransactionForm';

export * from './types';

export const useTransactions = () => {
  // Initialize transactions from localStorage or mockData
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : mockData.transactions;
  });
  
  // Get sorted transactions
  const sortedTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Use the filter hook
  const {
    searchTerm,
    setSearchTerm,
    filterOptions,
    setFilterOptions,
    isFilterOpen,
    setIsFilterOpen,
    activeFilters,
    showAllTransactions,
    setShowAllTransactions,
    handleClearFilters,
    filterTransactions
  } = useTransactionFilters(sortedTransactions);

  // Use the form hook
  const {
    isAddingTransaction,
    setIsAddingTransaction,
    newTransaction,
    setNewTransaction,
    handleAddTransaction
  } = useTransactionForm(transactions, setTransactions);

  // Apply filters
  const filteredTransactions = filterTransactions(sortedTransactions);
  
  // Get the transactions to display based on view mode
  const displayTransactions = showAllTransactions 
    ? filteredTransactions
    : filteredTransactions.slice(0, 5);
  
    
  return {
    transactions,
    searchTerm,
    setSearchTerm,
    isAddingTransaction,
    setIsAddingTransaction,
    showAllTransactions,
    setShowAllTransactions,
    filterOptions,
    setFilterOptions,
    isFilterOpen,
    setIsFilterOpen,
    activeFilters,
    newTransaction,
    setNewTransaction,
    categories: CATEGORIES,
    handleClearFilters,
    handleAddTransaction,
    sortedTransactions,
    filteredTransactions,
    displayTransactions
  };
};
