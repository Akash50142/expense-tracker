import React from 'react';
import { X } from 'lucide-react';
import BudgetForm from './BudgetForm';
import { Budget } from '../../types';

interface EditBudgetModalProps {
  budget: Budget;
  onClose: () => void;
  onSubmit: (budget: Budget) => void;
}

const EditBudgetModal: React.FC<EditBudgetModalProps> = ({ 
  budget, 
  onClose, 
  onSubmit 
}) => {
  const handleSubmit = (budgetData: Budget) => {
    onSubmit(budgetData);
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
            <h3 className="text-lg font-semibold text-gray-900">Edit Budget</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="px-6 py-4">
            <BudgetForm 
              initialValues={budget}
              onSubmit={handleSubmit} 
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBudgetModal;