
import React, { useState } from 'react';
import { Check, X, MapPin, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Card from "@/components/ui/custom/Card";

interface PlaceBudgetCheckerProps {
  budgets: any[];
}

const PlaceBudgetChecker: React.FC<PlaceBudgetCheckerProps> = ({ budgets }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState<{
    canPurchase: boolean;
    message: string;
    remaining: number;
  } | null>(null);
  
  const { toast } = useToast();
  
  const checkBudget = () => {
    if (!item || !amount || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const relevantBudget = budgets.find(budget => budget.category === category);
    
    if (!relevantBudget) {
      setResult({
        canPurchase: false,
        message: `No budget found for ${category}`,
        remaining: 0
      });
      return;
    }
    
    const amountNum = parseFloat(amount);
    const remaining = relevantBudget.allocated - relevantBudget.spent;
    const canPurchase = remaining >= amountNum;
    
    setResult({
      canPurchase,
      message: canPurchase 
        ? `You can purchase this ${item}. You'll have ₹${(remaining - amountNum).toFixed(2)} left in your ${category} budget.`
        : `This purchase exceeds your remaining ${category} budget by ₹${(amountNum - remaining).toFixed(2)}.`,
      remaining
    });
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-primary" />
        Budget Purchase Checker
      </h3>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="item" className="text-sm font-medium block mb-1">Item</label>
          <Input 
            id="item"
            placeholder="What do you want to buy?"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="text-sm font-medium block mb-1">Amount (₹)</label>
          <Input 
            id="amount"
            type="number"
            placeholder="How much does it cost?"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="category" className="text-sm font-medium block mb-1">Category</label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a budget category</option>
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.category}>
                {budget.category} (₹{budget.allocated - budget.spent} remaining)
              </option>
            ))}
          </select>
        </div>
        
        <Button 
          className="w-full" 
          onClick={checkBudget}
          variant="default"
        >
          <Search className="w-4 h-4 mr-2" />
          Check Availability
        </Button>
        
        {result && (
          <div className={`mt-4 p-3 rounded-md ${result.canPurchase ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            <div className="flex items-start">
              <div className={`shrink-0 p-1 rounded-full ${result.canPurchase ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {result.canPurchase ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <p className="ml-3 text-sm">{result.message}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PlaceBudgetChecker;