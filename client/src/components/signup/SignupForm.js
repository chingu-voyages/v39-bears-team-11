import styles from '../../styles/SignupForm.module.css'

function SignupForm({ formChoice }) {
  return (
    <div className={styles.Signup__form__container}>
      <h4 className={styles.Signup__form__heading}>
        {formChoice === 'login' && 'Login To Your Account'}
        {formChoice === 'signup' && 'Create Your Account'}
      </h4>
      <form className={styles.Signup__form}>
        <input type="text" className={styles.Signup__form__input} />
        <input type="text" className={styles.Signup__form__input} />
        <input type="text" className={styles.Signup__form__input} />
        <button type="submit" className={styles.Signup__form__button}>ssd</button>
      </form>
    </div>
  )
}
export default SignupForm
