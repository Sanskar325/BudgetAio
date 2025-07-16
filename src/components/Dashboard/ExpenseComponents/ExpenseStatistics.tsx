
import React from "react";
import Card from "@/components/ui/custom/Card";

interface ExpenseStatisticsProps {
  totalMonthlyExpenses: number;
  averageDailySpend: number;
  largestExpense: {
    amount: number;
    category: string;
    date: string;
  };
  monthlyChangePercentage: number;
  dailyChangePercentage: number;
}

const ExpenseStatistics = ({
  totalMonthlyExpenses,
  averageDailySpend,
  largestExpense,
  monthlyChangePercentage,
  dailyChangePercentage
}: ExpenseStatisticsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <Card glassEffect>
        <div className="p-4 md:p-6">
          <div className="text-sm font-medium text-muted-foreground">Total Expenses (This Month)</div>
          <div className="text-2xl md:text-3xl font-semibold mt-2">₹{totalMonthlyExpenses.toLocaleString()}</div>
          <div className={`flex items-center mt-1 text-xs ${monthlyChangePercentage > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {monthlyChangePercentage > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m6 9 6 6 6-6"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m18 15-6-6-6 6"></path></svg>
            )}
            {Math.abs(monthlyChangePercentage)}% vs last month
          </div>
        </div>
      </Card>
      
      <Card glassEffect>
        <div className="p-4 md:p-6">
          <div className="text-sm font-medium text-muted-foreground">Average Daily Spend</div>
          <div className="text-2xl md:text-3xl font-semibold mt-2">₹{averageDailySpend.toLocaleString()}</div>
          <div className={`flex items-center mt-1 text-xs ${dailyChangePercentage > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {dailyChangePercentage > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m6 9 6 6 6-6"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m18 15-6-6-6 6"></path></svg>
            )}
            {Math.abs(dailyChangePercentage)}% vs last month
          </div>
        </div>
      </Card>
      
      <Card glassEffect>
        <div className="p-4 md:p-6">
          <div className="text-sm font-medium text-muted-foreground">Largest Expense</div>
          <div className="text-2xl md:text-3xl font-semibold mt-2">₹{largestExpense.amount.toLocaleString()}</div>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            {largestExpense.category} - {largestExpense.date}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseStatistics;
