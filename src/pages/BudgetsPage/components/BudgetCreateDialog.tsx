
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EmojiSelector from "./EmojiSelector";
import BudgetForm from "./BudgetForm";

interface BudgetCreateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateBudget: (budget: { category: string; amount: string; emoji: string }) => void;
}

const BudgetCreateDialog = ({ isOpen, onOpenChange, onCreateBudget }: BudgetCreateDialogProps) => {
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    emoji: "💰"
  });
  const { toast } = useToast();

  const handleCreateBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      toast({
        title: "Missing information",
        description: "Please provide both category and amount",
        variant: "destructive"
      });
      return;
    }

    onCreateBudget(newBudget);
    setNewBudget({ category: "", amount: "", emoji: "💰" });
    onOpenChange(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewBudget({...newBudget, emoji});
  };

  const handleCategoryChange = (category: string) => {
    setNewBudget({...newBudget, category});
  };

  const handleAmountChange = (amount: string) => {
    setNewBudget({...newBudget, amount});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <EmojiSelector 
            selectedEmoji={newBudget.emoji} 
            onEmojiSelect={handleEmojiSelect} 
          />
          <BudgetForm 
            category={newBudget.category}
            amount={newBudget.amount}
            onCategoryChange={handleCategoryChange}
            onAmountChange={handleAmountChange}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreateBudget}>Create Budget</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetCreateDialog;