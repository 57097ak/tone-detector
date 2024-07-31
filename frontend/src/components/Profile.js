import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  
  console.log('User Info:', userInfo);  // Add this to debug

  if (!userInfo) {
    return <p>No user information available.</p>;
  }

  return (
    <div>
      <h1>Welcome, {userInfo.name}</h1>
      <p>Email: {userInfo.email}</p>
    </div>
  );
};

export default Profile;
