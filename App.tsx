
import React, { useState } from 'react';
import { UserRole } from './types';
import Header from './components/Header';
import InvestorView from './views/InvestorView';
import AdvisorView from './views/AdvisorView';
import AnalystView from './views/AnalystView';
import AdminView from './views/AdminView';

const App: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.Investor);

  const renderView = () => {
    switch (currentUserRole) {
      case UserRole.Investor:
        return <InvestorView />;
      case UserRole.FinancialAdvisor:
        return <AdvisorView />;
      case UserRole.DataAnalyst:
        return <AnalystView />;
      case UserRole.Admin:
        return <AdminView />;
      default:
        return <InvestorView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans">
      <Header
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
