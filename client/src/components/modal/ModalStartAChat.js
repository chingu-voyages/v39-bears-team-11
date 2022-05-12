import styles from '../../styles/ModalStartAChat.module.css'
import FriendsStartAChat from '../friends_start_a_chat/FriendsStartAChat'

function ModalStartAChat({ friends, show, onCloseModal }) {
  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div role="presentation" className={`${styles.modal} ${show && styles.show}`} onClick={onCloseModal}>
      <div role="presentation" className={styles.modal__content} onClick={stopPropagation}>
        <div className={styles.modal__header}>
          <h4>Select a contact</h4>
          <button type="button" className={styles['modal__close-button']} onClick={onCloseModal}>✕</button>
        </div>
        <hr />
        <FriendsStartAChat friends={friends} />
      </div>
    </div>
  )
}

export default ModalStartAChat
