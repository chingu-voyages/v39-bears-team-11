import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import styles from '../../styles/Messages.module.css'
import Message from '../message/Message'

function Messages() {
  const messagesState = useSelector(({ messages }) => messages)
  const friends = useSelector(({ user }) => user.friends)
  const { chats, currentFriendId } = messagesState

  const currentFriendChat = chats.find((chat) => chat.friendId === currentFriendId)
  const currentFriendMessages = currentFriendChat.messages
  const currentFriendInfo = friends.find((f) => f.id === currentFriendId)

  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false, { behavior: 'smooth' })
  }, [currentFriendMessages])

  return (
    <div className={styles.messages}>
      { currentFriendMessages.map((message) => (
        <Message
          ref={scrollRef}
          key={nanoid()}
          senderId={message.sender}
          content={message.content}
          time={message.timestamp}
          currentFriend={currentFriendInfo}
        />
      ))}
    </div>
  )
}

export default Messages
