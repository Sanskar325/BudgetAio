
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Card from "../ui/custom/Card";

interface LatestBudgetsProps {
  latestBudgets: Array<{
    id: number;
    category: string;
    items: number;
    allocated: number;
    spent: number;
    emoji: string;
  }>;
}

const LatestBudgets = ({ latestBudgets }: LatestBudgetsProps) => {
  const navigate = useNavigate();

  const handleViewAllBudgets = () => {
    navigate('/budgets');
  };

  return (
    <Card className="p-4 md:p-5 text-left" glassEffect>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base md:text-lg font-medium">Latest Budgets 💰</h3>
        <Button variant="ghost" size="sm" onClick={handleViewAllBudgets} className="text-xs">
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {latestBudgets.length > 0 ? (
          latestBudgets.map((budget, index) => (
            <div key={budget.id} className={index > 0 ? "pt-4 border-t" : ""}>
              <div className="flex items-center gap-3">
                <div className={`bg-${index === 0 ? 'pink' : 'blue'}-100 p-2 rounded-full`}>
                  <span className="text-lg">{budget.emoji}</span>
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base">{budget.category}</h3>
                  <p className="text-xs text-muted-foreground">{budget.items} item{budget.items !== 1 ? 's' : ''}</p>
                </div>
                <span className="ml-auto font-bold">₹{budget.allocated}</span>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>₹{budget.spent} Spent</span>
                  <span>₹{budget.allocated - budget.spent} Remaining</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full"
                    style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No budgets available. Create some on the budgets page.
          </div>
        )}
      </div>
    </Card>
  );
};

export default LatestBudgets;