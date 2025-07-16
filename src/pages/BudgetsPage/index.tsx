
import { useState, useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import { BudgetGrid, BudgetAnalyticsSection } from './components';

const BudgetsPage = () => {
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
    },
    {
      id: 3,
      category: "Garden",
      items: 2,
      allocated: 1500,
      spent: 140,
      emoji: "🌱"
    },
    {
      id: 4,
      category: "Car",
      items: 1,
      allocated: 2500,
      spent: 120,
      emoji: "🚗"
    },
    {
      id: 5,
      category: "Youtube",
      items: 2,
      allocated: 5000,
      spent: 1100,
      emoji: "📺"
    }
  ]);

  useEffect(() => {
    // Load budgets from localStorage if they exist
    const savedBudgets = localStorage.getItem('budgets');
    if (savedBudgets) {
      const parsedBudgets = JSON.parse(savedBudgets);
      setBudgets(parsedBudgets);
      
      // Update the total number of budgets in localStorage for dashboard
      localStorage.setItem('totalBudgets', String(parsedBudgets.length));
    }
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Budgets</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your spending limits by category
          </p>
        </div>
        
        <BudgetAnalyticsSection budgets={budgets} />
        <BudgetGrid budgets={budgets} setBudgets={setBudgets} />
      </div>
    </AppLayout>
  );
};

export default BudgetsPage;