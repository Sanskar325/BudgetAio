
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CalendarArrowDown, CalendarArrowUp, PieChart } from 'lucide-react';
import Card from "@/components/ui/custom/Card";
import AnimatedNumber from "@/components/ui/custom/AnimatedNumber";

interface MultiPeriodBudgetViewProps {
  budgets: any[];
}

const MultiPeriodBudgetView: React.FC<MultiPeriodBudgetViewProps> = ({ budgets }) => {
  const [periodType, setPeriodType] = useState('weekly');
  
  // Calculate projections based on current spending
  const calculateProjections = (period: string) => {
    // Get total allocated and spent
    const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    
    // Weekly is base period, calculate scaling factors for other periods
    const multipliers = {
      weekly: 1,
      monthly: 4.33, // Average weeks in a month
      yearly: 52,    // Weeks in a year
    };
    
    const multiplier = multipliers[period as keyof typeof multipliers];
    
    // Calculate spending rate (percentage of budget used)
    const spendingRate = totalAllocated > 0 ? (totalSpent / totalAllocated) : 0;
    
    // Project for the full period
    const projectedSpend = totalSpent * multiplier;
    const recommendedAllocation = totalAllocated * multiplier;
    
    // Calculate savings or deficit
    const projection = recommendedAllocation - projectedSpend;
    
    return {
      allocation: recommendedAllocation,
      projected: projectedSpend,
      balance: projection,
      rate: spendingRate * 100, // Convert to percentage
    };
  };
  
  const getStyleForProjection = (balance: number) => {
    if (balance > 0) return "text-green-600 dark:text-green-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const projection = calculateProjections(periodType);
  
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-primary" />
        Budget Timeline
      </h3>
      
      <Tabs defaultValue="weekly" onValueChange={setPeriodType}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-4">
          <BudgetPeriodContent projection={projection} period="weekly" />
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <BudgetPeriodContent projection={projection} period="monthly" />
        </TabsContent>
        
        <TabsContent value="yearly" className="space-y-4">
          <BudgetPeriodContent projection={projection} period="yearly" />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

interface BudgetPeriodContentProps {
  projection: {
    allocation: number;
    projected: number;
    balance: number;
    rate: number;
  };
  period: string;
}

const BudgetPeriodContent: React.FC<BudgetPeriodContentProps> = ({ projection, period }) => {
  const { allocation, projected, balance, rate } = projection;
  
  // Determine whether the projection is positive or negative
  const isPositive = balance >= 0;
  
  // Determine period text
  const periodText = period === 'weekly' ? 'this week' : 
                    period === 'monthly' ? 'this month' : 'this year';
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-md bg-primary/10">
          <h4 className="text-xs text-muted-foreground mb-1">Allocated Budget</h4>
          <p className="text-lg font-medium"><AnimatedNumber value={Math.round(allocation)} /></p>
        </div>
        
        <div className="p-3 rounded-md bg-primary/10">
          <h4 className="text-xs text-muted-foreground mb-1">Projected Spending</h4>
          <p className="text-lg font-medium"><AnimatedNumber value={Math.round(projected)} /></p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">Projected {isPositive ? 'Savings' : 'Deficit'}</h4>
            <p className={`text-lg font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isPositive ? '+' : '−'}<AnimatedNumber value={Math.abs(Math.round(balance))} />
            </p>
          </div>
          
          <div className="flex items-center">
            {isPositive ? (
              <CalendarArrowDown className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            ) : (
              <CalendarArrowUp className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            )}
            <div>
              <p className="text-xs text-muted-foreground">You are projected to</p>
              <p className="text-sm font-medium">
                {isPositive ? (
                  <span className="text-green-600 dark:text-green-400">Stay under budget</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">Exceed budget</span>
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Current Usage: {rate.toFixed(0)}%</span>
            <span>{(100 - rate).toFixed(0)}% Remaining</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${rate > 100 ? 'bg-red-500' : 'bg-primary'}`}
              style={{ width: `${Math.min(rate, 100)}%` }}
            />
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          {isPositive
            ? `Based on your current spending patterns, you're projected to save ₹${Math.abs(Math.round(balance))} ${periodText}.`
            : `Based on your current spending patterns, you're projected to exceed your budget by ₹${Math.abs(Math.round(balance))} ${periodText}.`
          }
        </p>
      </div>
    </div>
  );
};

export default MultiPeriodBudgetView;