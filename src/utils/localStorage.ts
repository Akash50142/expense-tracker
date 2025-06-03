import { Expense, Budget } from '../types';

const EXPENSES_KEY = 'spendwise_expenses';
const BUDGETS_KEY = 'spendwise_budgets';

export const saveExpenses = (expenses: Expense[]): void => {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to localStorage:', error);
  }
};

export const getExpenses = (): Expense[] => {
  try {
    const expenses = localStorage.getItem(EXPENSES_KEY);
    return expenses ? JSON.parse(expenses) : [];
  } catch (error) {
    console.error('Error getting expenses from localStorage:', error);
    return [];
  }
};

export const saveBudgets = (budgets: Budget[]): void => {
  try {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  } catch (error) {
    console.error('Error saving budgets to localStorage:', error);
  }
};

export const getBudgets = (): Budget[] => {
  try {
    const budgets = localStorage.getItem(BUDGETS_KEY);
    return budgets ? JSON.parse(budgets) : [];
  } catch (error) {
    console.error('Error getting budgets from localStorage:', error);
    return [];
  }
};

export const clearData = (): void => {
  try {
    localStorage.removeItem(EXPENSES_KEY);
    localStorage.removeItem(BUDGETS_KEY);
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
  }
};