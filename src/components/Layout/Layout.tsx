import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../Dashboard/Dashboard';
import ExpensesTab from '../Expenses/ExpensesTab';
import BudgetsTab from '../Budgets/BudgetsTab';
import ReportsTab from '../Reports/ReportsTab';
import CategoriesTab from '../Categories/CategoriesTab';
import SettingsTab from '../Settings/SettingsTab';
import AddExpenseModal from '../Expenses/AddExpenseModal';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  const closeAddExpenseModal = () => {
    setIsAddExpenseModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onAddExpenseClick={openAddExpenseModal} />;
      case 'expenses':
        return <ExpensesTab onAddExpenseClick={openAddExpenseModal} />;
      case 'budgets':
        return <BudgetsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'categories':
        return <CategoriesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <Dashboard onAddExpenseClick={openAddExpenseModal} />;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'expenses': return 'Expenses';
      case 'budgets': return 'Budgets';
      case 'reports': return 'Reports';
      case 'categories': return 'Categories';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getTabTitle()} 
          onAddExpenseClick={activeTab === 'dashboard' || activeTab === 'expenses' ? openAddExpenseModal : undefined} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>

      {isAddExpenseModalOpen && (
        <AddExpenseModal onClose={closeAddExpenseModal} />
      )}
    </div>
  );
};

export default Layout;