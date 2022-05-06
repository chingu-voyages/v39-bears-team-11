import styles from '../../styles/Button.module.css'
import Button from './Button'

function CancelButton({ clickHandler }) {
  return (
    <Button
      text="Cancel"
      className={styles['button--cancel']}
      onClick={clickHandler}
    />
  )
}

export default CancelButton
