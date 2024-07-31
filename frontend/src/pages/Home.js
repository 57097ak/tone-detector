import React from 'react';
import { useSelector } from 'react-redux';
import Profile from '../components/Profile';

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log('User Info in Home:', userInfo);  // Add this to debug

  return (
    <div>
      <h1>Home Page</h1>
      <Profile />
    </div>
  );
};

export default Home;
