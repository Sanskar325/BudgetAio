
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartDataPoint, tooltipConfig, chartConfig } from "./ChartConfig";

interface BarChartComponentProps {
  data: ChartDataPoint[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <Bar 
          dataKey="income" 
          name={chartConfig.income.name} 
          fill={chartConfig.income.color} 
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          dataKey="expense" 
          name={chartConfig.expense.name} 
          fill={chartConfig.expense.color} 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
