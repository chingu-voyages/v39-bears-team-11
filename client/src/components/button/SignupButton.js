import Button from './Button'
import styles from '../../styles/Button.module.css'

function SignupButton() {
  return (
    <Button
      text="signup"
      className={styles['button--signup']}
    />
  )
}

export default SignupButton
