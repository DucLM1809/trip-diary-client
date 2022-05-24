import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/actions'

const Home = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    dispatch(logOut())
  }

  return (
    <div>
      Home
      <br />
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home