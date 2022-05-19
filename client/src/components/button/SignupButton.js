import Button from './Button'
import styles from '../../styles/Button.module.css'

function SignupButton({ isActive, handleFormChoiceClick }) {
  return (
    <Button
      text="signup"
      className={`${styles['button--signup']} ${isActive ? styles.isactive : null}`}
      onClick={() => handleFormChoiceClick('signup')}
    />
  )
}

export default SignupButton
