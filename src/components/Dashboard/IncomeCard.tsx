
import { Button } from "@/components/ui/button";
import { Edit, IndianRupee } from "lucide-react";
import Card from "../ui/custom/Card";

interface IncomeCardProps {
  monthlyIncome: number;
  annualIncome: number;
  onEditClick: () => void;
}

const IncomeCard = ({ monthlyIncome, annualIncome, onEditClick }: IncomeCardProps) => {
  return (
    <Card className="p-4 md:p-5 flex flex-col text-left col-span-1 sm:col-span-2 md:col-span-1" glassEffect>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-muted-foreground">Income Details 💰</div>
        <Button variant="ghost" size="sm" onClick={onEditClick} className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-xs text-muted-foreground">Monthly Income</div>
          <div className="text-xl md:text-2xl font-semibold flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {monthlyIncome.toLocaleString()}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground">Annual Income</div>
          <div className="text-xl md:text-2xl font-semibold flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {annualIncome.toLocaleString()}
          </div>
        </div>
        
        <div className="pt-2 text-xs text-muted-foreground">
          Click the edit button to update your income
        </div>
      </div>
    </Card>
  );
};

export default IncomeCard;
