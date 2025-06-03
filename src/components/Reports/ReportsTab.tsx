import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { format, parseISO, subMonths } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORIES } from '../../utils/categories';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

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

const ReportsTab: React.FC = () => {
  const { 
    expenses, 
    getMonthlyExpenses, 
    getCategorySummary,
    getTotalExpenses
  } = useExpenses();
  
  const monthlyData = getMonthlyExpenses(6).map(item => ({
    ...item,
    month: format(parseISO(item.month + '-01'), 'MMM yyyy')
  }));
  
  const categorySummary = getCategorySummary();
  const pieChartData = categorySummary.map(item => ({
    name: CATEGORIES[item.category].label,
    value: item.amount,
    color: CATEGORIES[item.category].color
  }));
  
  const today = new Date();
  const weeklyData = [];
  
  // Calculate weekly spending for the last 4 weeks
  for (let i = 0; i < 4; i++) {
    const weekEnd = subMonths(today, 0);
    weekEnd.setDate(today.getDate() - (i * 7));
    
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    
    const weekExpenses = expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return expenseDate >= weekStart && expenseDate <= weekEnd;
    });
    
    const total = weekExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    weeklyData.unshift({
      week: `Week ${4 - i}`,
      total
    });
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Spending Reports</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Chart */}
        <div className="card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Spending</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
        
        {/* Weekly Spending Chart */}
        <div className="card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Spending</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="week" 
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
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#7e22ce" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category Breakdown Chart */}
        <div className="card p-6 animate-fade-in lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return percent > 0.05 ? (
                      <text
                        x={x}
                        y={y}
                        fill="#374151"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                        fontSize={12}
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    ) : null;
                  }}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconSize={10}
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ fontSize: 12, color: '#374151' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Spending Summary */}
      <div className="card p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Total Spending</h4>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(getTotalExpenses())}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Average Monthly</h4>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(monthlyData.reduce((sum, month) => sum + month.total, 0) / Math.max(1, monthlyData.length))}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Top Category</h4>
            <p className="text-2xl font-semibold text-gray-900">
              {categorySummary.length > 0 ? CATEGORIES[categorySummary[0].category].label : '--'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;