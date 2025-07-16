
import { Button } from "../../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface AddExpenseFormProps {
  expenseCategories: Array<{ category: string }>;
  onAddExpense: (newExpense: {
    description: string;
    amount: number;
    category: string;
    account: string;
  }) => void;
  onCancel: () => void;
}

const AddExpenseForm = ({ expenseCategories, onAddExpense, onCancel }: AddExpenseFormProps) => {
  const { toast } = useToast();
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Food & Dining"
  });

  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newExpense.description || !newExpense.amount) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(newExpense.amount);
    
    onAddExpense({
      description: newExpense.description,
      amount: amount,
      category: newExpense.category,
      account: "acc-1" // Default account
    });

    // Reset form
    setNewExpense({
      description: "",
      amount: "",
      category: "Food & Dining"
    });
  };

  return (
    <div className="p-4 bg-secondary/30 rounded-lg mb-4" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmitExpense} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input 
            type="text" 
            className="w-full p-2 rounded-md border border-input bg-background"
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            placeholder="e.g., Grocery shopping"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input 
            type="number" 
            className="w-full p-2 rounded-md border border-input bg-background"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select 
            className="w-full p-2 rounded-md border border-input bg-background"
            value={newExpense.category}
            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
          >
            {expenseCategories.map((cat, index) => (
              <option key={index} value={cat.category}>{cat.category}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Expense</Button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
