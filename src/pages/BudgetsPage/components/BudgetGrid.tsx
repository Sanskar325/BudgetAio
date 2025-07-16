
import { useState } from "react";
import BudgetCard from "./BudgetCard";
import CreateBudgetCard from "./CreateBudgetCard";
import BudgetCreateDialog from "./BudgetCreateDialog";
import { useToast } from "@/components/ui/use-toast";

interface BudgetGridProps {
  budgets: any[];
  setBudgets: React.Dispatch<React.SetStateAction<any[]>>;
}

const BudgetGrid = ({ budgets, setBudgets }: BudgetGridProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateBudget = (newBudget: { category: string; amount: string; emoji: string }) => {
    const newBudgetItem = {
      id: Date.now(),
      category: newBudget.category,
      items: 0,
      allocated: parseFloat(newBudget.amount),
      spent: 0,
      emoji: newBudget.emoji
    };
    
    const updatedBudgets = [...budgets, newBudgetItem];
    setBudgets(updatedBudgets);
    
    // Save to localStorage
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));

    // Update the total number of budgets in localStorage for dashboard
    localStorage.setItem('totalBudgets', String(updatedBudgets.length));

    toast({
      title: "Budget created",
      description: `Budget for ${newBudget.category} created successfully`
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <CreateBudgetCard onClick={() => setIsDialogOpen(true)} />
        
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>

      <BudgetCreateDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateBudget={handleCreateBudget}
      />
    </>
  );
};

export default BudgetGrid;