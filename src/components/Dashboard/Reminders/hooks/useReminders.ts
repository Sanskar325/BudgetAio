
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Reminder, NewReminderForm, ReminderCategory } from "../types";

export const useReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Electricity Bill",
      amount: 85.50,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      completed: false,
      category: "Bills"
    },
    {
      id: "2",
      title: "Netflix Subscription",
      amount: 65.00,
      dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
      completed: false,
      category: "Subscriptions"
    },
    {
      id: "3",
      title: "Home Loan EMI",
      amount: 1250.00,
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
      completed: false,
      category: "Loans"
    }
  ]);
  
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState<NewReminderForm>({
    title: "",
    amount: 0,
    dueDate: new Date(),
    category: "Others"
  });
  
  const { toast } = useToast();
  
  // Load reminders from localStorage on component mount
  useEffect(() => {
    const storedReminders = localStorage.getItem("reminders");
    if (storedReminders) {
      try {
        // Parse the stored JSON and convert string dates back to Date objects
        const parsedReminders = JSON.parse(storedReminders, (key, value) => {
          // Convert date strings back to Date objects
          if (key === "dueDate") {
            return new Date(value);
          }
          return value;
        });
        setReminders(parsedReminders);
      } catch (error) {
        console.error("Error parsing reminders:", error);
      }
    } else {
      // Save initial reminders to localStorage if none exist
      localStorage.setItem("reminders", JSON.stringify(reminders));
    }
  }, []);
  
  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);
  
  const addReminder = () => {
    if (!newReminder.title || newReminder.amount <= 0) {
      toast({
        title: "Invalid reminder",
        description: "Please provide a title and a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      amount: newReminder.amount,
      dueDate: newReminder.dueDate,
      completed: false,
      category: newReminder.category
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder({
      title: "",
      amount: 0,
      dueDate: new Date(),
      category: "Others"
    });
    setIsAddingReminder(false);
    
    toast({
      title: "Reminder added",
      description: "Your payment reminder has been set"
    });
  };
  
  const markAsCompleted = (id: string) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id ? { ...reminder, completed: true } : reminder
      )
    );
    
    toast({
      title: "Payment completed",
      description: "Your payment has been marked as completed"
    });
  };
  
  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    toast({
      title: "Reminder deleted",
      description: "Your payment reminder has been deleted"
    });
  };

  return {
    reminders,
    isAddingReminder,
    setIsAddingReminder,
    newReminder,
    setNewReminder,
    addReminder,
    markAsCompleted,
    deleteReminder
  };
};

export default useReminders;