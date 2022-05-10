import styles from '../../styles/LatestChats.module.css'
import ContainerHeading from '../container_heading/ContainerHeading'
import LatestChat from '../latest_chat/LatestChat'

// function LatestChats({ results, container, ...props }) {
function LatestChats({ chats }) {
  return (
    <>
      { chats.length > 0 && <ContainerHeading text="Latest Chats" />}
      <div className={styles['latest-chats']}>
        {
          chats.map((chat) => (
            <LatestChat
              key={chat.id}
              username={chat.username}
              picture={chat.picture}
              time={chat.time}
              message={chat.message}
            />
          ))
        }
      </div>
    </>
  )
}

export default LatestChats
