import styles from '../../styles/SignupForm.module.css'

function Field({
  formChoice,
  iconSrc,
  iconAlt,
  type,
  placeholder,
  ariaLabel,
  name,
  handleInput,
  value,
  error,
}) {
  return (
    <div className={styles['SignupForm__input-container']}>
      <input
        type={type}
        aria-label={ariaLabel}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(event) => handleInput(event)}
        className={styles.SignupForm__input}
        required
      />
      <img src={iconSrc} alt={iconAlt} className={styles.SignupForm__icon} />
      {formChoice === 'signup' && error
        ? (
          <span className={styles.SignupForm__error}>
            {error}
          </span>
        ) : null}
    </div>
  )
}

export default Field
