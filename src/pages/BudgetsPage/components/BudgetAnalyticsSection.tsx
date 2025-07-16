
import { PlaceBudgetChecker, BudgetRecommendations, MultiPeriodBudgetView } from "@/components/Dashboard/BudgetComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Target, TrendingUp } from "lucide-react";

interface BudgetAnalyticsSectionProps {
  budgets: any[];
  monthlyIncome: number;
}

const BudgetAnalyticsSection = ({ budgets, monthlyIncome }: BudgetAnalyticsSectionProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview" className="flex items-center gap-1">
          <PieChart className="h-4 w-4" /> Overview
        </TabsTrigger>
        <TabsTrigger value="insights" className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" /> Insights
        </TabsTrigger>
        <TabsTrigger value="checker" className="flex items-center gap-1">
          <Target className="h-4 w-4" /> Purchase Checker
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <MultiPeriodBudgetView budgets={budgets} />
          <BudgetRecommendations budgets={budgets} />
        </div>
      </TabsContent>
      
      <TabsContent value="insights">
        <BudgetRecommendations budgets={budgets} />
      </TabsContent>
      
      <TabsContent value="checker">
        <PlaceBudgetChecker budgets={budgets} />
      </TabsContent>
    </Tabs>
  );
};

export default BudgetAnalyticsSection;