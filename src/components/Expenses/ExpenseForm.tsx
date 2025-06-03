import React, { useState, useEffect } from 'react';
import { getCategoryOptions } from '../../utils/categories';
import { Expense, ExpenseCategory } from '../../types';
import { getToday } from '../../utils/formatters';

interface ExpenseFormProps {
  initialValues?: Expense;
  onSubmit: (expenseData: Omit<Expense, 'id'>) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  initialValues, 
  onSubmit, 
  onCancel,
  submitLabel = 'Add Expense'
}) => {
  const [amount, setAmount] = useState(initialValues?.amount.toString() || '');
  const [category, setCategory] = useState<ExpenseCategory>(initialValues?.category || 'other');
  const [date, setDate] = useState(initialValues?.date || getToday());
  const [description, setDescription] = useState(initialValues?.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoryOptions = getCategoryOptions();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than zero';
    }
    
    if (!date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        amount: parseFloat(amount),
        category,
        date,
        description: description.trim()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0"
            className={`input pl-7 w-full ${errors.amount ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-error-600">{errors.amount}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          className="select w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          className={`input w-full ${errors.date ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
          value={date}
          max={getToday()}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-error-600">{errors.date}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          id="description"
          className={`input w-full ${errors.description ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
          placeholder="What was this expense for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-error-600">{errors.description}</p>
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
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;