
import React from 'react';
import { MutualFund } from '../types';

interface FundCardProps {
  fund: MutualFund;
  onSelect: (fund: MutualFund) => void;
}

const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
  switch (risk) {
    case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }
};

const FundCard: React.FC<FundCardProps> = ({ fund, onSelect }) => {
  const returnColor = fund.oneYearReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';

  return (
    <div
      onClick={() => onSelect(fund)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{fund.name}</h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getRiskColor(fund.riskLevel)}`}>
              {fund.riskLevel} Risk
            </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{fund.category}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{fund.description}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">1Y Return</p>
          <p className={`text-lg font-semibold ${returnColor}`}>{fund.oneYearReturn.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Expense Ratio</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{fund.expenseRatio}%</p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
