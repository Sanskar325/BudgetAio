
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartDataPoint, tooltipConfig, chartConfig } from "./ChartConfig";

interface AreaChartComponentProps {
  data: ChartDataPoint[];
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
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
        <Area 
          type="monotone" 
          dataKey="income" 
          name={chartConfig.income.name} 
          fill={`${chartConfig.income.color}33`} 
          stroke={chartConfig.income.color} 
          strokeWidth={2} 
        />
        <Area 
          type="monotone" 
          dataKey="expense" 
          name={chartConfig.expense.name} 
          fill={`${chartConfig.expense.color}33`} 
          stroke={chartConfig.expense.color} 
          strokeWidth={2} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
