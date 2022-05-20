import Button from '../button/Button'
import styles from '../../styles/SignupForm.module.css'

function SignupForm({ formChoice }) {
  return (
    <div className={styles.SignupForm__container}>
      <h4 className={styles.SignupForm__heading}>
        {formChoice === 'login' && 'Login To Your Account'}
        {formChoice === 'signup' && 'Create Your Account'}
      </h4>
      <form className={styles.SignupForm}>
        <input type="text" aria-label="Your Name" className={styles.SignupForm__input} />
        <input type="text" aria-label="Your Email" className={styles.SignupForm__input} />
        <input type="text" aria-label="Your Password" className={styles.SignupForm__input} />
        <button type="submit" className={styles.SignupForm__button}>ssd</button>
      </form>
    </div>
  )
}
export default SignupForm
