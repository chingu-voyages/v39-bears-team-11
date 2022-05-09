import styles from '../../styles/Button.module.css'
import Button from './Button'

function ConfirmButton({ text, buttonClasses }) {
  return (
    <Button
      type="submit"
      text={text}
      className={`${styles['button--confirm']} ${styles[buttonClasses]}`}
    />
  )
}

export default ConfirmButton
