import { useSelector } from 'react-redux'
import styles from '../../styles/Messages.module.css'

function Message({
  senderId,
  content,
  time,
  currentFriend,
}) {
  const userState = useSelector(({ user }) => user)
  const { username, picture } = userState

  const isFriendMessage = () => senderId === currentFriend.id
  const getMessageClass = isFriendMessage() ? 'message--friend' : 'message--user'
  const getMessageHeadClass = isFriendMessage() ? 'message__head--friend' : 'message__head--user'
  const getMessageBodyClass = isFriendMessage() ? 'message__body--friend' : 'message__body--user'
  const getMessageHeadPicture = isFriendMessage() ? currentFriend.picture : picture
  const getMessageHeadName = isFriendMessage() ? currentFriend.username : username

  return (
    <div className={`${styles.message} ${styles[getMessageClass]}`}>
      <MessageHead
        classes={getMessageHeadClass}
        picture={getMessageHeadPicture}
        name={getMessageHeadName}
        time={time}
      />
      <MessageBody
        classes={getMessageBodyClass}
        content={content}
      />
    </div>
  )
}

export default Message
