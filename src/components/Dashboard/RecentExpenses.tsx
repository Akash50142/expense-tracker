import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CATEGORIES } from '../../utils/categories';
import { Edit, Trash } from 'lucide-react';

interface RecentExpensesProps {
  onEditExpense: (id: string) => void;
}

const RecentExpenses: React.FC<RecentExpensesProps> = ({ onEditExpense }) => {
  const { expenses, deleteExpense } = useExpenses();
  
  // Sort expenses by date (newest first) and take the 5 most recent
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  if (recentExpenses.length === 0) {
    return (
      <div className="card p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No expenses recorded yet.</p>
          <p className="mt-2 text-sm">Add your first expense to get started!</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card animate-fade-in">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Expenses</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {recentExpenses.map((expense) => {
          const category = CATEGORIES[expense.category];
          return (
            <div 
              key={expense.id} 
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${category.bgColor} ${category.color} mr-4`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="font-medium text-gray-800 mr-4">{formatCurrency(expense.amount)}</p>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => onEditExpense(expense.id)}
                    className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                    aria-label="Edit expense"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteExpense(expense.id)}
                    className="p-1 text-gray-500 hover:text-error-600 transition-colors"
                    aria-label="Delete expense"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {expenses.length > 5 && (
        <div className="p-4 text-center border-t border-gray-200">
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View All Expenses
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentExpenses;