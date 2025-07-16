
import React from "react";
import { TooltipProps } from "recharts";

export interface ChartDataPoint {
  month: string;
  income: number;
  expense: number;
}

export const tooltipConfig = {
  formatter: (value: number) => [`₹${value.toFixed(2)}`, ''],
  contentStyle: {
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.97)',
    padding: '8px 12px'
  }
};

export const chartConfig = {
  income: {
    name: "Income",
    color: "#34C759"
  },
  expense: {
    name: "Expense",
    color: "#FF3B30"
  }
};
