
import { useState } from "react";
import { mockData } from "@/lib/mockData";
import Card from "../ui/custom/Card";
import ProgressCircle from "../ui/custom/ProgressCircle";
import AnimatedNumber from "../ui/custom/AnimatedNumber";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const SavingsGoals = () => {
  const [savingsGoals, setSavingsGoals] = useState(mockData.savingsGoals);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: 0,
    current: 0,
    deadline: ""
  });
  const navigate = useNavigate();
  
  const handleGoToGoals = () => {
    navigate('/goals');
    // Scroll to the goals section
    setTimeout(() => {
      const section = document.getElementById('goals');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAddGoalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from firing
    setShowAddGoalForm(true);
  };

  const handleCloseForm = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from firing
    setShowAddGoalForm(false);
    setNewGoal({ name: "", target: 0, current: 0, deadline: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: name === 'target' || name === 'current' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent card click event from firing
    
    // Validate form
    if (!newGoal.name.trim()) {
      toast.error("Please enter a goal name");
      return;
    }
    if (newGoal.target <= 0) {
      toast.error("Target amount must be greater than zero");
      return;
    }
    if (!newGoal.deadline) {
      toast.error("Please select a deadline");
      return;
    }

    // Create new goal
    const goalToAdd = {
      id: `goal-${Date.now()}`,
      name: newGoal.name,
      target: newGoal.target,
      current: newGoal.current,
      deadline: new Date(newGoal.deadline).toISOString()
    };

    // Add to state
    setSavingsGoals([...savingsGoals, goalToAdd]);
    
    // Reset form
    setNewGoal({ name: "", target: 0, current: 0, deadline: "" });
    setShowAddGoalForm(false);
    
    toast.success("New savings goal added!");
  };
  
  return (
    <Card className="flex flex-col cursor-pointer hover:shadow-md transition-all" glassEffect onClick={handleGoToGoals}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Savings Goals</h3>
        <button 
          className="text-sm text-primary hover:underline flex items-center"
          onClick={handleAddGoalClick}
        >
          Add goal <span className="ml-1" aria-hidden="true">+</span>
        </button>
      </div>
      
      {showAddGoalForm && (
        <div 
          className="bg-card p-4 rounded-lg mb-4 border border-border shadow-sm" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Add New Goal</h4>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={handleCloseForm}
            >
              <X size={16} />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm mb-1">Goal Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newGoal.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-input bg-background text-sm"
                placeholder="e.g., New Car, Vacation"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="target" className="block text-sm mb-1">Target Amount</label>
                <input
                  type="number"
                  id="target"
                  name="target"
                  value={newGoal.target || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background text-sm"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label htmlFor="current" className="block text-sm mb-1">Current Amount (optional)</label>
                <input
                  type="number"
                  id="current"
                  name="current"
                  value={newGoal.current || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background text-sm"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm mb-1">Target Date</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={newGoal.deadline}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-input bg-background text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus size={16} className="mr-1" /> Add Goal
            </Button>
          </form>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {savingsGoals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
    </Card>
  );
};

interface GoalItemProps {
  goal: {
    id: string;
    name: string;
    target: number;
    current: number;
    deadline: string;
  };
}

const GoalItem = ({ goal }: GoalItemProps) => {
  const progress = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;
  
  // Calculate days remaining
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format the deadline
  const formattedDeadline = deadline.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Determine progress color
  const getProgressColor = (percentage: number) => {
    if (percentage < 25) return "#FF3B30";
    if (percentage < 50) return "#FF9500";
    if (percentage < 75) return "#FFCC00";
    return "#34C759";
  };
  
  return (
    <div className="bg-secondary/30 p-4 rounded-xl flex flex-col items-center text-center hover:bg-secondary/50 transition-all cursor-pointer">
      <ProgressCircle
        value={goal.current}
        maxValue={goal.target}
        color={getProgressColor(progress)}
        backgroundColor="rgba(200, 200, 200, 0.2)"
        size={80}
        strokeWidth={6}
        showPercentage={false}
      />
      
      <div className="mt-2 text-base font-medium">{goal.name}</div>
      
      <div className="text-sm mt-1">
        <AnimatedNumber value={goal.current} /> of <AnimatedNumber value={goal.target} />
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        <AnimatedNumber value={remaining} /> to go
      </div>
      
      <div className="mt-1 text-xs text-muted-foreground">
        {daysRemaining} days left ({formattedDeadline})
      </div>
    </div>
  );
};

export default SavingsGoals;
