import Button from './Button'
import styles from '../../styles/Button.module.css'

function AddFriendButton({ handleAddFriendClick }) {
  return (
    <Button
      text="Add Friend"
      className={styles['button--add-friend']}
      onClick={handleAddFriendClick}
    />
  )
}

export default AddFriendButton
