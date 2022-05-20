import { useState } from 'react'
import SignupFormButton from '../button/SignupFormButton'
import styles from '../../styles/SignupForm.module.css'
import userIcon from '../../icons/signup/signup-user-icon.png'
import emailIcon from '../../icons/signup/signup-email-icon.png'
import passwordIcon from '../../icons/signup/signup-password-icon.png'

function SignupForm({ formChoice, handleSubmit }) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    formErrors: { name: '', email: '', password: '' },
    nameValid: false,
    emailValid: false,
    passwordValid: false,
    formValid: false,
  })
  const handleInput = (e) => {
    const property = e.target.name
    const { value } = e.target
    setCredentials({ ...credentials, [property]: value })
    console.log(credentials)
  }
  return (
    <div className={styles.SignupForm__container}>
      <h4 className={styles.SignupForm__heading}>
        {formChoice === 'login' && 'Login To Your Account'}
        {formChoice === 'signup' && 'Create Your Account'}
      </h4>
      <form onSubmit={handleSubmit} className={styles.SignupForm}>
        <div className={styles['SignupForm__input-container']}>
          <input
            type="text"
            aria-label="Your Name"
            placeholder="Your Name"
            name="name"
            value={credentials.name}
            onChange={(event) => handleInput(event)}
            className={styles.SignupForm__input}
            required
          />
          <img src={userIcon} alt="user" className={styles.SignupForm__icon} />
        </div>
        {(formChoice === 'signup')
          ? (
            <div className={styles['SignupForm__input-container']}>
              <input
                type="text"
                aria-label="Your Email"
                placeholder="Your Email"
                name="email"
                value={credentials.email}
                onChange={(event) => handleInput(event)}
                className={styles.SignupForm__input}
                required
              />
              <img src={emailIcon} alt="email" className={styles.SignupForm__icon} />
            </div>
          ) : null}
        <div className={styles['SignupForm__input-container']}>
          <input
            type="text"
            aria-label="Your Password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={(event) => handleInput(event)}
            className={styles.SignupForm__input}
            required
          />
          <img src={passwordIcon} alt="password" className={styles.SignupForm__icon} />
        </div>
        <SignupFormButton choice={formChoice} type="submit" className={styles.SignupForm__button} />
      </form>
    </div>
  )
}
export default SignupForm
