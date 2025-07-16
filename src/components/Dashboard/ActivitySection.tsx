
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Card from "../ui/custom/Card";
import IncomeExpenseTrend from "./IncomeExpenseTrend";

const ActivitySection = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-4 md:p-5 text-left" glassEffect>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base md:text-lg font-medium">Activity 📊</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/expenses')} className="text-xs">
          View All Expenses
        </Button>
      </div>
      <IncomeExpenseTrend />
    </Card>
  );
};

export default ActivitySection;