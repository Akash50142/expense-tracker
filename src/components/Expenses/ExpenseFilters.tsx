import React, { useState } from 'react';
import { ExpenseCategory } from '../../types';
import { getCategoryOptions } from '../../utils/categories';
import { FilterX, Filter } from 'lucide-react';

interface FiltersState {
  startDate: string;
  endDate: string;
  categories: ExpenseCategory[];
  minAmount: string;
  maxAmount: string;
}

interface ExpenseFiltersProps {
  onApplyFilters: (filters: {
    startDate?: string;
    endDate?: string;
    categories?: ExpenseCategory[];
    minAmount?: number;
    maxAmount?: number;
  }) => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    startDate: '',
    endDate: '',
    categories: [],
    minAmount: '',
    maxAmount: ''
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const categoryOptions = getCategoryOptions();

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value as ExpenseCategory);
    setFilters(prev => ({
      ...prev,
      categories: selectedOptions
    }));
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      categories: [],
      minAmount: '',
      maxAmount: ''
    });
    
    onApplyFilters({});
    setActiveFiltersCount(0);
  };

  const applyFilters = () => {
    const appliedFilters: any = {};
    let count = 0;
    
    if (filters.startDate) {
      appliedFilters.startDate = filters.startDate;
      count++;
    }
    
    if (filters.endDate) {
      appliedFilters.endDate = filters.endDate;
      count++;
    }
    
    if (filters.categories.length > 0) {
      appliedFilters.categories = filters.categories;
      count++;
    }
    
    if (filters.minAmount) {
      appliedFilters.minAmount = parseFloat(filters.minAmount);
      count++;
    }
    
    if (filters.maxAmount) {
      appliedFilters.maxAmount = parseFloat(filters.maxAmount);
      count++;
    }
    
    onApplyFilters(appliedFilters);
    setActiveFiltersCount(count);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <button
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={toggleFilters}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-primary-100 text-primary-800 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            onClick={resetFilters}
          >
            <FilterX className="h-4 w-4 mr-1" />
            Clear filters
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-3 p-4 bg-white border border-gray-200 rounded-md shadow-sm animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="input w-full"
                value={filters.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="input w-full"
                value={filters.endDate}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <select
                id="categories"
                name="categories"
                className="select w-full"
                multiple
                size={3}
                value={filters.categories}
                onChange={handleCategoryChange}
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="minAmount"
                    name="minAmount"
                    className="input pl-7 w-full"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={filters.minAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="maxAmount"
                    name="maxAmount"
                    className="input pl-7 w-full"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={filters.maxAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="btn-ghost text-sm"
              onClick={resetFilters}
            >
              Reset
            </button>
            <button
              className="btn-primary text-sm"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseFilters;