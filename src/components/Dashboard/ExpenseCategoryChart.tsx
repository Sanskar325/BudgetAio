
import { mockData } from "@/lib/mockData";
import Card from "../ui/custom/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseCategoryChart = () => {
  const { expenseCategories } = mockData;
  
  // Sort data by amount
  const sortedData = [...expenseCategories].sort((a, b) => b.amount - a.amount);
  
  return (
    <Card className="flex flex-col" glassEffect>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Expense Categories</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="category" 
              width={80}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Amount']}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.97)',
                padding: '8px 12px'
              }}
            />
            <Bar 
              dataKey="amount" 
              fill="#5AC8FA" 
              radius={[0, 4, 4, 0]} 
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ExpenseCategoryChart;
