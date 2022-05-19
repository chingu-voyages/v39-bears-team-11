import Button from './Button'
import styles from '../../styles/Button.module.css'

function LoginButton() {
  return (
    <Button
      text="login"
      className={styles['button--login']}
    />
  )
}

export default LoginButton
