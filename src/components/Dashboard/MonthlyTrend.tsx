import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { formatCurrency, formatMonthYear } from '../../utils/formatters';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MonthlyTrend: React.FC = () => {
  const { getMonthlyExpenses } = useExpenses();
  
  const monthlyData = getMonthlyExpenses(6).map(item => ({
    ...item,
    month: formatMonthYear(item.month + '-01')
  }));
  
  if (monthlyData.every(item => item.total === 0)) {
    return (
      <div className="card p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Spending Trend</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No spending data available.</p>
        </div>
      </div>
    );
  }
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{label}</p>
          <p className="text-primary-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Spending Trend</h3>
      
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value).split('.')[0]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="total" 
              name="Spending" 
              fill="#0891b2" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyTrend;