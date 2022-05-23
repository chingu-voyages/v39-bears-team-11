import { useState } from 'react'
import SignupFormButton from '../button/SignupFormButton'
import userIcon from '../../icons/signup/signup-user-icon.png'
import emailIcon from '../../icons/signup/signup-email-icon.png'
import passwordIcon from '../../icons/signup/signup-password-icon.png'
import styles from '../../styles/SignupForm.module.css'

function SignupForm({ formChoice, onValidatedSubmit }) {
  // create state variable to store:
  //    -current credentials from inputs in string (name, email, password)
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
  })
  //    -current error message for each field in a form of a object of strings
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  })

  const isFormValid = () => {
    const fieldValidationErrors = {}
    const isValidName = inputValues.name.length >= 5
    const isValidEmail = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(inputValues.email)
    const isValidPassword = inputValues.password.length >= 5

    fieldValidationErrors.name = isValidName ? '' : 'minimum 5 characters'
    fieldValidationErrors.email = isValidEmail ? '' : 'invalid email address'
    fieldValidationErrors.password = isValidPassword ? '' : 'minimum 5 characters'

    setErrors({ ...fieldValidationErrors })

    if (isValidName && isValidEmail && isValidPassword) { return true }
    return false
  }

  // Create handleInput function runs on every change of any input field.
  const handleInput = (e) => {
    // Store name and value of the current input field:
    //   -the name will become our property that we can use on credentials variable
    //   -the value will be the new value of the chosen property
    const property = e.target.name
    const { value } = e.target

    // Update inputValues variable. It will update the current value of the field
    setInputValues({
      ...inputValues,
      [property]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if ((formChoice === 'signup' && isFormValid()) || (formChoice === 'login')) {
      onValidatedSubmit({ ...inputValues })
    }
  }

  return (
    <div className={styles.SignupForm__container}>
      <h4 className={styles.SignupForm__heading}>
        {formChoice === 'login' && 'Login To Your Account'}
        {formChoice === 'signup' && 'Create Your Account'}
      </h4>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={styles.SignupForm}
      >
        <div className={styles['SignupForm__input-container']}>
          <input
            type="text"
            aria-label="Your Name"
            placeholder="Your Name"
            name="name"
            value={inputValues.name}
            onChange={(event) => handleInput(event)}
            className={styles.SignupForm__input}
            required
          />
          <img src={userIcon} alt="user" className={styles.SignupForm__icon} />
          {formChoice === 'signup' && errors.name
            ? (
              <span className={styles.SignupForm__error}>
                {errors.name}
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
                value={inputValues.email}
                onChange={(event) => handleInput(event)}
                className={styles.SignupForm__input}
                required
              />
              <img src={emailIcon} alt="email" className={styles.SignupForm__icon} />
              {errors.email
                ? (
                  <span className={styles.SignupForm__error}>
                    {errors.email}
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
            value={inputValues.password}
            onChange={(event) => handleInput(event)}
            className={styles.SignupForm__input}
            required
          />
          <img src={passwordIcon} alt="password" className={styles.SignupForm__icon} />
          {formChoice === 'signup' && errors.password
            ? (
              <span className={styles.SignupForm__error}>
                {errors.password}
              </span>
            ) : null}
        </div>
        <SignupFormButton choice={formChoice} type="submit" className={styles.SignupForm__button} />
      </form>
    </div>
  )
}
export default SignupForm
