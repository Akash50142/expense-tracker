import React, { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import ExpenseFilters from './ExpenseFilters';
import ExpenseList from './ExpenseList';
import EditExpenseModal from './EditExpenseModal';
import { ExpenseCategory } from '../../types';

interface ExpensesTabProps {
  onAddExpenseClick: () => void;
}

const ExpensesTab: React.FC<ExpensesTabProps> = ({ onAddExpenseClick }) => {
  const { expenses, deleteExpense, filterExpenses } = useExpenses();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  
  // Update filtered expenses when expenses change
  React.useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleApplyFilters = (filters: {
    startDate?: string;
    endDate?: string;
    categories?: ExpenseCategory[];
    minAmount?: number;
    maxAmount?: number;
  }) => {
    const filtered = filterExpenses(filters);
    setFilteredExpenses(filtered);
  };

  const handleEditExpense = (id: string) => {
    setEditingExpenseId(id);
  };

  const handleCloseEditModal = () => {
    setEditingExpenseId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">All Expenses</h2>
        <button
          onClick={onAddExpenseClick}
          className="btn-primary text-sm"
        >
          Add Expense
        </button>
      </div>
      
      <ExpenseFilters onApplyFilters={handleApplyFilters} />
      
      <ExpenseList 
        expenses={filteredExpenses} 
        onEdit={handleEditExpense}
        onDelete={deleteExpense}
      />
      
      {editingExpenseId && (
        <EditExpenseModal 
          expenseId={editingExpenseId} 
          onClose={handleCloseEditModal} 
        />
      )}
    </div>
  );
};

export default ExpensesTab;