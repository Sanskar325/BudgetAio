
import { useState, useEffect } from "react";
import { mockData } from "@/lib/mockData";
import Card from "../ui/custom/Card";
import { cn } from "@/lib/utils";
import AnimatedNumber from "../ui/custom/AnimatedNumber";
import { PlaceBudgetChecker, BudgetRecommendations, MultiPeriodBudgetView } from "./BudgetComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BudgetManager = () => {
  const [budgets, setBudgets] = useState(mockData.budgets);
  
  // Load budgets from localStorage if they exist
  useEffect(() => {
    const savedBudgets = localStorage.getItem('budgets');
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);
  
  return (
    <Card className="flex flex-col" glassEffect>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Budget Overview 📈</h3>
        <button className="text-sm text-primary hover:underline flex items-center">
          Manage budgets <span className="ml-1" aria-hidden="true">→</span>
        </button>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="checker">Purchase Checker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {budgets.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))}
          
          <div className="pt-4 border-t">
            <MultiPeriodBudgetView budgets={budgets} />
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <BudgetRecommendations budgets={budgets} />
        </TabsContent>
        
        <TabsContent value="checker">
          <PlaceBudgetChecker budgets={budgets} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

interface BudgetItemProps {
  budget: any;
}

const BudgetItem = ({ budget }: BudgetItemProps) => {
  const percentage = (budget.spent / budget.allocated) * 100;
  const remaining = budget.allocated - budget.spent;
  
  // Determine status color
  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{budget.category}</span>
        <div className="text-sm">
          <AnimatedNumber value={budget.spent} /> 
          <span className="text-muted-foreground"> of </span> 
          <AnimatedNumber value={budget.allocated} />
        </div>
      </div>
      
      <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn(
            "absolute left-0 top-0 h-full rounded-full transition-all duration-1000",
            getStatusColor(percentage)
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{percentage.toFixed(0)}% used</span>
        {remaining > 0 ? (
          <span><AnimatedNumber value={remaining} /> remaining</span>
        ) : (
          <span className="text-red-500">Over budget by <AnimatedNumber value={Math.abs(remaining)} /></span>
        )}
      </div>
    </div>
  );
};

export default BudgetManager;
