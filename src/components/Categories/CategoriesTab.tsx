import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { CATEGORIES } from '../../utils/categories';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const CategoriesTab: React.FC = () => {
  const { 
    getCategorySummary, 
    getTotalExpenses,
    getTotalExpensesByCategory,
    getRemainingBudget,
    budgets
  } = useExpenses();
  
  const categorySummary = getCategorySummary();
  const totalExpenses = getTotalExpenses();
  
  const categoryStats = Object.entries(CATEGORIES).map(([categoryKey, categoryData]) => {
    const category = categoryKey as keyof typeof CATEGORIES;
    const total = getTotalExpensesByCategory(category);
    const percentage = totalExpenses > 0 ? total / totalExpenses : 0;
    const budget = budgets.find(b => b.category === category);
    const remaining = getRemainingBudget(category);
    
    return {
      category,
      ...categoryData,
      total,
      percentage,
      budget: budget?.limit,
      remaining
    };
  }).sort((a, b) => b.total - a.total);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Expense Categories</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categoryStats.map((category) => (
                <tr key={category.category} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${category.bgColor} ${category.color} mr-3`}>
                        <category.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-900">{category.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {formatCurrency(category.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {formatPercentage(category.percentage)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {category.budget ? formatCurrency(category.budget) : '--'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {category.remaining !== null ? (
                      <span className={category.remaining >= 0 ? 'text-success-700' : 'text-error-700'}>
                        {category.remaining >= 0 
                          ? formatCurrency(category.remaining) 
                          : `-${formatCurrency(Math.abs(category.remaining))}`}
                      </span>
                    ) : (
                      '--'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-primary-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-primary-800 mb-2">About Categories</h3>
        <p className="text-sm text-primary-700">
          Categories help you organize your expenses and track spending patterns. You can set budgets for each category to manage your finances more effectively.
        </p>
      </div>
    </div>
  );
};

export default CategoriesTab;