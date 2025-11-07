
import React from 'react';
import { UserRole } from '../types';
import { USER_ROLES } from '../constants';
import { UserIcon, AdminIcon, AnalystIcon, AdvisorIcon } from './icons/RoleIcons';

interface HeaderProps {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
}

const roleIcons: Record<UserRole, React.ReactNode> = {
    [UserRole.Investor]: <UserIcon />,
    [UserRole.FinancialAdvisor]: <AdvisorIcon />,
    [UserRole.DataAnalyst]: <AnalystIcon />,
    [UserRole.Admin]: <AdminIcon />,
};

const Header: React.FC<HeaderProps> = ({ currentUserRole, setCurrentUserRole }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <svg className="h-8 w-8 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">FundSphere AI</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
             <span className="hidden sm:inline text-sm font-medium text-gray-600 dark:text-gray-300">Viewing as:</span>
            <div className="relative">
              <select
                id="role-selector"
                value={currentUserRole}
                onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
                className="appearance-none w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white py-2 pl-8 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {USER_ROLES.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 dark:text-gray-400">
                {roleIcons[currentUserRole]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
