import { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../styles/ChatRoom-styles/Messages.module.css'
import MessageHead from '../message_head/MessageHead'
import MessageBody from '../message_body/MessageBody'

const Message = forwardRef(({
  senderId,
  content,
  time,
  currentFriend,
}, ref) => {
  const userState = useSelector(({ user }) => user)
  const { username, picture } = userState

  const isFriendMessage = senderId === currentFriend.id

  /* Select message components' classes and user info based on sender id */
  const messageClass = isFriendMessage ? 'message--friend' : 'message--user'
  const messageHeadClass = isFriendMessage ? 'message__head--friend' : 'message__head--user'
  const messageBodyClass = isFriendMessage ? 'message__body--friend' : 'message__body--user'
  const messageHeadPicture = isFriendMessage ? currentFriend.picture : picture
  const messageHeadName = isFriendMessage ? currentFriend.username : username

  return (
    <div className={`${styles.message} ${styles[messageClass]}`} ref={ref}>
      <MessageHead
        classes={messageHeadClass}
        picture={messageHeadPicture}
        name={messageHeadName}
        time={time}
      />
      <MessageBody
        classes={messageBodyClass}
        content={content}
      />
    </div>
  )
})

export default Message
