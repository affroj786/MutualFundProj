
import React from 'react';

const AnalystView: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Data Analyst Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          This is the dashboard for analyzing investment trends, updating fund performance data, and generating reports.
        </p>
        <div className="mt-8">
            <img src="https://picsum.photos/800/400?random=1" alt="Data Visualization" className="rounded-lg mx-auto shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default AnalystView;
