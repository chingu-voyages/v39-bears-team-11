import styles from '../../styles/Button.module.css'

function Button({ text, className, ...props }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
