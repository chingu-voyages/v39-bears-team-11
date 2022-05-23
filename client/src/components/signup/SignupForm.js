import { useState } from 'react'
import SignupFormButton from '../button/SignupFormButton'
import Field from './Field'
import userIcon from '../../icons/signup/signup-user-icon.png'
import emailIcon from '../../icons/signup/signup-email-icon.png'
import passwordIcon from '../../icons/signup/signup-password-icon.png'
import styles from '../../styles/SignupForm.module.css'

function SignupForm({ formChoice, onValidatedSubmit }) {
  // create state variable to store:
  //    -current credentials from inputs in string (name, email, password)
  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: '',
  })
  //    -current error message for each field in a form of a object of strings
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  })

  const isFormValid = () => {
    const fieldValidationErrors = {}
    const isValidUsername = inputValues.username.length >= 5
    const isValidEmail = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(inputValues.email)
    const isValidPassword = inputValues.password.length >= 5

    fieldValidationErrors.username = isValidUsername ? '' : 'minimum 5 characters'
    fieldValidationErrors.email = isValidEmail ? '' : 'invalid email address'
    fieldValidationErrors.password = isValidPassword ? '' : 'minimum 5 characters'

    setErrors({ ...fieldValidationErrors })

    if (isValidUsername && isValidEmail && isValidPassword) { return true }
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
        <Field
          type="text"
          aria-label="Your Name"
          placeholder="Your Name"
          name="username"
          iconAlt="user"
          iconSrc={userIcon}
          handleInput={handleInput}
          formChoice={formChoice}
          error={errors.username}
          value={inputValues.name}
        />

        {(formChoice === 'signup')
          ? (
            <Field
              type="text"
              aria-label="Your Email"
              placeholder="Your Email"
              name="email"
              iconAlt="email"
              iconSrc={emailIcon}
              handleInput={handleInput}
              formChoice={formChoice}
              error={errors.email}
              value={inputValues.email}
            />
          ) : null}

        <Field
          type="password"
          aria-label="Your Password"
          placeholder="Password"
          name="password"
          iconAlt="password"
          iconSrc={passwordIcon}
          handleInput={handleInput}
          formChoice={formChoice}
          error={errors.password}
          value={inputValues.password}
        />

        <SignupFormButton choice={formChoice} type="submit" className={styles.SignupForm__button} />
      </form>
    </div>
  )
}
export default SignupForm
