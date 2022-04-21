import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { login, logout } from '../../store/features/users/usersSlice'
import styles from '../../styles/Button.module.css'

function Button() {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login({
      id: nanoid(),
      name: 'Moody Mudiaga',
    }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <h1>
        Welcome,
        {users.name}
      </h1>
      <button
        type="button"
        className={styles.Button}
        onClick={handleLogin}
      >
        Log In
      </button>
      <button
        type="button"
        className={styles.Button}
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  )
}

export default Button
