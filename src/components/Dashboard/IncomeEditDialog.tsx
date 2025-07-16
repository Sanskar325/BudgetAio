
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface IncomeEditDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  monthlyIncome: number;
  setMonthlyIncome: (income: number) => void;
}

const IncomeEditDialog = ({ 
  dialogOpen, 
  setDialogOpen, 
  monthlyIncome,
  setMonthlyIncome 
}: IncomeEditDialogProps) => {
  const [tempIncome, setTempIncome] = useState(monthlyIncome.toString());
  const { toast } = useToast();

  // Open edit income dialog - update the temp income whenever dialog opens
  const openIncomeDialog = () => {
    setTempIncome(monthlyIncome.toString());
    setDialogOpen(true);
  };
  
  // Handle income update from dialog
  const handleIncomeUpdate = () => {
    const incomeValue = Number(tempIncome);
    
    if (isNaN(incomeValue) || incomeValue <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid income amount",
        variant: "destructive",
      });
      return;
    }
    
    setMonthlyIncome(incomeValue);
    setDialogOpen(false);
    
    toast({
      title: "Income updated",
      description: `Your monthly income has been set to ₹${incomeValue.toLocaleString()}`,
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Monthly Income</DialogTitle>
          <DialogDescription>
            Update your monthly income. Annual income will be calculated automatically.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="income" className="text-sm font-medium">
              Monthly Income (₹)
            </label>
            <Input
              id="income"
              type="number"
              value={tempIncome}
              onChange={(e) => setTempIncome(e.target.value)}
              className="col-span-3"
              placeholder="Enter your monthly income"
              min="0"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleIncomeUpdate}>
            Update Income
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IncomeEditDialog;