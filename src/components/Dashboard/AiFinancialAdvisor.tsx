
import { useState } from "react";
import Card from "../ui/custom/Card";
import { Bot, Send, Sparkles } from "lucide-react";
import { mockData } from "@/lib/mockData";
import { toast } from "sonner";

// Local AI simulation that generates financial advice
const localAISimulator = (userQuery: string, financialData: any): string => {
  const { balance, expenseCategories, budgets, savingsGoals, incomeVsExpense } = financialData;
  
  // Analyze spending patterns
  const totalExpenses = expenseCategories.reduce((sum: number, cat: any) => sum + cat.amount, 0);
  const highestCategory = expenseCategories.reduce((max: any, cat: any) => 
    cat.amount > max.amount ? cat : max, expenseCategories[0]);
  
  // Savings analysis
  const totalSavings = savingsGoals.reduce((sum: number, goal: any) => sum + goal.current, 0);
  const totalTarget = savingsGoals.reduce((sum: number, goal: any) => sum + goal.target, 0);
  const savingsPercentage = Math.round((totalSavings / totalTarget) * 100);
  
  // Budget analysis
  const overBudget = budgets.filter((b: any) => b.spent > b.allocated);
  const underBudget = budgets.filter((b: any) => b.spent < b.allocated * 0.7);
  
  // Generate responses based on query keywords
  if (userQuery.toLowerCase().includes("save") || userQuery.toLowerCase().includes("saving")) {
    return `Based on your current savings of ₹${totalSavings} (${savingsPercentage}% of your ₹${totalTarget} goal), consider increasing monthly contributions by 10-15% to reach your targets faster.`;
  }
  
  if (userQuery.toLowerCase().includes("spend") || userQuery.toLowerCase().includes("expense")) {
    return `Your highest expense is ${highestCategory.category} (₹${highestCategory.amount}). Reducing this by 15% could save you ₹${Math.round(highestCategory.amount * 0.15)} monthly.`;
  }
  
  if (userQuery.toLowerCase().includes("budget")) {
    if (overBudget.length > 0) {
      return `You're over budget in ${overBudget.map(b => b.category).join(', ')}. Try reducing spending in these categories by 10-20%.`;
    }
    return `Your budgets look good! You have room in ${underBudget.map(b => b.category).join(', ')} categories.`;
  }
  
  if (userQuery.toLowerCase().includes("invest")) {
    return `With your available balance of ₹${balance.available}, consider investing 20% (₹${Math.round(balance.available * 0.2)}) in low-risk mutual funds.`;
  }
  
  // Default generic advice
  return `Based on your financial data:
  - Current balance: ₹${balance.total}
  - Monthly expenses: ₹${totalExpenses}
  - Savings progress: ${savingsPercentage}%
  Consider ${overBudget.length > 0 ? 'reducing expenses in ' + overBudget.map(b => b.category).join(', ') : 'increasing your savings by 10%'}.`;
};

const AiFinancialAdvisor = () => {
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Based on your spending patterns, you could save ₹1,200 monthly by reducing dining expenses.",
    "Consider allocating 10% more to your emergency fund to reach your goal faster.",
    "Your housing expenses are 5% higher than recommended. Look for ways to optimize this category."
  ]);
  
  const generateSuggestion = async () => {
    if (!query.trim()) {
      toast.error("Please enter a question first");
      return;
    }
    
    setIsThinking(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = localAISimulator(query, mockData);
      
      setSuggestions([response, ...suggestions.slice(0, 2)]);
      setQuery("");
      toast.success("Financial advice generated!");
    } catch (error) {
      console.error("Error generating advice:", error);
      toast.error("Failed to generate advice. Please try again.");
    } finally {
      setIsThinking(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateSuggestion();
  };
  
  return (
    <Card className="flex flex-col" glassEffect>
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">AI Financial Advisor</h3>
        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Smart
        </span>
      </div>
      
      <div className="space-y-4 mb-4">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="p-3 rounded-lg bg-secondary/50 text-sm relative pl-10"
          >
            <Bot className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
            {suggestion}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask for financial advice..."
          className="flex-1 bg-secondary px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          disabled={isThinking}
        />
        <button 
          type="submit"
          disabled={isThinking || !query.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-lg flex items-center gap-1 disabled:opacity-50"
        >
          {isThinking ? "Thinking..." : "Ask"} 
          <Send className="h-4 w-4 ml-1" />
        </button>
      </form>
    </Card>
  );
};

export default AiFinancialAdvisor;
