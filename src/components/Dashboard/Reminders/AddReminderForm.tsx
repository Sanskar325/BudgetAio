
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewReminderForm, ReminderCategory } from "./types";

interface AddReminderFormProps {
  newReminder: NewReminderForm;
  setNewReminder: React.Dispatch<React.SetStateAction<NewReminderForm>>;
  addReminder: () => void;
}

const AddReminderForm = ({
  newReminder,
  setNewReminder,
  addReminder
}: AddReminderFormProps) => {
  const handleCategoryChange = (value: ReminderCategory) => {
    setNewReminder({...newReminder, category: value});
  };

  return (
    <div className="bg-secondary/30 p-4 rounded-lg mb-4 space-y-3">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">Payment Title</label>
        <input
          id="title"
          type="text"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="e.g. Rent, Electricity bill"
          value={newReminder.title}
          onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
        />
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="0.00"
          value={newReminder.amount || ""}
          onChange={(e) => setNewReminder({...newReminder, amount: parseFloat(e.target.value) || 0})}
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
        <Select value={newReminder.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bills">Bills</SelectItem>
            <SelectItem value="Subscriptions">Subscriptions</SelectItem>
            <SelectItem value="Loans">Loans</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Due Date</label>
        <input
          id="dueDate"
          type="date"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={newReminder.dueDate.toISOString().split('T')[0]}
          onChange={(e) => setNewReminder({...newReminder, dueDate: new Date(e.target.value)})}
        />
      </div>
      
      <Button className="w-full" onClick={addReminder}>
        Add Payment Reminder
      </Button>
    </div>
  );
};

export default AddReminderForm;