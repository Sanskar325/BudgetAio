

import AppLayout from "@/components/Layout/AppLayout";

import Card from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/button";
import { Plus, PiggyBank } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { PlaceBudgetChecker, BudgetRecommendations, MultiPeriodBudgetView } from "@/components/Dashboard/BudgetComponents";

const BudgetsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    emoji: "💰"
  });
  const { toast } = useToast();
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Shopping",
      items: 1,
      allocated: 2300,
      spent: 150,
      emoji: "🛒"
    },
    {
      id: 2,
      category: "Home Decor",
      items: 3,
      allocated: 3800,
      spent: 3300,
      emoji: "🏡"
    },
    {
      id: 3,
      category: "Garden",
      items: 2,
      allocated: 1500,
      spent: 140,
      emoji: "🌱"
    },
    {
      id: 4,
      category: "Car",
      items: 1,
      allocated: 2500,
      spent: 120,
      emoji: "🚗"
    },
    {
      id: 5,
      category: "Youtube",
      items: 2,
      allocated: 5000,
      spent: 1100,
      emoji: "📺"
    }
  ]);

  const emojis = [
    { emoji: "💰", name: "Money" },
    { emoji: "🛒", name: "Shopping" },
    { emoji: "🏡", name: "Home" },
    { emoji: "🌱", name: "Garden" },
    { emoji: "🚗", name: "Car" },
    { emoji: "📺", name: "TV" },
    { emoji: "🍔", name: "Food" },
    { emoji: "✈️", name: "Travel" },
    { emoji: "🎮", name: "Games" },
    { emoji: "👕", name: "Clothing" },
    { emoji: "📚", name: "Education" },
    { emoji: "💻", name: "Technology" },
    { emoji: "🏥", name: "Healthcare" },
    { emoji: "🏋️", name: "Fitness" },
    { emoji: "🎁", name: "Gifts" },
    { emoji: "🏦", name: "Banking" },
    { emoji: "🎭", name: "Entertainment" },
    { emoji: "🧸", name: "Kids" }
  ];

  const handleCreateBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      toast({
        title: "Missing information",
        description: "Please provide both category and amount",
        variant: "destructive"
      });
      return;
    }

    const newBudgetItem = {
      id: Date.now(),
      category: newBudget.category,
      items: 0,
      allocated: parseFloat(newBudget.amount),
      spent: 0,
      emoji: newBudget.emoji
    };
    
    const updatedBudgets = [...budgets, newBudgetItem];
    setBudgets(updatedBudgets);
    
    // Save to localStorage
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));

    // Update the total number of budgets in localStorage for dashboard
    localStorage.setItem('totalBudgets', String(updatedBudgets.length));

    toast({
      title: "Budget created",
      description: `Budget for ${newBudget.category} created successfully`
    });

    setNewBudget({ category: "", amount: "", emoji: "💰" });
    setIsDialogOpen(false);
  };
  
  useEffect(() => {
    // Load budgets from localStorage if they exist
    const savedBudgets = localStorage.getItem('budgets');
    if (savedBudgets) {
      const parsedBudgets = JSON.parse(savedBudgets);
      setBudgets(parsedBudgets);
      
      // Update the total number of budgets in localStorage for dashboard
      localStorage.setItem('totalBudgets', String(parsedBudgets.length));
    }
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Budgets</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your spending limits by category
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <MultiPeriodBudgetView budgets={budgets} />
          <BudgetRecommendations budgets={budgets} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card 
            className="flex flex-col items-center justify-center p-4 md:p-6 cursor-pointer hover:shadow-md transition-all border-dashed border-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <Button variant="ghost" size="lg" className="flex flex-col gap-2 h-auto py-6">
              <PiggyBank size={24} className="text-primary" />
              <Plus size={20} className="text-primary" />
              <span>Create New Budget</span>
            </Button>
          </Card>
          
          {budgets.map((budget) => (
            <Card key={budget.id} className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{budget.emoji}</div>
                <div>
                  <h3 className="font-medium">{budget.category}</h3>
                  <p className="text-sm text-muted-foreground">{budget.items} item{budget.items !== 1 ? 's' : ''}</p>
                </div>
                <span className="ml-auto text-xl font-bold">₹{budget.allocated}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>₹{budget.spent} Spent</span>
                  <span>₹{budget.allocated - budget.spent} Remaining</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `₹{(budget.spent / budget.allocated) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Select Emoji</Label>
              <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
                {emojis.map((emojiOption) => (
                  <Button
                    key={emojiOption.emoji}
                    variant={newBudget.emoji === emojiOption.emoji ? "default" : "outline"}
                    className="h-10 p-0"
                    onClick={() => setNewBudget({...newBudget, emoji: emojiOption.emoji})}
                    title={emojiOption.name}
                  >
                    <span className="text-xl">{emojiOption.emoji}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                placeholder="e.g., Shopping, Travel" 
                value={newBudget.category}
                onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount (₹)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="Amount in ₹" 
                value={newBudget.amount}
                onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateBudget}>Create Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default BudgetsPage;
