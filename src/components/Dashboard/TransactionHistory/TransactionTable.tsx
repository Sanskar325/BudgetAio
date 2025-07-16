
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: string;
  account: string;
}

interface TransactionTableProps {
  displayTransactions: Transaction[];
  showAllTransactions: boolean;
  setShowAllTransactions: (show: boolean) => void;
  filteredTransactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  displayTransactions,
  showAllTransactions,
  setShowAllTransactions,
  filteredTransactions
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left text-sm font-medium text-muted-foreground">Date</TableHead>
              <TableHead className="text-left text-sm font-medium text-muted-foreground">Description</TableHead>
              <TableHead className="text-left text-sm font-medium text-muted-foreground">Category</TableHead>
              <TableHead className="text-right text-sm font-medium text-muted-foreground">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTransactions.map((transaction, index) => (
              <TableRow 
                key={index} 
                className="hover:bg-secondary/50 transition-colors"
              >
                <TableCell className="px-4 py-3 text-sm">
                  {new Date(transaction.date).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className={cn(
                    "inline-block px-2 py-1 rounded-full text-xs",
                    transaction.category === "Food & Dining" && "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                    transaction.category === "Entertainment" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                    transaction.category === "Housing" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    transaction.category === "Income" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                    transaction.category === "Shopping" && "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
                    transaction.category === "Transfer" && "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300",
                    transaction.category === "Transportation" && "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
                    transaction.category === "Healthcare" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                  )}>
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell className={cn(
                  "px-4 py-3 text-right font-medium",
                  transaction.type === 'expense' ? "text-red-500" : "text-green-500"
                )}>
                  {transaction.type === 'expense' ? '-' : '+'}₹{transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            
            {displayTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 flex justify-center">
        {filteredTransactions.length > 5 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAllTransactions(!showAllTransactions)}
          >
            {showAllTransactions ? "Show Less" : "View All Transactions"}
          </Button>
        )}
      </div>
    </>
  );
};

export default TransactionTable;
