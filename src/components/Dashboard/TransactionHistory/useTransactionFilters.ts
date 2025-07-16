
import { useState, useEffect } from 'react';
import { Transaction, FilterOptions } from './types';

export const useTransactionFilters = (transactions: Transaction[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    type: "",
    category: "",
    dateFrom: undefined,
    dateTo: undefined,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    if (filterOptions.type) count++;
    if (filterOptions.category) count++;
    if (filterOptions.dateFrom) count++;
    if (filterOptions.dateTo) count++;
    setActiveFilters(count);
  }, [filterOptions]);

  // Apply filters and search
  const filterTransactions = (transactions: Transaction[]) => {
    return transactions.filter(tx => {
      // Search filter
      const matchesSearch = searchTerm 
        ? tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
        
      // Type filter
      const matchesType = filterOptions.type 
        ? tx.type === filterOptions.type
        : true;
        
      // Category filter
      const matchesCategory = filterOptions.category 
        ? tx.category === filterOptions.category
        : true;
        
      // Date range filter
      const txDate = new Date(tx.date);
      const matchesDateFrom = filterOptions.dateFrom 
        ? txDate >= filterOptions.dateFrom
        : true;
        
      const matchesDateTo = filterOptions.dateTo 
        ? txDate <= filterOptions.dateTo
        : true;
        
      return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo;
    });
  };

  const handleClearFilters = () => {
    setFilterOptions({
      type: "",
      category: "",
      dateFrom: undefined,
      dateTo: undefined,
    });
    setSearchTerm("");
  };

  return {
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
  };
};