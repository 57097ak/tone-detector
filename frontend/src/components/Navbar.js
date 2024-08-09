import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';

/**
 * Navbar component for navigation and user authentication actions.
 * 
 * @component
 */
const Navbar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles user logout.
   */
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex">
        {userInfo ? (
          <>
            <li>
              <Link to="/sentiment-analysis">Sentiment Analysis</Link>
            </li>
            <li className="ml-auto">
              <button onClick={handleLogout} className="bg-red-600 p-2 rounded">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/"></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
