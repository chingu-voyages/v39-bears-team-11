import styles from '../../styles/Button.module.css'

function Button({
  text, className, icon, iconAlt, ...props
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      {...props}
    >
      {text}

      {/* Check if the icon has been passed. If yes, add it to the button. */}
      {icon && <img src={icon} alt={iconAlt} />}
    </button>
  )
}

export default Button
