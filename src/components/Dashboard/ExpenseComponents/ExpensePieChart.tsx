
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ExpensePieChartProps {
  expenseCategories: Array<{
    category: string;
    amount: number;
  }>;
}

const ExpensePieChart = ({ expenseCategories }: ExpensePieChartProps) => {
  const COLORS = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#5AC8FA', '#AF52DE'];
  
  return (
    <>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseCategories}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={50}
              paddingAngle={2}
              dataKey="amount"
              animationDuration={1000}
              animationBegin={200}
            >
              {expenseCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {expenseCategories.slice(0, 4).map((category, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }} 
            />
            <span className="text-sm truncate">{category.category}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpensePieChart;
