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
        onChange={(event) => handleInput(event)}
        className={styles.SignupFormField__input}
        required
      />
      <img src={iconSrc} alt={name} className={styles.SignupFormField__icon} />
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
