
export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    type: string;
    account: string;
  }
  
  export interface FilterOptions {
    type: string;
    category: string;
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
  }
  
  export interface NewTransaction {
    description: string;
    amount: string;
    category: string;
    type: string;
  }