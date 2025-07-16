
import { Reminder } from "./types";
import ReminderItem from "./ReminderItem";

interface RemindersListProps {
  reminders: Reminder[];
  onMarkComplete: (id: string) => void;
  onDelete: (id: string) => void;
  formatDate: (date: Date) => string;
  getDaysRemaining: (dueDate: Date) => number;
}

const RemindersList = ({
  reminders,
  onMarkComplete,
  onDelete,
  formatDate,
  getDaysRemaining
}: RemindersListProps) => {
  if (reminders.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No payment reminders. Add one to keep track of your bills.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reminders.map(reminder => (
        <ReminderItem
          key={reminder.id}
          reminder={reminder}
          onMarkComplete={onMarkComplete}
          onDelete={onDelete}
          formatDate={formatDate}
          getDaysRemaining={getDaysRemaining}
        />
      ))}
    </div>
  );
};

export default RemindersList;