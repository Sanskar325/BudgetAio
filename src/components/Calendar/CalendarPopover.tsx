
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Reminder {
  id: string;
  title: string;
  amount: number;
  dueDate: Date;
  completed: boolean;
}

// This component will display a calendar in a popover
const CalendarPopover = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  
  // Fetch reminders from localStorage on component mount
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
    }
  }, []);

  // Function to check if a date has reminders
  const hasReminder = (day: Date) => {
    return reminders.some(reminder => {
      // Compare year, month, and day
      const reminderDate = new Date(reminder.dueDate);
      return (
        reminderDate.getFullYear() === day.getFullYear() &&
        reminderDate.getMonth() === day.getMonth() &&
        reminderDate.getDate() === day.getDate() &&
        !reminder.completed
      );
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Open calendar"
        >
          <CalendarIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="p-3 pointer-events-auto"
          modifiers={{
            reminder: (day) => hasReminder(day),
          }}
          modifiersClassNames={{
            reminder: "rdp-day_reminder",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPopover;
