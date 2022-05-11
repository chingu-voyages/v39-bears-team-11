import FriendStartAChat from '../friend_start_a_chat/FriendStartAChat'

// function LatestChats({ results, container, ...props }) {
function FriendsStartAChat({ friends }) {
  return (
    <>
      {
        friends.map((friend) => (
          <FriendStartAChat
            key={friend.id}
            picture={friend.picture}
            username={friend.username}
          />
        ))
      }
    </>
  )
}

export default FriendsStartAChat
