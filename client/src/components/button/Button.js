import React, { Fragment } from 'react'
import styles from '../../styles/Button.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../store/features/users/usersSlice'
import { nanoid } from '@reduxjs/toolkit';

function Button() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({
      id: nanoid(),
      name: "Moody Mudiaga",
    }));
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return <Fragment>
      <h1>Welcome, {users.name}</h1>
      <button 
      className={styles.Button}
      onClick={handleLogin}
      >Log In
      </button>
      <button 
      className={styles.Button}
      onClick={handleLogout}
      >Log Out
      </button>
    </Fragment>

}

export default Button
