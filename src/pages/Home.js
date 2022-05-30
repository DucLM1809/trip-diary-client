import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions';
import { Link, useLocation, useNavigate } from "react-router-dom";

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
      <button className='bg-light-blue'><Link to={"/add-detail"}>AddDetail</Link></button>
      <button className='bg-light-green'><Link to={"/create"}>Create</Link></button>
    </div>
  );
};

export default Home;
