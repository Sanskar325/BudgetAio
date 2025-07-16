
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Card from "../ui/custom/Card";

interface BudgetSummaryCardsProps {
  budgets: Array<{
    id: number;
    category: string;
    items: number;
    allocated: number;
    spent: number;
    emoji: string;
  }>;
}

const BudgetSummaryCards = ({ budgets }: BudgetSummaryCardsProps) => {
  const navigate = useNavigate();

  const handleViewAllBudgets = () => {
    navigate('/budgets');
  };

  return (
    <>
      <Card className="p-4 md:p-5 flex flex-col text-left" glassEffect>
        <div className="text-sm font-medium text-muted-foreground">Total Budgeted 📊</div>
        <div className="text-2xl md:text-3xl font-semibold mt-2">₹{budgets.reduce((sum, budget) => sum + budget.allocated, 0).toLocaleString()}</div>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <div className="p-3 bg-primary/10 rounded-full inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 5H3"></path><path d="M19 9H5"></path><path d="M21 13H3"></path><path d="M19 17H5"></path></svg>
          </div>
          <Button variant="ghost" size="sm" onClick={handleViewAllBudgets} className="text-xs flex items-center">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </Card>
      
      <Card className="p-4 md:p-5 flex flex-col text-left" glassEffect>
        <div className="text-sm font-medium text-muted-foreground">Total Spend 📊</div>
        <div className="text-2xl md:text-3xl font-semibold mt-2">₹{budgets.reduce((sum, budget) => sum + budget.spent, 0).toLocaleString()}</div>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <div className="p-3 bg-primary/10 rounded-full inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 10h12"></path><path d="M4 14h9"></path><path d="M4 18h6"></path><rect width="8" height="8" x="12" y="4" rx="2"></rect></svg>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/expenses')} className="text-xs flex items-center">
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default BudgetSummaryCards;