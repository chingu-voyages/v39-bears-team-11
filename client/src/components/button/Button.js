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
      {/* Check if the button contains text. If yes then include it and wrap it in the span tag */}
      {text && <span>{text}</span>}

      {/* Check if the button contains an icon. If yes then include the icon inside the button. */}
      {icon && <img src={icon} alt={iconAlt} />}
    </button>
  )
}

export default Button
