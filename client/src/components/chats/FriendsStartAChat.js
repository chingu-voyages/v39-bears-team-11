import FriendStartAChat from './FriendStartAChat'

function FriendsStartAChat({ friends }) {
  return (
    <form method="dialog">
      {
        friends.map((friend) => (
          <FriendStartAChat
            key={friend.id}
            picture={friend.picture}
            username={friend.username}
          />
        ))
      }
    </form>
  )
}

export default FriendsStartAChat
