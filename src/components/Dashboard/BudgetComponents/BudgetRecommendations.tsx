
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';
import Card from "@/components/ui/custom/Card";

interface BudgetRecommendationProps {
  budgets: any[];
}

const BudgetRecommendations: React.FC<BudgetRecommendationProps> = ({ budgets }) => {
  // Generate recommendations based on budget usage
  const getRecommendations = () => {
    const recommendations = [];
    
    // Find overspent budgets
    const overspentBudgets = budgets.filter(b => b.spent > b.allocated);
    if (overspentBudgets.length > 0) {
      recommendations.push({
        type: 'warning',
        icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
        title: 'Budget Overruns',
        message: `You've exceeded your budget in ${overspentBudgets.length} categories. Consider reallocating funds.`
      });
    }
    
    // Find nearly depleted budgets
    const nearlyDepletedBudgets = budgets.filter(b => {
      const percentage = (b.spent / b.allocated) * 100;
      return percentage >= 80 && percentage < 100;
    });
    
    if (nearlyDepletedBudgets.length > 0) {
      recommendations.push({
        type: 'info',
        icon: <TrendingDown className="w-4 h-4 text-blue-500" />,
        title: 'Almost Depleted',
        message: `${nearlyDepletedBudgets.length} budget categories are almost depleted. Plan carefully for the remainder of the period.`
      });
    }
    
    // Find underutilized budgets
    const underutilizedBudgets = budgets.filter(b => {
      const percentage = (b.spent / b.allocated) * 100;
      return percentage < 20;
    });
    
    if (underutilizedBudgets.length > 0) {
      recommendations.push({
        type: 'success',
        icon: <TrendingUp className="w-4 h-4 text-green-500" />,
        title: 'Savings Opportunity',
        message: `You're well under budget in ${underutilizedBudgets.length} categories. Consider saving the excess or reallocating.`
      });
    }
    
    // Always add a general recommendation
    recommendations.push({
      type: 'tip',
      icon: <Lightbulb className="w-4 h-4 text-amber-500" />,
      title: 'Smart Budgeting',
      message: 'Set your budgets based on your historical spending patterns for more accurate planning.'
    });
    
    return recommendations;
  };
  
  const recommendations = getRecommendations();
  
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2 text-primary" />
        Budget Insights
      </h3>
      
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-md border ${
              rec.type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30' :
              rec.type === 'info' ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900/30' :
              rec.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30' :
              'border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-900/30'
            }`}
          >
            <div className="flex items-start">
              <div className="shrink-0 mt-0.5">{rec.icon}</div>
              <div className="ml-3">
                <h4 className="text-sm font-medium">{rec.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{rec.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BudgetRecommendations;