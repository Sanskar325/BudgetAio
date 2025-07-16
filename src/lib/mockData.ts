
export const mockData = {
  balance: {
    total: 24680.75,
    available: 18250.32,
    lastUpdate: new Date().toISOString(),
  },
  
  accounts: [
    {
      id: "acc-1",
      name: "Main Checking",
      type: "checking",
      balance: 12450.32,
      institution: "Chase",
      lastUpdate: new Date().toISOString(),
    },
    {
      id: "acc-2",
      name: "Savings",
      type: "savings",
      balance: 8230.43,
      institution: "Chase",
      lastUpdate: new Date().toISOString(),
    },
    {
      id: "acc-3",
      name: "Investment",
      type: "investment",
      balance: 4000.00,
      institution: "Vanguard",
      lastUpdate: new Date().toISOString(),
    },
  ],

  transactions: [
    {
      id: "tx-1",
      date: new Date(Date.now() - 86400000).toISOString(), // yesterday
      amount: 83.45,
      description: "Grocery Store",
      category: "Food & Dining",
      account: "acc-1",
      type: "expense",
    },
    {
      id: "tx-2",
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      amount: 42.99,
      description: "Streaming Service",
      category: "Entertainment",
      account: "acc-1",
      type: "expense",
    },
    {
      id: "tx-3",
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      amount: 1200.00,
      description: "Rent Payment",
      category: "Housing",
      account: "acc-1",
      type: "expense",
    },
    {
      id: "tx-4",
      date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      amount: 4250.00,
      description: "Salary Deposit",
      category: "Income",
      account: "acc-1",
      type: "income",
    },
    {
      id: "tx-5",
      date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      amount: 65.50,
      description: "Restaurant",
      category: "Food & Dining",
      account: "acc-1",
      type: "expense",
    },
    {
      id: "tx-6",
      date: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
      amount: 500.00,
      description: "Savings Transfer",
      category: "Transfer",
      account: "acc-2",
      type: "transfer",
    },
  ],

  budgets: [
    {
      id: "budget-1",
      category: "Food & Dining",
      allocated: 600,
      spent: 250,
      period: "monthly",
    },
    {
      id: "budget-2",
      category: "Entertainment",
      allocated: 200,
      spent: 75,
      period: "monthly",
    },
    {
      id: "budget-3",
      category: "Shopping",
      allocated: 400,
      spent: 385,
      period: "monthly",
    },
    {
      id: "budget-4",
      category: "Housing",
      allocated: 1500,
      spent: 1450,
      period: "monthly",
    },
  ],

  savingsGoals: [
    {
      id: "goal-1",
      name: "Emergency Fund",
      target: 10000,
      current: 5800,
      deadline: new Date(Date.now() + 15552000000).toISOString(), // 6 months from now
    },
    {
      id: "goal-2",
      name: "Vacation",
      target: 3000,
      current: 1200,
      deadline: new Date(Date.now() + 7776000000).toISOString(), // 3 months from now
    },
    {
      id: "goal-3",
      name: "New Laptop",
      target: 2000,
      current: 1750,
      deadline: new Date(Date.now() + 2592000000).toISOString(), // 1 month from now
    },
  ],

  incomeVsExpense: [
    { month: "Jan", income: 4500, expense: 3200 },
    { month: "Feb", income: 4500, expense: 3400 },
    { month: "Mar", income: 4800, expense: 3300 },
    { month: "Apr", income: 4500, expense: 3800 },
    { month: "May", income: 4500, expense: 3100 },
    { month: "Jun", income: 5200, expense: 3900 },
  ],

  expenseCategories: [
    { category: "Housing", amount: 1450, percentage: 35 },
    { category: "Food & Dining", amount: 800, percentage: 20 },
    { category: "Transportation", amount: 600, percentage: 15 },
    { category: "Entertainment", amount: 400, percentage: 10 },
    { category: "Shopping", amount: 350, percentage: 8 },
    { category: "Other", amount: 500, percentage: 12 },
  ],
};

export type MockDataType = typeof mockData;
