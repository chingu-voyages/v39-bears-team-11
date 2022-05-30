import { useDispatch } from 'react-redux'
import styles from '../../styles/ChatRoom-styles/MessageForms.module.css'
import sendIcon from '../../icons/chat-room/chatroom-send-icon.png'
import { addTextMessage } from '../../store/features/messages/messagesSlice'

function NewMessageForm({ socketSendHandler }) {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = event.target.message.value
    dispatch(addTextMessage(message))
    event.target.message.value = '' // eslint-disable-line no-param-reassign
    socketSendHandler(message)
  }

  return (
    <form
      className={styles['message-form']}
      onSubmit={handleSubmit}
    >
      <textarea
        required
        /* eslint-disable-next-line jsx-a11y/no-autofocus */
        autoFocus
        type="text"
        name="message"
        placeholder="Start typing ..."
      />
      <button
        className={styles['message-form__btn']}
        type="submit"
      >
        <img src={sendIcon} alt="paper dart" />
      </button>
    </form>
  )
}

export default NewMessageForm
