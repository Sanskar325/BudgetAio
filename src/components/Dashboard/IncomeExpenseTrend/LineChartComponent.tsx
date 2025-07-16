
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartDataPoint, tooltipConfig, chartConfig } from "./ChartConfig";

interface LineChartComponentProps {
  data: ChartDataPoint[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={tooltipConfig.formatter}
          contentStyle={tooltipConfig.contentStyle}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="income" 
          name={chartConfig.income.name} 
          stroke={chartConfig.income.color} 
          strokeWidth={2} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6 }} 
        />
        <Line 
          type="monotone" 
          dataKey="expense" 
          name={chartConfig.expense.name} 
          stroke={chartConfig.expense.color} 
          strokeWidth={2} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
