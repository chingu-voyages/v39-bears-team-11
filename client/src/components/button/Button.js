import React, { Fragment } from 'react'
import styles from '../../styles/Button.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../store/features/users/usersSlice'

function Button() {
  const users = useSelector(state => state.users.value);
  const dispatch = useDispatch();

  const handleLogin = () => {

  }

  const handleLogout = () => {

  }

  return <Fragment>
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
