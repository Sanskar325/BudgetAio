
import { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import Overview from "@/components/Dashboard/Overview";
import BudgetManager from "@/components/Dashboard/BudgetManager";
import TransactionHistory from "@/components/Dashboard/TransactionHistory";
import InvestmentAdvice from "@/components/Dashboard/InvestmentAdvice";
import AnomalyDetection from "@/components/Dashboard/AnomalyDetection";
import FinancialForecast from "@/components/Dashboard/FinancialForecast";
import Reminders from "@/components/Dashboard/Reminders";
import AiFinancialAdvisor from "@/components/Dashboard/AiFinancialAdvisor";

// New components
import IncomeCard from "@/components/Dashboard/IncomeCard";
import BudgetSummaryCards from "@/components/Dashboard/BudgetSummaryCards";
import ActivitySection from "@/components/Dashboard/ActivitySection";
import LatestBudgets from "@/components/Dashboard/LatestBudgets";
import IncomeEditDialog from "@/components/Dashboard/IncomeEditDialog";

const DashboardPage = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Shopping",
      items: 1,
      allocated: 2300,
      spent: 150,
      emoji: "🛒"
    },
    {
      id: 2,
      category: "Home Decor",
      items: 3,
      allocated: 3800,
      spent: 3300,
      emoji: "🏡"
    }
  ]);
  
  // Set monthly income to 90000 as requested
  const [monthlyIncome, setMonthlyIncome] = useState(90000);
  
  // Calculate annual income (monthly income × 12)
  const annualIncome = monthlyIncome * 12;
  
  // Dialog state for income edit popup
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Load budgets from localStorage
    const savedBudgets = localStorage.getItem('budgets');
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
    
    // Load monthly income from localStorage if available
    const savedMonthlyIncome = localStorage.getItem('monthlyIncome');
    if (savedMonthlyIncome) {
      setMonthlyIncome(JSON.parse(savedMonthlyIncome));
    }
  }, []);
  
  // Save monthly income to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('monthlyIncome', JSON.stringify(monthlyIncome));
  }, [monthlyIncome]);

  // Get the last two budgets for display
  const latestBudgets = budgets.slice(-2);

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6 w-full max-w-full">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Hi, Welcome Back 👋</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Here's what's happening with your money. Let's manage your expenses!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full">
          {/* Income Card */}
          <IncomeCard 
            monthlyIncome={monthlyIncome} 
            annualIncome={annualIncome} 
            onEditClick={() => setDialogOpen(true)} 
          />
          
          {/* Budget Summary Cards */}
          <BudgetSummaryCards budgets={budgets} />
        </div>
        
        {/* Income Edit Dialog */}
        <IncomeEditDialog 
          dialogOpen={dialogOpen} 
          setDialogOpen={setDialogOpen} 
          monthlyIncome={monthlyIncome} 
          setMonthlyIncome={setMonthlyIncome} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 w-full">
          <div className="lg:col-span-2">
            <ActivitySection />
          </div>
          
          <div>
            <LatestBudgets latestBudgets={latestBudgets} />
          </div>
        </div>
        
        {/* Financial Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full">
          <FinancialForecast />
          <InvestmentAdvice />
          <AnomalyDetection />
        </div>
        
        <TransactionHistory />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 w-full">
          <Reminders />
          <AiFinancialAdvisor />
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
