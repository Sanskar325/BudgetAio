
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BudgetFormProps {
  category: string;
  amount: string;
  onCategoryChange: (value: string) => void;
  onAmountChange: (value: string) => void;
}

const BudgetForm = ({ 
  category, 
  amount, 
  onCategoryChange, 
  onAmountChange 
}: BudgetFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input 
          id="category" 
          placeholder="e.g., Shopping, Travel" 
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Budget Amount (₹)</Label>
        <Input 
          id="amount" 
          type="number" 
          placeholder="Amount in ₹" 
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default BudgetForm;