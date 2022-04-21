import React from 'react'
import styles from '../../styles/Button.module.css'
import { useSelector, useDispatch } from 'react-redux'

function Button() {
  return (
    <button className={styles.Button}>Button</button>
  )
}

export default Button
