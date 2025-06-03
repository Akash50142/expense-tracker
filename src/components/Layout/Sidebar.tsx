import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart2, 
  PieChart,
  Wallet, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'budgets', label: 'Budgets', icon: Wallet },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'categories', label: 'Categories', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  // Desktop sidebar
  const renderSidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          Spendwise
        </h1>
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-600 font-medium border-r-4 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  // Mobile menu button (shown on small screens)
  const mobileMenuButton = (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden fixed top-4 right-4 z-20 p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100"
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );

  // Mobile sidebar (overlay)
  const mobileSidebar = isMobileMenuOpen && (
    <div className="lg:hidden fixed inset-0 z-10 bg-gray-800 bg-opacity-75">
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        {renderSidebar()}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-0">
        {renderSidebar()}
      </div>
      
      {/* Mobile Menu Button and Sidebar */}
      {mobileMenuButton}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;