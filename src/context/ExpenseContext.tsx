import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { 
  Expense, 
  Budget, 
  ExpenseCategory, 
  ExpenseContextType, 
  MonthlyExpenseSummary, 
  CategorySummary 
} from '../types';
import { saveExpenses, getExpenses, saveBudgets, getBudgets } from '../utils/localStorage';

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    setExpenses(getExpenses());
    setBudgets(getBudgets());
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // Save budgets to localStorage whenever they change
  useEffect(() => {
    saveBudgets(budgets);
  }, [budgets]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: uuidv4() };
    setExpenses(prev => [...prev, newExpense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const setBudget = (newBudget: Budget) => {
    setBudgets(prev => {
      const existingIndex = prev.findIndex(b => b.category === newBudget.category);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newBudget;
        return updated;
      }
      return [...prev, newBudget];
    });
  };

  const removeBudget = (category: ExpenseCategory) => {
    setBudgets(prev => prev.filter(budget => budget.category !== category));
  };

  const getExpensesByCategory = (category: ExpenseCategory) => {
    return expenses.filter(expense => expense.category === category);
  };

  const getTotalExpensesByCategory = (category: ExpenseCategory) => {
    return getExpensesByCategory(category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getMonthlyExpenses = (months = 6): MonthlyExpenseSummary[] => {
    const result: MonthlyExpenseSummary[] = [];
    const today = new Date();

    for (let i = 0; i < months; i++) {
      const monthDate = subMonths(today, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const monthKey = format(monthDate, 'yyyy-MM');
      
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = parseISO(expense.date);
        return expenseDate >= monthStart && expenseDate <= monthEnd;
      });
      
      const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      result.unshift({
        month: monthKey,
        total
      });
    }

    return result;
  };

  const getCategorySummary = (): CategorySummary[] => {
    const totalExpenses = getTotalExpenses();
    const categorySums: Record<ExpenseCategory, number> = {} as Record<ExpenseCategory, number>;
    
    expenses.forEach(expense => {
      categorySums[expense.category] = (categorySums[expense.category] || 0) + expense.amount;
    });
    
    return Object.entries(categorySums)
      .map(([category, amount]) => ({
        category: category as ExpenseCategory,
        amount,
        percentage: totalExpenses > 0 ? amount / totalExpenses : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getRemainingBudget = (category: ExpenseCategory): number | null => {
    const budget = budgets.find(b => b.category === category);
    if (!budget) return null;
    
    const spent = getTotalExpensesByCategory(category);
    return budget.limit - spent;
  };

  const getBudgetPercentage = (category: ExpenseCategory): number | null => {
    const budget = budgets.find(b => b.category === category);
    if (!budget || budget.limit === 0) return null;
    
    const spent = getTotalExpensesByCategory(category);
    return spent / budget.limit;
  };

  const filterExpenses = ({
    startDate,
    endDate,
    categories,
    minAmount,
    maxAmount
  }: {
    startDate?: string;
    endDate?: string;
    categories?: ExpenseCategory[];
    minAmount?: number;
    maxAmount?: number;
  }): Expense[] => {
    return expenses.filter(expense => {
      if (startDate && expense.date < startDate) return false;
      if (endDate && expense.date > endDate) return false;
      if (categories && categories.length > 0 && !categories.includes(expense.category)) return false;
      if (minAmount !== undefined && expense.amount < minAmount) return false;
      if (maxAmount !== undefined && expense.amount > maxAmount) return false;
      return true;
    });
  };

  const value: ExpenseContextType = {
    expenses,
    budgets,
    addExpense,
    updateExpense,
    deleteExpense,
    setBudget,
    removeBudget,
    getExpensesByCategory,
    getTotalExpensesByCategory,
    getTotalExpenses,
    getMonthlyExpenses,
    getCategorySummary,
    getRemainingBudget,
    getBudgetPercentage,
    filterExpenses
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};