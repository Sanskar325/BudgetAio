
import { useState, useEffect } from "react";
import Card from "../ui/custom/Card";
import { AlertTriangle, Bell, EyeOff, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { mockData } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AnomalyDetection = () => {
  const [dismissedAnomalies, setDismissedAnomalies] = useState<number[]>(() => {
    const saved = localStorage.getItem('dismissedAnomalies');
    return saved ? JSON.parse(saved) : [];
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get budget and goal data to generate anomalies
  const { budgets, savingsGoals, transactions } = mockData;
  
  // Generate anomalies based on budgets and goals
  const generateAnomalies = () => {
    const anomalies = [];
    
    // Check budgets for overspending
    budgets.forEach(budget => {
      const percentSpent = (budget.spent / budget.allocated) * 100;
      if (percentSpent > 90) {
        anomalies.push({
          id: anomalies.length + 1,
          description: `${budget.category} budget is nearly depleted - ${percentSpent.toFixed(0)}% used`,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          severity: percentSpent >= 100 ? "high" : "medium",
          amount: `₹${budget.spent.toLocaleString()}`,
          linkTo: "/budgets"
        });
      }
    });
    
    // Check goals for delays
    savingsGoals.forEach(goal => {
      // Calculate expected progress based on deadline and current date
      const currentDate = new Date();
      const deadlineDate = new Date(goal.deadline);
      const totalDays = Math.max(1, (deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // If we're getting close to the deadline but haven't made much progress
      const percentComplete = (goal.current / goal.target) * 100;
      if (percentComplete < 70 && totalDays < 30) {
        anomalies.push({
          id: anomalies.length + 1,
          description: `${goal.name} goal is behind schedule with only ${Math.ceil(totalDays)} days remaining`,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          severity: totalDays < 14 ? "high" : "medium",
          amount: `₹${(goal.target - goal.current).toLocaleString()} needed`,
          linkTo: "/goals"
        });
      }
    });
    
    // Check for unusual transactions
    if (transactions.length > 0) {
      // Find the largest recent transaction
      const recentTransactions = transactions.slice(0, 10);
      const largestTransaction = recentTransactions.reduce((prev, current) => 
        (prev.amount > current.amount) ? prev : current
      );
      
      // If it's significantly larger than average
      const averageAmount = recentTransactions.reduce((sum, tx) => sum + tx.amount, 0) / recentTransactions.length;
      if (largestTransaction.amount > averageAmount * 2) {
        anomalies.push({
          id: anomalies.length + 1,
          description: `Unusually large transaction: ${largestTransaction.description}`,
          date: new Date(largestTransaction.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          severity: "low",
          amount: `₹${largestTransaction.amount.toLocaleString()}`,
          linkTo: "/dashboard"
        });
      }
    }
    
    return anomalies;
  };
  
  // Sample anomalies that would typically be detected by an algorithm
  const anomalies = generateAnomalies();
  
  const visibleAnomalies = anomalies.filter(anomaly => !dismissedAnomalies.includes(anomaly.id));
  
  const dismissAnomaly = (id: number) => {
    const newDismissed = [...dismissedAnomalies, id];
    setDismissedAnomalies(newDismissed);
    localStorage.setItem('dismissedAnomalies', JSON.stringify(newDismissed));
    
    toast({
      title: "Anomaly dismissed",
      description: "You can reset all dismissed anomalies in settings",
    });
  };
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleReviewAllTransactions = () => {
    navigate('/dashboard');
    // Using setTimeout to ensure navigation completes before trying to scroll
    setTimeout(() => {
      const transactionsSection = document.getElementById('transactions');
      if (transactionsSection) {
        transactionsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log("Transactions section not found");
      }
    }, 300);
  };
  
  return (
    <Card className="flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Spending Anomalies 🚨</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Unusual spending patterns detected in your accounts
      </p>
      
      {visibleAnomalies.length > 0 ? (
        <div className="space-y-3">
          {visibleAnomalies.map((anomaly) => (
            <div key={anomaly.id} className="p-3 rounded-lg bg-secondary/50 text-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium mb-1">{anomaly.description}</div>
                  <div className="text-xs text-muted-foreground">{anomaly.date} • {anomaly.amount}</div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => dismissAnomaly(anomaly.id)}
                  className="p-1 h-8 w-8 ml-2"
                  title="Dismiss"
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-2 flex justify-between items-center">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(anomaly.severity)}`}>
                  {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)} severity
                </span>
                
                {anomaly.linkTo && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs"
                    onClick={() => navigate(anomaly.linkTo)}
                  >
                    View Details <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-muted-foreground text-sm">
          <Bell className="h-8 w-8 mb-2 opacity-30" />
          <p>No anomalies detected</p>
          <p className="text-xs">Your spending patterns look normal</p>
        </div>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-auto"
        onClick={handleReviewAllTransactions}
      >
        Review All Transactions
      </Button>
    </Card>
  );
};

export default AnomalyDetection;
