import { useSelector } from 'react-redux'
import Message from '../message/Message'

function Messages() {
  const chats = useSelector(({ chats }) => chats)
  const friends = useSelector(({ user }) => user.friends)
  const { messages, currentFriendId } = chats
  const currentFriend = friends.find((f) => f.id === currentFriendId)

  return (
    <div className={styles.messges}>
      { messages.map((message) => (
        <Message
          senderId={message.sender}
          content={message.content}
          time={message.timestamp}
          currentFriend={currentFriend}
        />
      ))}
    </div>
  )
}

export default Messages