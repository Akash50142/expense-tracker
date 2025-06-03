import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORIES } from '../../utils/categories';

const BudgetOverview: React.FC = () => {
  const { 
    budgets, 
    getTotalExpensesByCategory, 
    getBudgetPercentage 
  } = useExpenses();
  
  if (budgets.length === 0) {
    return (
      <div className="card p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Overview</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No budgets set.</p>
          <p className="mt-2 text-sm">Set budgets to track your spending limits.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card animate-fade-in">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Budget Overview</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {budgets.map((budget) => {
          const category = CATEGORIES[budget.category];
          const spent = getTotalExpensesByCategory(budget.category);
          const percentage = getBudgetPercentage(budget.category) || 0;
          const remaining = budget.limit - spent;
          
          let statusColor = 'bg-success-500';
          if (percentage > 0.9) statusColor = 'bg-error-500';
          else if (percentage > 0.7) statusColor = 'bg-warning-500';
          
          return (
            <div key={budget.category} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${category.bgColor} ${category.color} mr-3`}>
                    <category.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-800">{category.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatCurrency(spent)} <span className="text-gray-500">of {formatCurrency(budget.limit)}</span>
                  </div>
                  <div className={`text-xs ${remaining < 0 ? 'text-error-600' : 'text-gray-500'}`}>
                    {remaining < 0 ? `${formatCurrency(Math.abs(remaining))} over budget` : `${formatCurrency(remaining)} remaining`}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${statusColor} h-2 rounded-full transition-all duration-500 ease-out`} 
                  style={{ width: `${Math.min(percentage * 100, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverview;