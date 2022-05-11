import styles from '../../styles/ModalStartAChat.module.css'
import FriendsStartAChat from '../friends_start_a_chat/FriendsStartAChat'

function ModalStartAChat({ friends, show, onClose }) {
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  if (!show) {
    return null
  }
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal__content} onClick={stopPropagation}>
        <div className={styles.modal__header}>
          <h4>Select a contact</h4>
          <button type="button" className={styles['modal__close-button']} onClick={onClose}>✕</button>
        </div>
        <hr />
        <FriendsStartAChat friends={friends} />
      </div>
    </div>
  )
}

export default ModalStartAChat

// 1. refactor classnames into dynamic classnames
// 2. apply style to the modal
// 3. hadnle show/hide modal
// 4. implement onClose event
// 5. close modal by outside click
// 6. close modal by escape keydown event
// 7. add dynamic modal content
// 8. add animation to modal using CSS
// 9. add animation to modal using transition group
