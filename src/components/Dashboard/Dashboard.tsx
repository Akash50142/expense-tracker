import React, { useState } from 'react';
import SpendingSummary from './SpendingSummary';
import RecentExpenses from './RecentExpenses';
import CategoryBreakdown from './CategoryBreakdown';
import MonthlyTrend from './MonthlyTrend';
import BudgetOverview from './BudgetOverview';
import EditExpenseModal from '../Expenses/EditExpenseModal';

interface DashboardProps {
  onAddExpenseClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAddExpenseClick }) => {
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const handleEditExpense = (id: string) => {
    setEditingExpenseId(id);
  };

  const handleCloseEditModal = () => {
    setEditingExpenseId(null);
  };

  return (
    <div className="space-y-6">
      <SpendingSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrend />
        <CategoryBreakdown />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentExpenses onEditExpense={handleEditExpense} />
        <BudgetOverview />
      </div>

      {editingExpenseId && (
        <EditExpenseModal 
          expenseId={editingExpenseId} 
          onClose={handleCloseEditModal} 
        />
      )}
    </div>
  );
};

export default Dashboard;