import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(logOut());
  };

  return (
    <div className='text-lg'>
      Welcome{' '}
      {userInfo.username ? userInfo.username : userInfo.email.split('@')[0]}
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
