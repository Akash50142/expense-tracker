import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';

const SpendingSummary: React.FC = () => {
  const { getTotalExpenses, getMonthlyExpenses } = useExpenses();
  
  const totalExpenses = getTotalExpenses();
  const monthlyData = getMonthlyExpenses(2);
  
  const currentMonth = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1] : { total: 0 };
  const previousMonth = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : { total: 0 };
  
  const percentChange = previousMonth.total > 0
    ? ((currentMonth.total - previousMonth.total) / previousMonth.total) * 100
    : 0;
  
  const isIncrease = percentChange > 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Spending Card */}
      <div className="card p-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Spending</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="p-3 rounded-full bg-primary-100 text-primary-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {/* Current Month Card */}
      <div className="card p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">This Month</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(currentMonth.total)}</p>
          </div>
          <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {/* Month-over-Month Change Card */}
      <div className="card p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Monthly Change</h3>
            <div className="flex items-center mt-1">
              <p className="text-2xl font-semibold text-gray-900">
                {percentChange === 0 ? '--' : `${Math.abs(percentChange).toFixed(1)}%`}
              </p>
              {percentChange !== 0 && (
                <span className={`ml-2 flex items-center text-sm ${isIncrease ? 'text-error-500' : 'text-success-500'}`}>
                  {isIncrease ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {isIncrease ? 'Increase' : 'Decrease'}
                </span>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-full ${isIncrease ? 'bg-error-100 text-error-600' : 'bg-success-100 text-success-600'}`}>
            {isIncrease ? (
              <TrendingUp className="w-6 h-6" />
            ) : (
              <TrendingDown className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingSummary;