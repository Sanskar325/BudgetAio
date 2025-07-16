
export interface Reminder {
    id: string;
    title: string;
    amount: number;
    dueDate: Date;
    completed: boolean;
    category: ReminderCategory;
  }
  
  export type ReminderCategory = 'Bills' | 'Subscriptions' | 'Loans' | 'Others';
  
  export interface NewReminderForm {
    title: string;
    amount: number;
    dueDate: Date;
    category: ReminderCategory;
  }
  
  export const CATEGORY_COLORS: Record<ReminderCategory, string> = {
    'Bills': 'bg-orange-100 text-orange-600',
    'Subscriptions': 'bg-blue-100 text-blue-600',
    'Loans': 'bg-red-100 text-red-600',
    'Others': 'bg-purple-100 text-purple-600'
  };
  