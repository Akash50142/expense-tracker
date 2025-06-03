import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORIES } from '../../utils/categories';
import { Budget, ExpenseCategory } from '../../types';
import { Edit, Trash } from 'lucide-react';

interface BudgetListProps {
  budgets: Budget[];
  spending: Record<ExpenseCategory, number>;
  onEdit: (budget: Budget) => void;
  onDelete: (category: ExpenseCategory) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({ 
  budgets, 
  spending, 
  onEdit, 
  onDelete 
}) => {
  if (budgets.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No budgets set yet.</p>
        <p className="mt-2 text-sm text-gray-500">Create a budget to start tracking your spending limits.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
      {budgets.map((budget) => {
        const category = CATEGORIES[budget.category];
        const spent = spending[budget.category] || 0;
        const percentage = spent / budget.limit;
        const remaining = budget.limit - spent;
        
        let statusColor = 'bg-success-500';
        let statusTextColor = 'text-success-700';
        if (percentage > 0.9) {
          statusColor = 'bg-error-500';
          statusTextColor = 'text-error-700';
        } else if (percentage > 0.7) {
          statusColor = 'bg-warning-500';
          statusTextColor = 'text-warning-700';
        }
        
        return (
          <div key={budget.category} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${category.bgColor} ${category.color} mr-3`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{category.label}</h3>
                  <p className="text-sm text-gray-500">
                    Monthly budget: {formatCurrency(budget.limit)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onEdit(budget)}
                  className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                  aria-label="Edit budget"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(budget.category)}
                  className="p-1 text-gray-500 hover:text-error-600 transition-colors"
                  aria-label="Delete budget"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Spent: <span className="font-medium">{formatCurrency(spent)}</span>
                </span>
                <span className={remaining >= 0 ? 'text-success-700' : 'text-error-700'}>
                  {remaining >= 0 
                    ? `${formatCurrency(remaining)} remaining` 
                    : `${formatCurrency(Math.abs(remaining))} over budget`}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`${statusColor} h-2.5 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${Math.min(percentage * 100, 100)}%` }}
                />
              </div>
              
              <div className={`text-xs font-medium ${statusTextColor}`}>
                {Math.round(percentage * 100)}% of budget used
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetList;