import React, { useState } from 'react';
import { getCategoryOptions } from '../../utils/categories';
import { ExpenseCategory, Budget } from '../../types';

interface BudgetFormProps {
  initialValues?: Budget;
  onSubmit: (budgetData: Budget) => void;
  onCancel: () => void;
  existingCategories?: ExpenseCategory[];
}

const BudgetForm: React.FC<BudgetFormProps> = ({ 
  initialValues,
  onSubmit, 
  onCancel,
  existingCategories = []
}) => {
  const [category, setCategory] = useState<ExpenseCategory>(initialValues?.category || 'other');
  const [limit, setLimit] = useState(initialValues?.limit.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter out categories that already have budgets, unless this is an edit
  const availableCategories = getCategoryOptions().filter(option => 
    initialValues?.category === option.value || !existingCategories.includes(option.value)
  );

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!limit || isNaN(parseFloat(limit)) || parseFloat(limit) <= 0) {
      newErrors.limit = 'Please enter a valid amount greater than zero';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        category,
        limit: parseFloat(limit)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          className="select w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          disabled={!!initialValues}
        >
          {availableCategories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">
          Monthly Budget Limit
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="limit"
            step="0.01"
            min="0"
            className={`input pl-7 w-full ${errors.limit ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="0.00"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        {errors.limit && (
          <p className="mt-1 text-sm text-error-600">{errors.limit}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          className="btn-ghost"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {initialValues ? 'Update Budget' : 'Add Budget'}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;