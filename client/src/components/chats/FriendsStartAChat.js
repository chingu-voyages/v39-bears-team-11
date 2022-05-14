import FriendStartAChat from './FriendStartAChat'

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
