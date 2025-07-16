
import Card from "@/components/ui/custom/Card";

interface BudgetCardProps {
  budget: {
    id: number;
    category: string;
    items: number;
    allocated: number;
    spent: number;
    emoji: string;
  };
}

const BudgetCard = ({ budget }: BudgetCardProps) => {
  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">{budget.emoji}</div>
        <div>
          <h3 className="font-medium">{budget.category}</h3>
          <p className="text-sm text-muted-foreground">{budget.items} item{budget.items !== 1 ? 's' : ''}</p>
        </div>
        <span className="ml-auto text-xl font-bold">₹{budget.allocated}</span>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>₹{budget.spent} Spent</span>
          <span>₹{budget.allocated - budget.spent} Remaining</span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default BudgetCard;