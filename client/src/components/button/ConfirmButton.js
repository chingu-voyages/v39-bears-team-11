import styles from '../../styles/Button.module.css'
import Button from './Button'

function ConfirmButton({ text }) {
  return (
    <Button
      type="submit"
      text={text}
      className={styles['button--confirm']}
    />
  )
}

export default ConfirmButton
