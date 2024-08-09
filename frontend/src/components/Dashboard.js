import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeSearchHistory } from '../store/sentimentSlice';

/**
 * Dashboard component displays the search history.
 * 
 * @component
 */
const Dashboard = () => {
  const searchHistory = useSelector((state) => state.sentiments.searchHistory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles click on a search history entry.
   * 
   * @param {number} index - The index of the search history entry.
   */
  const handleClick = (index) => {
    navigate(`/result/${index}`);
  };

  /**
   * Handles delete of a search history entry.
   * 
   * @param {number} index - The index of the search history entry.
   */
  const handleDelete = (index) => {
    dispatch(removeSearchHistory(index));
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Search History</h2>
      {searchHistory.length === 0 ? (
        <p>No search history available.</p>
      ) : (
        <ul>
          {searchHistory.map((entry, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <p
                className="font-semibold cursor-pointer"
                onClick={() => handleClick(index)}
              >
                Input: {entry.text}
              </p>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 hover:text-red-700 cursor-pointer ml-4"
                onClick={() => handleDelete(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
