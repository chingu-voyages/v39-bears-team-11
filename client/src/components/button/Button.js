import React from 'react'
import styles from '../../styles/Button.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../store/features/users/usersSlice'

function Button() {
  const users = useSelector(state => state.users.value);

  return (
    <button className={styles.Button}>Button</button>
  )
}

export default Button
