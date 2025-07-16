
import React from 'react';
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import Card from "../ui/custom/Card";

import TransactionFilters from './TransactionHistory/TransactionFilters';
import TransactionTable from './TransactionHistory/TransactionTable';
import AddTransactionForm from './TransactionHistory/AddTransactionForm';
import { useTransactions } from './TransactionHistory/useTransactions';

const TransactionHistory: React.FC = () => {
  const {
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
    categories,
    handleClearFilters,
    handleAddTransaction,
    filteredTransactions,
    displayTransactions
  } = useTransactions();

  return (
    <Card className="flex flex-col" glassEffect id="transactions">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
          <h3 className="text-lg font-medium">Recent Transactions</h3>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <TransactionFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            categories={categories}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            activeFilters={activeFilters}
            handleClearFilters={handleClearFilters}
          />
          
          <Button size="sm" className="h-9" onClick={() => setIsAddingTransaction(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Transaction
          </Button>
        </div>
      </div>
      
      <TransactionTable 
        displayTransactions={displayTransactions}
        showAllTransactions={showAllTransactions}
        setShowAllTransactions={setShowAllTransactions}
        filteredTransactions={filteredTransactions}
      />

      {/* Add Transaction Dialog */}
      <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
        <AddTransactionForm 
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          categories={categories}
          onClose={() => setIsAddingTransaction(false)}
          onAdd={handleAddTransaction}
        />
      </Dialog>
    </Card>
  );
};

export default TransactionHistory;
