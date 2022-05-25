import styles from '../../styles/Signup-styles/SignupFormField.module.css'

function SignupFormField({
  formChoice,
  iconSrc,
  type,
  placeholder,
  name,
  handleInput,
  value,
  error,
}) {
  return (
    <div className={styles['SignupFormField__input-container']}>
      <input
        type={type}
        aria-label={placeholder}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInput}
        className={styles.SignupFormField__input}
        required
      />
      <img src={iconSrc} alt={name} className={styles.SignupFormField__icon} />

      {/* We only show an error in the signup mode therefore we first have to check
      if we are in the signup mode. Then we have to check if the error exists.
      If both statements are true the error will be presented. */}
      {formChoice === 'signup' && error
        ? (
          <span className={styles.SignupFormField__error}>
            {error}
          </span>
        ) : null}
    </div>
  )
}

export default SignupFormField
