
import React, { useState } from 'react';
import { generateArticleIdeas } from '../services/geminiService';

const AdvisorView: React.FC = () => {
  const [topic, setTopic] = useState<string>('diversification');
  const [ideas, setIdeas] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateIdeas = async () => {
    if (!topic) return;
    setIsLoading(true);
    const result = await generateArticleIdeas(topic);
    setIdeas(result);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">AI Content Assistant</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Welcome, Financial Advisor. Use this tool to brainstorm educational content for your clients.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., risk management)"
            className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
          />
          <button
            onClick={handleGenerateIdeas}
            disabled={isLoading}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition duration-300"
          >
            {isLoading ? 'Generating...' : 'Generate Article Ideas'}
          </button>
        </div>

        {isLoading && (
            <div className="space-y-4 animate-pulse mt-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        )}

        {ideas && !isLoading && (
          <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Generated Ideas:</h3>
             <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: ideas.replace(/\n/g, '<br />') }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvisorView;
