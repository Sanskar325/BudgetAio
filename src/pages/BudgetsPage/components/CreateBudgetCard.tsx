
import Card from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/button";
import { Plus, PiggyBank } from "lucide-react";

interface CreateBudgetCardProps {
  onClick: () => void;
}

const CreateBudgetCard = ({ onClick }: CreateBudgetCardProps) => {
  return (
    <Card 
      className="flex flex-col items-center justify-center p-4 md:p-6 cursor-pointer hover:shadow-md transition-all border-dashed border-2"
      onClick={onClick}
    >
      <Button variant="ghost" size="lg" className="flex flex-col gap-2 h-auto py-6">
        <PiggyBank size={24} className="text-primary" />
        <Plus size={20} className="text-primary" />
        <span>Create New Budget</span>
      </Button>
    </Card>
  );
};

export default CreateBudgetCard;