import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { CATEGORIES } from '../../utils/categories';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = [
  '#0891b2', // primary-500
  '#7e22ce', // secondary-700
  '#f59e0b', // accent-500
  '#22c55e', // success-500
  '#f97316', // warning-500
  '#ef4444', // error-500
  '#6366f1', // indigo-500
  '#ec4899', // pink-500
  '#14b8a6', // teal-500
  '#a855f7', // purple-500
  '#0ea5e9', // sky-500
  '#8b5cf6'  // violet-500
];

const CategoryBreakdown: React.FC = () => {
  const { getCategorySummary, getTotalExpenses } = useExpenses();
  
  const categorySummary = getCategorySummary();
  const totalExpenses = getTotalExpenses();
  
  if (categorySummary.length === 0) {
    return (
      <div className="card p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No expense data available.</p>
        </div>
      </div>
    );
  }
  
  const chartData = categorySummary.map(item => ({
    name: CATEGORIES[item.category].label,
    value: item.amount,
    category: item.category
  }));
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-gray-600">{formatCurrency(payload[0].value)}</p>
          <p className="text-sm text-gray-500">
            {formatPercentage(payload[0].value / totalExpenses)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h3>
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <div className="space-y-3">
            {categorySummary.slice(0, 5).map((item, index) => {
              const category = CATEGORIES[item.category];
              return (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{category.label}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                    <span className="text-xs text-gray-500">{formatPercentage(item.percentage)}</span>
                  </div>
                </div>
              );
            })}
            
            {categorySummary.length > 5 && (
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2">
                View all categories
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;