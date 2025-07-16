
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Plus, Calendar } from "lucide-react";
import TransactionItem from "./TransactionItem";
import AddExpenseForm from "./AddExpenseForm";

interface RecentExpensesProps {
  recentTransactions: Array<{
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    type: string;
    account: string;
  }>;
  isAddingExpense: boolean;
  expenseCategories: Array<{ category: string }>;
  onViewAllExpenses: () => void;
  onAddExpense: (newExpense: {
    description: string;
    amount: number;
    category: string;
    account: string;
  }) => void;
  onAddClick: () => void;
  onCancelAdd: () => void;
}

const RecentExpenses = ({
  recentTransactions,
  isAddingExpense,
  expenseCategories,
  onViewAllExpenses,
  onAddExpense,
  onAddClick,
  onCancelAdd
}: RecentExpensesProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          Recent Expenses
          <Calendar className="h-4 w-4 text-primary" />
        </h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onAddClick();
            }}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Expense
          </Button>
          <button 
            className="text-sm text-primary hover:underline flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              onViewAllExpenses();
            }}
          >
            View all <span className="ml-1" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      
      {isAddingExpense ? (
        <AddExpenseForm 
          expenseCategories={expenseCategories}
          onAddExpense={onAddExpense}
          onCancel={onCancelAdd}
        />
      ) : (
        <div className="space-y-4 flex-1">
          {recentTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </>
  );
};

export default RecentExpenses;
