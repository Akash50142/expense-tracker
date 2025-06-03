import React from 'react';
import { Wallet, PlusCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  onAddExpenseClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onAddExpenseClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center lg:hidden">
        <Wallet className="h-6 w-6 text-primary-600 mr-2" />
        <h1 className="text-xl font-bold text-gray-800">Spendwise</h1>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 hidden lg:block">{title}</h2>
      
      {onAddExpenseClick && (
        <button
          onClick={onAddExpenseClick}
          className="btn-primary flex items-center gap-1 text-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      )}
    </header>
  );
};

export default Header;