import styles from '../../styles/Button.module.css'

function Button({
<<<<<<< HEAD
  text, className, icon, iconAlt, ...props
=======
  text, className, ...props
>>>>>>> create active button on click functionality
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      {...props}
    >
      {/* Check if the button contains text. If yes then include it and wrap it in the span tag.
          Wrapping it into the span tag will make this element easier to access and to work on.
          For example in styling: button > span {display:none} */}
      {text && <span>{text}</span>}

      {/* Check if the button contains an icon. If yes then include the icon inside the button. */}
      {icon && <img src={icon} alt={iconAlt} />}
    </button>
  )
}

export default Button
