
import AppLayout from "@/components/Layout/AppLayout";
import Overview from "@/components/Dashboard/Overview";
import ExpenseTracker from "@/components/Dashboard/ExpenseTracker";
import BudgetManager from "@/components/Dashboard/BudgetManager";
import SavingsGoals from "@/components/Dashboard/SavingsGoals";
import IncomeExpenseTrend from "@/components/Dashboard/IncomeExpenseTrend";
import ExpenseCategoryChart from "@/components/Dashboard/ExpenseCategoryChart";
import Reminders from "@/components/Dashboard/Reminders";
import Card from "@/components/ui/custom/Card";
import AiFinancialAdvisor from "@/components/Dashboard/AiFinancialAdvisor";

const Index = () => {
  return (
    <AppLayout>
      {/* Background image */}
      <div className="dashboard-bg"></div>
      
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Financial Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your finances, manage budgets, and reach your goals
            </p>
          </div>
          
          {/* Hero image */}
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600" 
              alt="Financial Planning" 
              className="finance-image h-32 w-auto object-cover" 
            />
          </div>
        </div>
        
        <section id="dashboard">
          <Overview />
        </section>
        
        <section id="transactions">
          <IncomeExpenseTrend />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <section id="expenses">
                <ExpenseTracker />
              </section>
              <ExpenseCategoryChart />
              
              {/* Add AI Financial Advisor before the tips card */}
              <section id="ai-advisor">
                <AiFinancialAdvisor />
              </section>
              
              {/* Financial Tips with image */}
              <Card className="p-0 overflow-hidden" glassEffect>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800" 
                      alt="Financial Planning" 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-lg font-medium mb-2">Financial Tips</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Building good financial habits can help you reach your goals faster
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Create an emergency fund covering 3-6 months of expenses</li>
                      <li>Invest at least 15% of your income for retirement</li>
                      <li>Limit your spending on non-essential items</li>
                      <li>Pay off high-interest debt as quickly as possible</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div>
            <div className="space-y-6">
              <section id="budgets">
                <BudgetManager />
              </section>
              <section id="goals">
                <SavingsGoals />
              </section>
              <section id="reminders">
                <Reminders />
              </section>
              
              {/* Motivational quote with image background */}
              <Card className="relative p-0 overflow-hidden h-48" hoverEffect>
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=1000" 
                    alt="Motivational Background" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="relative p-6 flex flex-col justify-center items-center h-full text-white">
                  <p className="text-lg font-medium italic mb-2 text-center">
                    "The art is not in making money, but in keeping it."
                  </p>
                  <p className="text-sm">- Proverb</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
