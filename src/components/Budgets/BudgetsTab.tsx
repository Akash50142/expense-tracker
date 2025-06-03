import React, { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import BudgetList from './BudgetList';
import AddBudgetModal from './AddBudgetModal';
import EditBudgetModal from './EditBudgetModal';
import { Budget, ExpenseCategory } from '../../types';

const BudgetsTab: React.FC = () => {
  const { 
    budgets, 
    setBudget, 
    removeBudget, 
    getTotalExpensesByCategory 
  } = useExpenses();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  
  // Prepare spending data for BudgetList
  const budgetSpending: Record<ExpenseCategory, number> = {} as Record<ExpenseCategory, number>;
  budgets.forEach(budget => {
    budgetSpending[budget.category] = getTotalExpensesByCategory(budget.category);
  });
  
  const existingCategories = budgets.map(budget => budget.category);
  
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  
  const openEditModal = (budget: Budget) => {
    setEditingBudget(budget);
  };
  
  const closeEditModal = () => {
    setEditingBudget(null);
  };
  
  const handleAddBudget = (budget: Budget) => {
    setBudget(budget);
  };
  
  const handleEditBudget = (budget: Budget) => {
    setBudget(budget);
  };
  
  const handleDeleteBudget = (category: ExpenseCategory) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      removeBudget(category);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Budget Management</h2>
        <button
          onClick={openAddModal}
          className="btn-primary text-sm"
        >
          Add Budget
        </button>
      </div>
      
      <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
        <p className="text-primary-800 text-sm">
          Set monthly spending limits for different categories to help manage your finances.
        </p>
      </div>
      
      <BudgetList 
        budgets={budgets} 
        spending={budgetSpending}
        onEdit={openEditModal}
        onDelete={handleDeleteBudget}
      />
      
      {isAddModalOpen && (
        <AddBudgetModal 
          onClose={closeAddModal}
          onSubmit={handleAddBudget}
          existingCategories={existingCategories}
        />
      )}
      
      {editingBudget && (
        <EditBudgetModal 
          budget={editingBudget}
          onClose={closeEditModal}
          onSubmit={handleEditBudget}
        />
      )}
    </div>
  );
};

export default BudgetsTab;