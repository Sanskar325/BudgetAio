
import { useEffect, useState } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import SavingsGoals from "@/components/Dashboard/SavingsGoals";
import Card from "@/components/ui/custom/Card";
import ProgressCircle from "@/components/ui/custom/ProgressCircle";
import AnimatedNumber from "@/components/ui/custom/AnimatedNumber";
import { Award, Flag, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockData } from "@/lib/mockData";

const GoalsPage = () => {
  // State to track goals
  const [goalsStats, setGoalsStats] = useState({
    total: 3,
    onTrack: 2
  });
  
  // Load goals from localStorage when component mounts
  useEffect(() => {
    const savedGoals = localStorage.getItem('savingsGoals');
    if (savedGoals) {
      const goals = JSON.parse(savedGoals);
      
      // Calculate how many goals are on track (more than 50% complete)
      const totalGoals = goals.length;
      const onTrackGoals = goals.filter(goal => 
        (goal.current / goal.target) > 0.5
      ).length;
      
      setGoalsStats({
        total: totalGoals || 3, // Default to 3 if no goals
        onTrack: onTrackGoals || 2  // Default to 2 if no goals on track
      });
    }
  }, []);
  
  // Calculate days left until end of year
  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const daysLeft = Math.ceil((endOfYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate financial health score (mock)
  const financialHealthScore = 78;
  
  // Achievement list
  const achievements = [
    { title: "Consistent Saver", description: "Saved money 5 weeks in a row", completed: true },
    { title: "Budget Master", description: "Stayed under budget for 3 months", completed: true },
    { title: "Goal Setter", description: "Created 3 savings goals", completed: true },
    { title: "Milestone Reached", description: "Reached 50% of a savings goal", completed: false },
    { title: "Emergency Ready", description: "Built a full emergency fund", completed: false }
  ];
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Financial Goals</h1>
            <p className="text-muted-foreground mt-1">
              Set and track your savings objectives
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-primary/10 p-2 rounded-lg text-sm">
            <Target className="h-4 w-4 text-primary" />
            <span>You're on track to meet {goalsStats.onTrack} of your {goalsStats.total} goals this year!</span>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Target className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-1">
              <Flag className="h-4 w-4" /> My Goals
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1">
              <Award className="h-4 w-4" /> Achievements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
              <Card className="p-4 md:p-5 card-padding-laptop" glassEffect>
                <h3 className="text-lg font-medium mb-3">Financial Health</h3>
                <div className="flex flex-col items-center">
                  <ProgressCircle
                    value={financialHealthScore}
                    maxValue={100}
                    color="#34C759"
                    backgroundColor="rgba(200, 200, 200, 0.2)"
                    size={120}
                    strokeWidth={8}
                  />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold">{financialHealthScore}/100</div>
                    <div className="text-sm text-muted-foreground">Good Financial Health</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 md:p-5 card-padding-laptop" glassEffect>
                <h3 className="text-lg font-medium mb-3">Annual Savings</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current</span>
                      <span>₹8,750 / ₹15,000</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: "58%" }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Monthly Target</div>
                        <div className="text-xl font-medium">₹1,250</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Days Left</div>
                        <div className="text-xl font-medium">{daysLeft}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 md:p-5 card-padding-laptop" glassEffect>
                <h3 className="text-lg font-medium mb-3">Goal Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">New Car</div>
                      <div className="text-sm text-muted-foreground">₹7,500 / ₹25,000</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">30%</div>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "30%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Vacation</div>
                      <div className="text-sm text-muted-foreground">₹2,200 / ₹3,000</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">73%</div>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: "73%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Emergency Fund</div>
                      <div className="text-sm text-muted-foreground">₹12,000 / ₹15,000</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">80%</div>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-6" glassEffect>
              <h3 className="text-lg font-medium mb-4">Goal Timeline & Projection</h3>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                  <div className="space-y-8">
                    <div className="relative pl-10">
                      <div className="absolute left-[0.65rem] -translate-x-1/2 top-1.5 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <h4 className="font-medium">Emergency Fund</h4>
                        <p className="text-sm text-muted-foreground">Expected completion: July 2025</p>
                        <div className="mt-2 w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-[0.65rem] -translate-x-1/2 top-1.5 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <h4 className="font-medium">Vacation</h4>
                        <p className="text-sm text-muted-foreground">Expected completion: September 2025</p>
                        <div className="mt-2 w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full" style={{ width: "73%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-[0.65rem] -translate-x-1/2 top-1.5 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <h4 className="font-medium">New Car</h4>
                        <p className="text-sm text-muted-foreground">Expected completion: March 2026</p>
                        <div className="mt-2 w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals">
            <SavingsGoals />
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card className="p-6" glassEffect>
              <h3 className="text-lg font-medium mb-4">Your Financial Achievements</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border ${achievement.completed 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-secondary/30 border-secondary/50'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${achievement.completed 
                        ? 'bg-green-500/20' 
                        : 'bg-secondary/50'}`}>
                        <Award className={`h-5 w-5 ${achievement.completed 
                          ? 'text-green-500' 
                          : 'text-muted-foreground'}`} 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${achievement.completed 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-secondary/50 text-muted-foreground'}`}>
                            {achievement.completed ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default GoalsPage;
