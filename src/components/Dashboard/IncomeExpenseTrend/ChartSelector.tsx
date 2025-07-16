
import React from "react";
import { Button } from "../../ui/button";
import { BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";

interface ChartSelectorProps {
  chartType: "bar" | "line" | "area";
  setChartType: (type: "bar" | "line" | "area") => void;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({ chartType, setChartType }) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant={chartType === "bar" ? "default" : "outline"} 
        size="sm"
        onClick={() => setChartType("bar")}
        className="p-1 h-8 w-8"
      >
        <BarChart2 className="h-4 w-4" />
      </Button>
      <Button 
        variant={chartType === "line" ? "default" : "outline"} 
        size="sm"
        onClick={() => setChartType("line")}
        className="p-1 h-8 w-8"
      >
        <LineChartIcon className="h-4 w-4" />
      </Button>
      <Button 
        variant={chartType === "area" ? "default" : "outline"} 
        size="sm"
        onClick={() => setChartType("area")}
        className="p-1 h-8 w-8"
      >
        <PieChartIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChartSelector;
