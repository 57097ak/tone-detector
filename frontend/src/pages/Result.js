// src/pages/Result.js

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard'; // Make sure the path to Dashboard is correct

/**
 * ResultPage component displays the results of a sentiment analysis from search history.
 *
 * @component
 * @example
 * return (
 *   <ResultPage />
 * )
 */
const ResultPage = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const searchHistory = useSelector((state) => state.sentiments.searchHistory);
  const entry = searchHistory[index];

  // Display a message if no result is found for the given index
  if (!entry) return <p>No result found</p>;

  // Format the overall results
  const overall = entry.result.overall.map(([percentage, feeling, emoji]) => ({
    feeling,
    emoji,
    percentage: (percentage * 100).toFixed(2),
  }));

  return (
    <div className="flex">
      <Dashboard />
      <div className="mt-4 p-4 bg-gray-100 rounded shadow-md w-3/4">
        <h3 className="text-xl mb-2 font-semibold">Analysis Result:</h3>
        <p className="text-lg mb-2"><strong>User Input:</strong> {entry.text}</p>
        {overall.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center mb-1">
              <span className="mr-2">{item.emoji}</span>
              <span>{item.feeling}</span>
            </div>
            <div className="relative h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-purple-600"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
        <button
          onClick={() => navigate('/sentiment-analysis')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
