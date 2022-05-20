import { useState } from 'react'
import SignupFormButton from '../button/SignupFormButton'
import userIcon from '../../icons/signup/signup-user-icon.png'
import emailIcon from '../../icons/signup/signup-email-icon.png'
import passwordIcon from '../../icons/signup/signup-password-icon.png'
import styles from '../../styles/SignupForm.module.css'

function SignupForm({ formChoice, handleSubmit }) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    formErrors: { name: '', email: '', password: '' },
    isValidName: false,
    isValidEmail: false,
    isValidPassword: false,
    isValidForm: false,
  })

  const validateForm = () => {
    setCredentials({
      ...credentials,
      formValid: credentials.isValidName
      && credentials.isValidEmail
      && credentials.isValidPassword,
    })
  }

  const validateField = (property, value) => {
    const fieldValidationErrors = credentials.formErrors
    let { isValidName } = credentials
    let { isValidEmail } = credentials
    let { isValidPassword } = credentials

    switch (property) {
    case 'name':
      isValidName = value.length >= 5
      fieldValidationErrors.name = isValidName ? '' : 'minimum 5 characters'
      break
    case 'email':
      isValidEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      fieldValidationErrors.email = isValidEmail ? '' : 'invalid email address'
      break
    case 'password':
      isValidPassword = value.length >= 5
      fieldValidationErrors.password = isValidPassword ? '' : 'minimum 5 characters'
      break
    default: console.log('Error in passing property')
    }

    setCredentials({
      ...credentials,
      formErrors: fieldValidationErrors,
      isValidName,
      isValidEmail,
      isValidPassword,
    }, validateForm)
  }

  const handleInput = (e) => {
    const property = e.target.name
    const { value } = e.target
    setCredentials(
      { ...credentials, [property]: value },
      () => { validateField(property, value) },
    )
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
          {credentials.formErrors.name
            ? (
              <span className={styles.SignupForm__error}>
                {credentials.formErrors.name}
              </span>
            ) : null}
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
              {credentials.formErrors.email
                ? (
                  <span className={styles.SignupForm__error}>
                    {credentials.formErrors.email}
                  </span>
                ) : null}
            </div>
          ) : null}
        <div className={styles['SignupForm__input-container']}>
          <input
            type="password"
            aria-label="Your Password"
            placeholder="Your Password"
            name="password"
            value={credentials.password}
            onChange={(event) => handleInput(event)}
            className={styles.SignupForm__input}
            required
          />
          <img src={passwordIcon} alt="password" className={styles.SignupForm__icon} />
          {credentials.formErrors.password
            ? (
              <span className={styles.SignupForm__error}>
                {credentials.formErrors.password}
              </span>
            ) : null}
        </div>
        <SignupFormButton choice={formChoice} type="submit" className={styles.SignupForm__button} />
      </form>
    </div>
  )
}
export default SignupForm
