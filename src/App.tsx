import React from 'react';
import Layout from './components/Layout/Layout';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExpenseProvider>
      <Layout />
    </ExpenseProvider>
  );
}

export default App;