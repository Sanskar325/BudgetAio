
import Card from "../ui/custom/Card";
import { useNavigate } from "react-router-dom";
import ExpensePieChart from "./ExpenseComponents/ExpensePieChart";
import RecentExpenses from "./ExpenseComponents/RecentExpenses";
import { useExpenseData } from "./ExpenseComponents/useExpenseData";

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const { 
    expenseData, 
    recentTransactions, 
    isAddingExpense, 
    setIsAddingExpense, 
    handleAddExpense 
  } = useExpenseData();
  
  const handleViewAllExpenses = () => {
    navigate('/expenses');
    setTimeout(() => {
      const section = document.getElementById('expenses');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAddExpenseClick = () => {
    setIsAddingExpense(true);
  };

  const handleCancelAdd = () => {
    setIsAddingExpense(false);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
      <Card className="flex flex-col" glassEffect>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Expense by Category</h3>
        </div>
        
        <ExpensePieChart expenseCategories={expenseData.expenseCategories} />
      </Card>
      
      <Card 
        className="flex flex-col cursor-pointer hover:shadow-md transition-all" 
        glassEffect 
        onClick={isAddingExpense ? undefined : handleViewAllExpenses}
      >
        <RecentExpenses 
          recentTransactions={recentTransactions}
          isAddingExpense={isAddingExpense}
          expenseCategories={expenseData.expenseCategories}
          onViewAllExpenses={handleViewAllExpenses}
          onAddExpense={handleAddExpense}
          onAddClick={handleAddExpenseClick}
          onCancelAdd={handleCancelAdd}
        />
      </Card>
    </div>
  );
};

export default ExpenseTracker;
