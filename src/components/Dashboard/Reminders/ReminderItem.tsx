
import { Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Reminder, CATEGORY_COLORS } from "./types";

interface ReminderItemProps {
  reminder: Reminder;
  onMarkComplete: (id: string) => void;
  onDelete: (id: string) => void;
  formatDate: (date: Date) => string;
  getDaysRemaining: (dueDate: Date) => number;
}

const ReminderItem = ({
  reminder,
  onMarkComplete,
  onDelete,
  formatDate,
  getDaysRemaining
}: ReminderItemProps) => {
  const daysRemaining = getDaysRemaining(reminder.dueDate);
  const isOverdue = daysRemaining <= 0 && !reminder.completed;
  
  return (
    <div 
      key={reminder.id}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg",
        reminder.completed 
          ? "bg-secondary/20 text-muted-foreground" 
          : isOverdue 
            ? "bg-red-50/50" 
            : "bg-secondary/40"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center",
          reminder.completed 
            ? "bg-green-100 text-green-600" 
            : isOverdue
              ? "bg-red-100 text-red-600"
              : CATEGORY_COLORS[reminder.category]
        )}>
          <Calendar className="h-5 w-5" />
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h4 className={cn(
              "font-medium",
              reminder.completed && "line-through"
            )}>
              {reminder.title}
            </h4>
            <Badge variant="outline" className={cn(
              "text-xs",
              !reminder.completed && `${CATEGORY_COLORS[reminder.category]} bg-opacity-15`
            )}>
              {reminder.category}
            </Badge>
            
            {isOverdue && !reminder.completed && (
              <Badge variant="outline" className="bg-red-100 text-red-600 text-xs">
                Overdue
              </Badge>
            )}
          </div>
          <div className="text-xs">
            Due: {formatDate(reminder.dueDate)} 
            {!reminder.completed && (
              <span className={cn(
                "ml-2",
                isOverdue && "text-red-600 font-medium"
              )}>
                ({daysRemaining < 0 ? Math.abs(daysRemaining) + " days overdue" : daysRemaining + " days left"})
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-right font-medium">
          ₹{reminder.amount.toFixed(2)}
        </div>
        
        {!reminder.completed ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMarkComplete(reminder.id)}
          >
            Mark Paid
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(reminder.id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReminderItem;