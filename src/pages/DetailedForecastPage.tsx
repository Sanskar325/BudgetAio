import React from "react";
 import AppLayout from "@/components/Layout/AppLayout";
 import Card from "@/components/ui/custom/Card";
 import { LineChart, Hourglass, ChevronDown, ChevronUp, PlusCircle, Info } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { mockData } from "@/lib/mockData";
 import { 
   AreaChart, 
   Area, 
   XAxis, 
   YAxis, 
   CartesianGrid, 
   Tooltip, 
   ResponsiveContainer,
   BarChart,
   Bar,
   Legend,
   LineChart as RechartsLineChart,
   Line
 } from 'recharts';
 
 const DetailedForecastPage = () => {
   const [selectedTimeframe, setSelectedTimeframe] = React.useState("6months");
   const [selectedCategory, setSelectedCategory] = React.useState("all");
   
   // Sample forecast data
   const forecastData = {
     "3months": [
       { name: "Jun", expenses: 30000, savings: 15000, investments: 5000 },
       { name: "Jul", expenses: 32000, savings: 14000, investments: 5000 },
       { name: "Aug", expenses: 28000, savings: 16000, investments: 5000 },
     ],
     "6months": [
       { name: "Jun", expenses: 30000, savings: 15000, investments: 5000 },
       { name: "Jul", expenses: 32000, savings: 14000, investments: 5000 },
       { name: "Aug", expenses: 28000, savings: 16000, investments: 5000 },
       { name: "Sep", expenses: 31000, savings: 14500, investments: 5000 },
       { name: "Oct", expenses: 33000, savings: 13500, investments: 5000 },
       { name: "Nov", expenses: 35000, savings: 12000, investments: 5000 },
     ],
     "12months": [
       { name: "Jun", expenses: 30000, savings: 15000, investments: 5000 },
       { name: "Jul", expenses: 32000, savings: 14000, investments: 5000 },
       { name: "Aug", expenses: 28000, savings: 16000, investments: 5000 },
       { name: "Sep", expenses: 31000, savings: 14500, investments: 5000 },
       { name: "Oct", expenses: 33000, savings: 13500, investments: 5000 },
       { name: "Nov", expenses: 35000, savings: 12000, investments: 5000 },
       { name: "Dec", expenses: 40000, savings: 10000, investments: 5000 },
       { name: "Jan", expenses: 32000, savings: 12000, investments: 6000 },
       { name: "Feb", expenses: 31000, savings: 13000, investments: 6000 },
       { name: "Mar", expenses: 33000, savings: 13000, investments: 6000 },
       { name: "Apr", expenses: 34000, savings: 12500, investments: 6000 },
       { name: "May", expenses: 35000, savings: 12000, investments: 6000 },
     ]
   };
 
   const categoricalForecast = {
     "Shopping": [
       { name: "Jun", amount: 5000 },
       { name: "Jul", amount: 5500 },
       { name: "Aug", amount: 4800 },
       { name: "Sep", amount: 6000 },
       { name: "Oct", amount: 5300 },
       { name: "Nov", amount: 5700 },
     ],
     "Food & Dining": [
       { name: "Jun", amount: 8000 },
       { name: "Jul", amount: 8200 },
       { name: "Aug", amount: 7800 },
       { name: "Sep", amount: 8100 },
       { name: "Oct", amount: 8500 },
       { name: "Nov", amount: 8300 },
     ],
     "Entertainment": [
       { name: "Jun", amount: 3000 },
       { name: "Jul", amount: 3500 },
       { name: "Aug", amount: 2800 },
       { name: "Sep", amount: 3200 },
       { name: "Oct", amount: 3400 },
       { name: "Nov", amount: 3700 },
     ]
   };
   
   const insights = [
     {
       title: "Expense Trends",
       items: [
         "Your expenses are projected to increase by 16% over the next 6 months.",
         "Entertainment spending shows the highest growth rate at 23%.",
         "Shopping expenses fluctuate seasonally, with peaks in November and December."
       ]
     },
     {
       title: "Savings Potential",
       items: [
         "Savings could decrease by 20% if current spending trends continue.",
         "Reducing Food & Dining expenses by 10% would increase monthly savings by ₹800.",
         "Setting up auto-transfer to savings would improve your savings rate by 15%."
       ]
     },
     {
       title: "Investment Opportunities",
       items: [
         "Increasing your investments by just ₹1,000 monthly could grow your portfolio by ₹70,000+ in 5 years.",
         "Your current investment strategy will yield approximately 8% annual returns.",
         "Diversifying into index funds could improve returns by 2-3% annually."
       ]
     },
     {
       title: "Goal Alignment",
       items: [
         "Your emergency fund will be fully funded in approximately 6 months at current rates.",
         "The vacation fund target will be met 2 months earlier than planned.",
         "Your car savings goal is projected to be delayed by 3 months based on current saving rate."
       ]
     }
   ];
 
   const categories = ["all", "Shopping", "Food & Dining", "Entertainment", "Transportation", "Housing"];
   
   return (
     <AppLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Financial Forecast</h1>
             <p className="text-muted-foreground mt-1">
               Detailed projections and insights for your financial future
             </p>
           </div>
         </div>
         
         <div className="flex flex-wrap gap-3 mb-6">
           <Button 
             variant={selectedTimeframe === "3months" ? "default" : "outline"} 
             onClick={() => setSelectedTimeframe("3months")}
           >
             3 Months
           </Button>
           <Button 
             variant={selectedTimeframe === "6months" ? "default" : "outline"}
             onClick={() => setSelectedTimeframe("6months")}
           >
             6 Months
           </Button>
           <Button 
             variant={selectedTimeframe === "12months" ? "default" : "outline"}
             onClick={() => setSelectedTimeframe("12months")}
           >
             12 Months
           </Button>
         </div>
         
         <Card className="p-4 md:p-5" glassEffect>
           <h2 className="text-xl font-medium mb-4">Income, Expenses & Savings Forecast</h2>
           <div className="h-72 md:h-96 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart
                 data={forecastData[selectedTimeframe as keyof typeof forecastData]}
                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
               >
                 <CartesianGrid strokeDasharray="3 3" stroke="#66666622" />
                 <XAxis dataKey="name" />
                 <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                 <Tooltip 
                   formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                   contentStyle={{
                     borderRadius: '8px',
                     border: 'none',
                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                     background: 'rgba(255, 255, 255, 0.97)',
                     padding: '8px 12px'
                   }}
                 />
                 <Area type="monotone" dataKey="expenses" name="Expenses" stackId="1" stroke="#FF3B30" fill="#FF3B3050" />
                 <Area type="monotone" dataKey="savings" name="Savings" stackId="2" stroke="#34C759" fill="#34C75950" />
                 <Area type="monotone" dataKey="investments" name="Investments" stackId="3" stroke="#AF52DE" fill="#AF52DE50" />
                 <Legend />
               </AreaChart>
             </ResponsiveContainer>
           </div>
         </Card>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card className="p-4 md:p-5" glassEffect>
             <h2 className="text-xl font-medium mb-4">Category Breakdown Forecast</h2>
             
             <div className="flex flex-wrap gap-2 mb-4">
               {categories.map(category => (
                 <Button 
                   key={category}
                   variant={selectedCategory === category ? "default" : "outline"} 
                   size="sm"
                   onClick={() => setSelectedCategory(category)}
                 >
                   {category === "all" ? "All Categories" : category}
                 </Button>
               ))}
             </div>
             
             <div className="h-64 md:h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 {selectedCategory === "all" ? (
                   <BarChart
                     data={forecastData[selectedTimeframe as keyof typeof forecastData]}
                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                   >
                     <CartesianGrid strokeDasharray="3 3" stroke="#66666622" />
                     <XAxis dataKey="name" />
                     <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                     <Tooltip 
                       formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                       contentStyle={{
                         borderRadius: '8px',
                         border: 'none',
                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                         background: 'rgba(255, 255, 255, 0.97)',
                         padding: '8px 12px'
                       }}
                     />
                     <Legend />
                     <Bar dataKey="expenses" name="Expenses" fill="#FF3B30" />
                   </BarChart>
                 ) : (
                   <RechartsLineChart
                     data={categoricalForecast[selectedCategory as keyof typeof categoricalForecast]}
                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                   >
                     <CartesianGrid strokeDasharray="3 3" stroke="#66666622" />
                     <XAxis dataKey="name" />
                     <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                     <Tooltip 
                       formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                       contentStyle={{
                         borderRadius: '8px',
                         border: 'none',
                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                         background: 'rgba(255, 255, 255, 0.97)',
                         padding: '8px 12px'
                       }}
                     />
                     <Legend />
                     <Line type="monotone" dataKey="amount" name={selectedCategory} stroke="#5AC8FA" strokeWidth={2} />
                   </RechartsLineChart>
                 )}
               </ResponsiveContainer>
             </div>
           </Card>
           
           <Card className="p-4 md:p-5" glassEffect>
             <h2 className="text-xl font-medium mb-4">Financial Insights</h2>
             
             <Tabs defaultValue="expense-trends">
               <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-4">
                 {insights.map((insight, index) => (
                   <TabsTrigger key={index} value={insight.title.toLowerCase().replace(/\s+/g, '-')}>
                     {insight.title}
                   </TabsTrigger>
                 ))}
               </TabsList>
               
               {insights.map((insight, index) => (
                 <TabsContent key={index} value={insight.title.toLowerCase().replace(/\s+/g, '-')}>
                   <div className="space-y-3">
                     {insight.items.map((item, itemIndex) => (
                       <div key={itemIndex} className="flex gap-2 p-3 bg-secondary/30 rounded-lg">
                         <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                         <span>{item}</span>
                       </div>
                     ))}
                   </div>
                 </TabsContent>
               ))}
             </Tabs>
           </Card>
         </div>
         
         <Card className="p-4 md:p-5 border-primary/50" glassEffect>
           <div className="flex items-center gap-2 mb-4">
             <PlusCircle className="h-5 w-5 text-primary" />
             <h2 className="text-xl font-medium">Recommendations</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 bg-secondary/30 rounded-lg">
               <h3 className="font-medium mb-2">Optimize Spending</h3>
               <p className="text-sm text-muted-foreground mb-3">Based on your spending patterns, we recommend these actions:</p>
               <ul className="list-disc list-inside space-y-1 text-sm">
                 <li>Reduce restaurant expenses by 15% to save ₹1,200 monthly</li>
                 <li>Review subscription services to eliminate unused ones</li>
                 <li>Consider bulk purchases for frequently used items</li>
               </ul>
             </div>
             
             <div className="p-4 bg-secondary/30 rounded-lg">
               <h3 className="font-medium mb-2">Savings Strategy</h3>
               <p className="text-sm text-muted-foreground mb-3">Improve your savings rate with these approaches:</p>
               <ul className="list-disc list-inside space-y-1 text-sm">
                 <li>Increase emergency fund contribution by ₹2,000 monthly</li>
                 <li>Set up automated transfers on paydays</li>
                 <li>Consider a high-yield savings account (5.5% vs current 3.2%)</li>
               </ul>
             </div>
             
             <div className="p-4 bg-secondary/30 rounded-lg">
               <h3 className="font-medium mb-2">Investment Opportunities</h3>
               <p className="text-sm text-muted-foreground mb-3">Optimize your investment portfolio:</p>
               <ul className="list-disc list-inside space-y-1 text-sm">
                 <li>Increase SIP contributions by 10%</li>
                 <li>Add exposure to index funds for diversification</li>
                 <li>Review and rebalance portfolio quarterly</li>
               </ul>
             </div>
             
             <div className="p-4 bg-secondary/30 rounded-lg">
               <h3 className="font-medium mb-2">Goal Acceleration</h3>
               <p className="text-sm text-muted-foreground mb-3">Reach your goals faster with these adjustments:</p>
               <ul className="list-disc list-inside space-y-1 text-sm">
                 <li>Increase car fund contribution by ₹1,000 to meet target date</li>
                 <li>Consider alternative vacation options to reduce required savings</li>
                 <li>Explore additional income sources for faster goal achievement</li>
               </ul>
             </div>
           </div>
         </Card>
       </div>
     </AppLayout>
   );
 };
 
 export default DetailedForecastPage;