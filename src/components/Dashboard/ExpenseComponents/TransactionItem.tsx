
import { cn } from "@/lib/utils";
import AnimatedNumber from "../../ui/custom/AnimatedNumber";

interface TransactionItemProps {
  transaction: {
    id: string;
    date: string;
    amount: number;
    description: string;
    category: string;
    type: string;
  };
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  
  const getCategoryColor = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Food & Dining': 'bg-orange-100 text-orange-600',
      'Entertainment': 'bg-purple-100 text-purple-600',
      'Housing': 'bg-blue-100 text-blue-600',
      'Income': 'bg-green-100 text-green-600',
      'Shopping': 'bg-pink-100 text-pink-600',
      'Transfer': 'bg-gray-100 text-gray-600',
    };
    
    return categoryMap[category] || 'bg-gray-100 text-gray-600';
  };
  
  return (
    <div className="flex items-center p-3 rounded-xl hover:bg-secondary/50 transition-colors">
      <div className="mr-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          getCategoryColor(transaction.category)
        )}>
          <span className="text-xs font-medium">{transaction.category.substring(0, 2)}</span>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{transaction.description}</div>
        <div className="text-xs text-muted-foreground">{transaction.category} • {formattedDate}</div>
      </div>
      
      <div className="ml-4">
        <AnimatedNumber 
          value={transaction.amount} 
          className={cn(
            "font-medium",
            transaction.type === 'expense' ? "text-finance-expense" : "text-finance-income"
          )}
        />
      </div>
    </div>
  );
};

export default TransactionItem;
