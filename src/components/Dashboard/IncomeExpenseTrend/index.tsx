
import { useState } from "react";
import { mockData } from "@/lib/mockData";
import Card from "../../ui/custom/Card";
import ChartSelector from "./ChartSelector";
import BarChartComponent from "./BarChartComponent";
import LineChartComponent from "./LineChartComponent";
import AreaChartComponent from "./AreaChartComponent";

const IncomeExpenseTrend = () => {
  const { incomeVsExpense } = mockData;
  const [chartType, setChartType] = useState<"bar" | "line" | "area">("bar");
  
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <BarChartComponent data={incomeVsExpense} />;
      case "line":
        return <LineChartComponent data={incomeVsExpense} />;
      case "area":
        return <AreaChartComponent data={incomeVsExpense} />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="flex flex-col" glassEffect>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Income vs Expense Trend</h3>
        <ChartSelector chartType={chartType} setChartType={setChartType} />
      </div>
      
      <div className="h-64 md:h-56 lg:h-64">
        {renderChart()}
      </div>
    </Card>
  );
};

export default IncomeExpenseTrend;
