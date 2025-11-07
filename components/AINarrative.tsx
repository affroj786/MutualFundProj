
import React, { useState, useEffect } from 'react';
import { MutualFund } from '../types';
import { generateFundInsight } from '../services/geminiService';
import { SparklesIcon, SendIcon } from './icons/RoleIcons';

interface AINarrativeProps {
  fund: MutualFund;
}

const AINarrative: React.FC<AINarrativeProps> = ({ fund }) => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initialQuery = `Provide a detailed analysis of the ${fund.name}. What are its primary risks and who is this fund suitable for?`;

  const fetchInsight = async (currentQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateFundInsight(fund, currentQuery);
      setResponse(result);
    } catch (err) {
      setError('Failed to fetch AI insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fund]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchInsight(query);
      setQuery('');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 flex flex-col h-full border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <SparklesIcon />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ml-2">AI-Powered Insights</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto mb-4 pr-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <label htmlFor="ai-query" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Ask a follow-up question:</label>
        <div className="relative">
          <input
            id="ai-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Explain the top holdings..."
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-600 disabled:text-gray-400"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AINarrative;
