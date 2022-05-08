import StartAChatButton from '../button/StartAChatButton'
import LatestChats from '../latest_chats/LatestChats'

function Chats() {
  return (
    <div
      id="chats"
      className="container main"
    >
      <StartAChatButton />
      <LatestChats />
    </div>
  )
}

export default Chats
