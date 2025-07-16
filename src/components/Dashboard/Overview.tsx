
import { mockData } from "@/lib/mockData";
import Card from "../ui/custom/Card";
import AnimatedNumber from "../ui/custom/AnimatedNumber";
import { ArrowUpRight, ArrowDownRight, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Overview = () => {
  const { balance, incomeVsExpense } = mockData;
  
  // Get the last month's income and expense
  const lastMonth = incomeVsExpense[incomeVsExpense.length - 1];
  const previousMonth = incomeVsExpense[incomeVsExpense.length - 2];
  
  // Calculate month-over-month changes
  const incomeChange = ((lastMonth.income - previousMonth.income) / previousMonth.income) * 100;
  const expenseChange = ((lastMonth.expense - previousMonth.expense) / previousMonth.expense) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Balance */}
      <Card className="flex flex-col" glassEffect hoverEffect>
        <div className="text-sm font-medium text-muted-foreground">Total Balance 💲</div>
        <AnimatedNumber 
          value={balance.total} 
          className="text-2xl font-semibold mt-2"
        />
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          Updated today
        </div>
      </Card>
      
      {/* Available Balance */}
      <Card className="flex flex-col" glassEffect hoverEffect>
        <div className="text-sm font-medium text-muted-foreground">Available 💵</div>
        <AnimatedNumber 
          value={balance.available} 
          className="text-2xl font-semibold mt-2"
        />
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          Ready to spend
        </div>
      </Card>
      
      {/* Monthly Income */}
      <Card className="flex flex-col" glassEffect hoverEffect>
        <div className="text-sm font-medium text-muted-foreground">Monthly Income 📈</div>
        <div className="flex items-center mt-2">
          <AnimatedNumber 
            value={lastMonth.income} 
            className="text-2xl font-semibold"
          />
          <ChangeIndicator value={incomeChange} />
        </div>
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          vs. previous month
        </div>
      </Card>
      
      {/* Monthly Expenses */}
      <Card className="flex flex-col" glassEffect hoverEffect>
        <div className="text-sm font-medium text-muted-foreground">Monthly Expenses 📊</div>
        <div className="flex items-center mt-2">
          <AnimatedNumber 
            value={lastMonth.expense} 
            className="text-2xl font-semibold"
          />
          <ChangeIndicator value={expenseChange} reverse />
        </div>
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          vs. previous month
        </div>
      </Card>
    </div>
  );
};

interface ChangeIndicatorProps {
  value: number;
  reverse?: boolean;
}

const ChangeIndicator = ({ value, reverse = false }: ChangeIndicatorProps) => {
  const isPositive = reverse ? value < 0 : value > 0;
  const isNegative = reverse ? value > 0 : value < 0;
  const absValue = Math.abs(value).toFixed(1);
  
  return (
    <div 
      className={cn(
        "flex items-center ml-2 px-1.5 py-0.5 rounded text-xs",
        isPositive && "text-green-600 bg-green-50",
        isNegative && "text-red-600 bg-red-50",
        value === 0 && "text-gray-600 bg-gray-50"
      )}
    >
      {isPositive && <ArrowUpRight size={12} className="mr-0.5" />}
      {isNegative && <ArrowDownRight size={12} className="mr-0.5" />}
      {value === 0 && <TrendingUp size={12} className="mr-0.5" />}
      {absValue}%
    </div>
  );
};

export default Overview;
