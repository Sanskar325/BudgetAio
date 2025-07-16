
import Card from "@/components/ui/custom/Card";
import { Button } from "@/components/ui/button";
import { BellRing, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import useReminders from "./hooks/useReminders";
import AddReminderForm from "./AddReminderForm";
import RemindersList from "./RemindersList";
import { formatDate, getDaysRemaining } from "./utils/dateUtils";
import { ReminderCategory } from "./types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type ReminderFilter = 'All' | 'Upcoming' | 'Overdue';

const Reminders = () => {
  const {
    reminders,
    isAddingReminder,
    setIsAddingReminder,
    newReminder,
    setNewReminder,
    addReminder,
    markAsCompleted,
    deleteReminder
  } = useReminders();
  
  const [activeCategory, setActiveCategory] = useState<ReminderCategory | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<ReminderFilter>('All');
  
  // Apply category filter
  const categoryFilteredReminders = activeCategory === 'All' 
    ? reminders 
    : reminders.filter(reminder => reminder.category === activeCategory);
  
  // Apply status filter (All, Upcoming, Overdue)
  const filteredReminders = statusFilter === 'All' 
    ? categoryFilteredReminders 
    : statusFilter === 'Upcoming'
      ? categoryFilteredReminders.filter(reminder => {
          const daysLeft = getDaysRemaining(reminder.dueDate);
          return daysLeft > 0 && !reminder.completed;
        })
      : categoryFilteredReminders.filter(reminder => {
          const daysLeft = getDaysRemaining(reminder.dueDate);
          return daysLeft <= 0 && !reminder.completed;
        });
  
  return (
    <Card className="flex flex-col" glassEffect>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <BellRing className="h-5 w-5 text-primary" />
          Payment Reminders 📅
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsAddingReminder(!isAddingReminder)}
        >
          {isAddingReminder ? "Cancel" : "Add Reminder"}
        </Button>
      </div>
      
      {isAddingReminder && (
        <AddReminderForm
          newReminder={newReminder}
          setNewReminder={setNewReminder}
          addReminder={addReminder}
        />
      )}
      
      <Tabs defaultValue="All" className="mb-3">
        <TabsList className="mb-3">
          <TabsTrigger 
            value="All" 
            onClick={() => setStatusFilter('All')}
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="Upcoming" 
            onClick={() => setStatusFilter('Upcoming')}
            className="flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger 
            value="Overdue" 
            onClick={() => setStatusFilter('Overdue')}
            className="flex items-center gap-1"
          >
            <Clock className="h-4 w-4" />
            Overdue
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <Button 
          variant={activeCategory === 'All' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveCategory('All')}
        >
          All
        </Button>
        <Button 
          variant={activeCategory === 'Bills' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveCategory('Bills')}
          className="bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700"
        >
          Bills
        </Button>
        <Button 
          variant={activeCategory === 'Subscriptions' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveCategory('Subscriptions')}
          className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
        >
          Subscriptions
        </Button>
        <Button 
          variant={activeCategory === 'Loans' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveCategory('Loans')}
          className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
        >
          Loans
        </Button>
        <Button 
          variant={activeCategory === 'Others' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveCategory('Others')}
          className="bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700"
        >
          Others
        </Button>
      </div>
      
      <RemindersList
        reminders={filteredReminders}
        onMarkComplete={markAsCompleted}
        onDelete={deleteReminder}
        formatDate={formatDate}
        getDaysRemaining={getDaysRemaining}
      />
    </Card>
  );
};

export default Reminders;