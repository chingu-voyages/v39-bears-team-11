import React from 'react'
import styles from '../../styles/Button.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../store/features/users/usersSlice'

function Button() {
  const users = useSelector(state => state.users.value);

  const handleLogin = () => {

  }

  const handleLogout = () => {

  }

  return (
    <button 
    className={styles.Button}
    onClick={handleLogin}
    >Log In
    </button>
    <button 
    className={styles.Button}
    onClick={handleLogin}
    >Log Out</button>
  )
}

export default Button
