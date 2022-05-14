import ContainerHeading from '../container_heading/ContainerHeading'
import LatestChat from '../latest_chat/LatestChat'

function LatestChats({ chats }) {
  return (
    <>
      { chats.length > 0 && <ContainerHeading text="Latest Chats" />}
      <div>
        {
          chats.map((chat) => (
            <LatestChat
              key={chat.id}
              username={chat.username}
              picture={chat.picture}
              timestamp={chat.timestamp}
              message={chat.message}
            />
          ))
        }
      </div>
    </>
  )
}

export default LatestChats
