
import React from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface NewTransaction {
  description: string;
  amount: string;
  category: string;
  type: string;
}

interface AddTransactionFormProps {
  newTransaction: NewTransaction;
  setNewTransaction: (transaction: NewTransaction) => void;
  categories: string[];
  onClose: () => void;
  onAdd: () => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  newTransaction,
  setNewTransaction,
  categories,
  onClose,
  onAdd
}) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Transaction</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="transaction-type">Transaction Type</Label>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={newTransaction.type === 'expense' ? 'default' : 'outline'}
              onClick={() => setNewTransaction({...newTransaction, type: 'expense'})}
              className="flex-1"
            >
              Expense
            </Button>
            <Button
              type="button"
              variant={newTransaction.type === 'income' ? 'default' : 'outline'}
              onClick={() => setNewTransaction({...newTransaction, type: 'income'})}
              className="flex-1"
            >
              Income
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            placeholder="e.g., Groceries, Dinner" 
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input 
            id="amount" 
            type="number" 
            placeholder="Enter amount" 
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={newTransaction.category} 
            onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onAdd}>Add Transaction</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddTransactionForm;
