
import React from 'react';
import { MutualFund } from '../types';
import PerformanceChart from './PerformanceChart';
import AINarrative from './AINarrative';
import { CloseIcon } from './icons/RoleIcons';

interface FundDetailModalProps {
  fund: MutualFund;
  onClose: () => void;
}

const FundDetailModal: React.FC<FundDetailModalProps> = ({ fund, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{fund.name}</h2>
            <p className="text-md text-gray-500 dark:text-gray-400">{fund.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Details & Chart */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Fund Snapshot</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">NAV</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">${fund.nav.toFixed(2)}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">AUM</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">${fund.aum}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">Expense Ratio</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">{fund.expenseRatio}%</p>
                </div>
                 <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">1Y Return</p>
                  <p className={`font-bold text-lg ${fund.oneYearReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>{fund.oneYearReturn}%</p>
                </div>
              </div>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Performance (12 Months)</h3>
                <div className="h-64 w-full bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                    <PerformanceChart data={fund.performance} />
                </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Top 10 Holdings</h3>
              <ul className="space-y-2 text-sm">
                {fund.holdings.map(holding => (
                  <li key={holding.name} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                    <span className="text-gray-700 dark:text-gray-300">{holding.name}</span>
                    <span className="font-mono text-gray-900 dark:text-white">{holding.percentage.toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: AI Insights */}
          <div className="flex flex-col">
            <AINarrative fund={fund} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetailModal;
