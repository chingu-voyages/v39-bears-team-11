import Button from './Button'
import styles from '../../styles/Button.module.css'

function SignupFormButton({ type, choice, className }) {
  console.log(choice)
  return (
    <Button
      text={choice}
      className={`${styles['button--signup-form-submit']} ${className}`}
      type={type}
    />
  )
}

export default SignupFormButton
