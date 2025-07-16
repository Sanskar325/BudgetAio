
import AppLayout from "@/components/Layout/AppLayout";
import ExpenseTracker from "@/components/Dashboard/ExpenseTracker";
import ExpenseCategoryChart from "@/components/Dashboard/ExpenseCategoryChart";
import ExpenseStatistics from "@/components/Dashboard/ExpenseComponents/ExpenseStatistics";
import Card from "@/components/ui/custom/Card";
import { PieChart, Target, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const [monthlyIncome, setMonthlyIncome] = useState(90000);
  const [totalBudgeted, setTotalBudgeted] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  
  // Sample data that would typically come from a data hook
  const [expenseStats, setExpenseStats] = useState({
    totalMonthlyExpenses: 4830,
    averageDailySpend: 161,
    largestExpense: {
      amount: 1245,
      category: "Home Decor",
      date: "May 15"
    },
    monthlyChangePercentage: 15.3,
    dailyChangePercentage: -3.2
  });

  useEffect(() => {
    // Load data from localStorage
    const savedMonthlyIncome = localStorage.getItem('monthlyIncome');
    const savedTotalBudgeted = localStorage.getItem('totalBudgeted');
    const savedTotalSpent = localStorage.getItem('totalSpent');
    
    if (savedMonthlyIncome) {
      setMonthlyIncome(JSON.parse(savedMonthlyIncome));
    }
    
    if (savedTotalBudgeted) {
      setTotalBudgeted(Number(savedTotalBudgeted));
    }
    
    if (savedTotalSpent) {
      setTotalSpent(Number(savedTotalSpent));
      
      // Update expense stats with the actual total spent
      setExpenseStats(prev => ({
        ...prev,
        totalMonthlyExpenses: Number(savedTotalSpent)
      }));
    }
  }, []);

  // Tips for reducing expenses
  const expenseTips = [
    "Create a detailed budget for each spending category",
    "Use cashback apps and credit cards for regular purchases",
    "Meal prep to reduce food delivery expenses",
    "Cancel unused subscriptions and memberships",
    "Wait 24 hours before making non-essential purchases"
  ];
  
  // Calculate savings recommendation based on income and expenses
  const savingsRecommendation = Math.round(monthlyIncome * 0.2);
  const currentSavings = monthlyIncome - expenseStats.totalMonthlyExpenses;
  const savingsShortfall = Math.max(0, savingsRecommendation - currentSavings);

  return (
    <AppLayout>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Expenses 💸</h1>
            <p className="text-muted-foreground mt-1">
              Track and analyze your spending patterns
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-primary/10 p-2 rounded-lg text-sm">
            <TrendingDown className="h-4 w-4 text-green-500" />
            <span>
              {savingsShortfall > 0 
                ? `Reduce expenses by ₹${savingsShortfall.toLocaleString()} to reach your 20% savings goal`
                : `Great job! You're saving more than the recommended 20% of your income`
              }
            </span>
          </div>
        </div>
        
        <ExpenseStatistics 
          totalMonthlyExpenses={expenseStats.totalMonthlyExpenses}
          averageDailySpend={expenseStats.averageDailySpend}
          largestExpense={expenseStats.largestExpense}
          monthlyChangePercentage={expenseStats.monthlyChangePercentage}
          dailyChangePercentage={expenseStats.dailyChangePercentage}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 flex flex-col" glassEffect>
            <div className="text-sm font-medium text-muted-foreground">Monthly Income</div>
            <div className="text-xl font-semibold mt-2">₹{monthlyIncome.toLocaleString()}</div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-auto text-xs flex items-center justify-between"
              onClick={() => navigate('/dashboard')}
            >
              Update Income <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Card>
          
          <Card className="p-4 flex flex-col" glassEffect>
            <div className="text-sm font-medium text-muted-foreground">Total Budgetes</div>
            <div className="text-xl font-semibold mt-2">₹{totalBudgeted.toLocaleString()}</div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-auto text-xs flex items-center justify-between"
              onClick={() => navigate('/budgets')}
            >
              Manage Budgets <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Card>
          
          <Card className="p-4 flex flex-col" glassEffect>
            <div className="text-sm font-medium text-muted-foreground">Current Savings</div>
            <div className="text-xl font-semibold mt-2">₹{currentSavings.toLocaleString()}</div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-auto text-xs flex items-center justify-between"
              onClick={() => navigate('/goals')}
            >
              Set Savings Goals <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Card>
        </div>
        
        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="tracker" className="flex items-center gap-1">
              <PieChart className="h-4 w-4" /> Expense Tracker
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> Categories
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-1">
              <Target className="h-4 w-4" /> Saving Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracker" className="space-y-4">
            <ExpenseTracker />
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <ExpenseCategoryChart />
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            <Card className="p-6" glassEffect>
              <h3 className="text-lg font-medium mb-4">Smart Expense Reduction Tips</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-secondary/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-2">Top Ways to Save</h4>
                  <ul className="space-y-2">
                    {expenseTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          {index + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-secondary/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-2">Expense Insights</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm mb-1">Your highest expense category is <span className="font-medium">Home Decor</span></p>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm mb-1">You spend most on <span className="font-medium">Weekends</span></p>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm mb-1">Recurring subscriptions: <span className="font-medium">₹1,250/month</span></p>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ExpensesPage;
