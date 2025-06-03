import React, { useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { clearData } from '../../utils/localStorage';

const SettingsTab: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleClearData = () => {
    setShowConfirmation(true);
  };
  
  const confirmClearData = () => {
    clearData();
    setShowConfirmation(false);
    setSuccessMessage('All data has been cleared successfully.');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
      // Reload the page to reset the app state
      window.location.reload();
    }, 3000);
  };
  
  const cancelClearData = () => {
    setShowConfirmation(false);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
      
      {successMessage && (
        <div className="bg-success-50 border border-success-200 text-success-800 px-4 py-3 rounded flex items-center">
          <Check className="h-5 w-5 mr-2" />
          {successMessage}
        </div>
      )}
      
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">About Your Data</h4>
            <p className="text-sm text-gray-600">
              Spendwise stores all your expense data locally in your browser. Your data is never sent to any server and remains private to your device.
            </p>
          </div>
          
          {!showConfirmation ? (
            <button
              onClick={handleClearData}
              className="btn-danger"
            >
              Clear All Data
            </button>
          ) : (
            <div className="bg-error-50 border border-error-200 p-4 rounded-md">
              <div className="flex items-start mb-3">
                <AlertTriangle className="h-5 w-5 text-error-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-error-800">Are you sure?</h4>
                  <p className="text-sm text-error-700 mt-1">
                    This will permanently delete all your expenses, budgets, and settings. This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={cancelClearData}
                  className="btn-ghost text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearData}
                  className="btn-danger text-sm"
                >
                  Yes, Delete Everything
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">About Spendwise</h3>
        <p className="text-sm text-gray-600 mb-2">
          Spendwise is a personal expense tracking application that helps you manage your finances, track spending patterns, and stay within budget.
        </p>
        <p className="text-sm text-gray-600">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;