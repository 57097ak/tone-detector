import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard component displays the search history.
 * 
 * @component
 */
const Dashboard = () => {
  const searchHistory = useSelector((state) => state.sentiments.searchHistory);
  console.log('Search History in Dashboard:', searchHistory);
  const navigate = useNavigate();

  /**
   * Handles click on a search history entry.
   * 
   * @param {number} index - The index of the search history entry.
   */
  const handleClick = (index) => {
    navigate(`/result/${index}`);
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Search History</h2>
      {searchHistory.length === 0 ? (
        <p>No search history available.</p>
      ) : (
        <ul>
          {searchHistory.map((entry, index) => (
            <li key={index} className="mb-2">
              <p
                className="font-semibold cursor-pointer"
                onClick={() => handleClick(index)}
              >
                Input: {entry.text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
