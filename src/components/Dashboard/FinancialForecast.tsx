
import { useState } from "react";
import Card from "../ui/custom/Card";
import { LineChart, Hourglass, ChevronDown, ChevronUp } from "lucide-react";
import { mockData } from "@/lib/mockData";
import { Button } from "../ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

const FinancialForecast = () => {
  const [expanded, setExpanded] = useState(false);
  const [timeframe, setTimeframe] = useState("6months");
  const navigate = useNavigate();
  
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
  
  const insights = [
    "Your expenses are projected to increase by 16% over the next 6 months.",
    "Savings could decrease by 20% if current spending trends continue.",
    "Increasing your investments by just ₹1,000 monthly could grow your portfolio by ₹70,000+ in 5 years."
  ];

  const handleViewDetailedForecast = () => {
    navigate('/detailed-forecast');
  };
  
  return (
    <Card className="flex flex-col" glassEffect>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Financial Forecast</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="p-0 h-8 w-8"
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Button 
          variant={timeframe === "3months" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("3months")}
        >
          3 Months
        </Button>
        <Button 
          variant={timeframe === "6months" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("6months")}
        >
          6 Months
        </Button>
        <Button 
          variant={timeframe === "12months" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("12months")}
        >
          12 Months
        </Button>
      </div>
      
      <div className="h-48 md:h-64 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={forecastData[timeframe as keyof typeof forecastData]}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#66666622" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => `₹${value/1000}k`}
            />
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
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {expanded && (
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium">Key Insights:</h4>
          <ul className="text-sm space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex gap-2 items-start">
                <Hourglass className="h-4 w-4 mt-0.5 text-primary" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Button variant="outline" size="sm" className="mt-auto" onClick={handleViewDetailedForecast}>
        Get Detailed Forecast Report
      </Button>
    </Card>
  );
};

export default FinancialForecast;
