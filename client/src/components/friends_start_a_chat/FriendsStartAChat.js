import styles from '../../styles/FriendsStartAChat.module.css'
import FriendStartAChat from '../friend_start_a_chat/FriendStartAChat'

// function LatestChats({ results, container, ...props }) {
function FriendsStartAChat({ friends }) {
  return (
    <div className={styles.friends}>
      {
        friends.map((friend) => (
          <FriendStartAChat
            key={friend.id}
            picture={friend.picture}
            username={friend.username}
          />
        ))
      }
    </div>
  )
}

export default FriendsStartAChat
