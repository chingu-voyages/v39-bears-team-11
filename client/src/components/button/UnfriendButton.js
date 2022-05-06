import styles from '../../styles/Button.module.css'
import Button from './Button'

function UnfriendButton() {
  const handleUnfriendClick = () => {
    // display consent dialogue or send request
  }

  return (
    <Button
      text="Unfriend"
      className={styles.unfriend}
      onClick={handleUnfriendClick}
    />
  )
}

export default UnfriendButton
