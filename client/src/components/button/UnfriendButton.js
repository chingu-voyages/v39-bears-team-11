import styles from '../../styles/Button.module.css'
import Button from './Button'

function UnfriendButton({ handleUnfriendClick }) {
  return (
    <Button
      text="Unfriend"
      className={styles['button--unfriend']}
      onClick={handleUnfriendClick}
    />
  )
}

export default UnfriendButton
