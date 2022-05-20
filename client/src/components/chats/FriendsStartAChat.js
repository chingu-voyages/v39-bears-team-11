import FriendStartAChat from './FriendStartAChat'

function FriendsStartAChat({ friends, onOpenAChatClick }) {
  return (
    <form method="dialog">
      {
        friends.map((friend) => (
          <FriendStartAChat
            key={friend.id}
            id={friend.id}
            picture={friend.picture}
            username={friend.username}
            onOpenAChatClick={onOpenAChatClick}
          />
        ))
      }
    </form>
  )
}

export default FriendsStartAChat
