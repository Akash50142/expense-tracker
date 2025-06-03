import React from 'react';
import { X } from 'lucide-react';
import ExpenseForm from './ExpenseForm';
import { useExpenses } from '../../context/ExpenseContext';
import { Expense } from '../../types';

interface EditExpenseModalProps {
  expenseId: string;
  onClose: () => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ expenseId, onClose }) => {
  const { expenses, updateExpense } = useExpenses();
  
  const expense = expenses.find(e => e.id === expenseId);
  
  if (!expense) {
    return null;
  }

  const handleSubmit = (expenseData: Omit<Expense, 'id'>) => {
    updateExpense({
      id: expenseId,
      ...expenseData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-slide-up"
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Edit Expense</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="px-6 py-4">
            <ExpenseForm 
              initialValues={expense}
              onSubmit={handleSubmit} 
              onCancel={onClose}
              submitLabel="Update Expense"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;