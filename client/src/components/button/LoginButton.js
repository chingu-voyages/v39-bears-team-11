import Button from './Button'
import styles from '../../styles/Button.module.css'

function LoginButton({ isActive, handleFormChoiceClick }) {
  return (
    <Button
      text="login"
      className={`${styles['button--login']} ${isActive ? styles.isactive : null}`}
      onClick={() => handleFormChoiceClick('login')}
    />
  )
}

export default LoginButton
