import { forwardRef } from 'react'
import styles from '../../styles/ModalStartAChat.module.css'
import FriendsStartAChat from '../chats/FriendsStartAChat'

const ModalStartAChat = forwardRef(({ friends, onCloseModal, onOpenAChatClick }, ref) => (

  <dialog ref={ref} className={styles.modal}>

    <div className={styles.modal__header}>
      <h4>Select a contact</h4>
      <button type="button" className={styles['modal__close-button']} onClick={onCloseModal}>✕</button>
    </div>
    <hr />
    <FriendsStartAChat friends={friends} onOpenAChatClick={onOpenAChatClick} />

  </dialog>
))

export default ModalStartAChat
