import Messages from '../messages/Messages'
import MessageForms from '../message_forms/MessageForms'
import styles from '../../styles/MessageForms.module.css'

function ChatRoom() {
  return (
    <div id={styles.chatroom} className="container main">
      <Messages />
      <MessageForms />
    </div>
  )
}

export default ChatRoom
