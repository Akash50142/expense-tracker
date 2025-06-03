export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
}

export type ExpenseCategory = 
  | 'housing'
  | 'transportation'
  | 'food'
  | 'utilities'
  | 'insurance'
  | 'healthcare'
  | 'savings'
  | 'personal'
  | 'entertainment'
  | 'education'
  | 'debt'
  | 'other';

export interface Budget {
  category: ExpenseCategory;
  limit: number;
}

export interface MonthlyExpenseSummary {
  month: string;
  total: number;
}

export interface CategorySummary {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
}

export interface ExpenseContextType {
  expenses: Expense[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setBudget: (budget: Budget) => void;
  removeBudget: (category: ExpenseCategory) => void;
  getExpensesByCategory: (category: ExpenseCategory) => Expense[];
  getTotalExpensesByCategory: (category: ExpenseCategory) => number;
  getTotalExpenses: () => number;
  getMonthlyExpenses: (months?: number) => MonthlyExpenseSummary[];
  getCategorySummary: () => CategorySummary[];
  getRemainingBudget: (category: ExpenseCategory) => number | null;
  getBudgetPercentage: (category: ExpenseCategory) => number | null;
  filterExpenses: (
    filters: {
      startDate?: string;
      endDate?: string;
      categories?: ExpenseCategory[];
      minAmount?: number;
      maxAmount?: number;
    }
  ) => Expense[];
}