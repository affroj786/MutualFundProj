
import React, { useState } from 'react';
import { MUTUAL_FUNDS } from '../constants';
import { MutualFund } from '../types';
import FundCard from '../components/FundCard';
import FundDetailModal from '../components/FundDetailModal';

const InvestorView: React.FC = () => {
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);

  const handleSelectFund = (fund: MutualFund) => {
    setSelectedFund(fund);
  };

  const handleCloseModal = () => {
    setSelectedFund(null);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Explore Mutual Funds</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Discover and compare funds to find the perfect fit for your investment goals.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MUTUAL_FUNDS.map((fund) => (
          <FundCard key={fund.id} fund={fund} onSelect={handleSelectFund} />
        ))}
      </div>
      {selectedFund && (
        <FundDetailModal fund={selectedFund} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default InvestorView;
