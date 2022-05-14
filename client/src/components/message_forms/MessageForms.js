import styles from '../../styles/MessageForms.module.css'
import NewMessageForm from '../new_message_form/NewMessageForm'
import NewPictureButton from '../button/NewPictureButton'

function MessageForms() {
  return (
    <div className={styles['message-forms']}>
      <NewMessageForm />
      <NewPictureButton />
    </div>
  )
}

export default MessageForms
